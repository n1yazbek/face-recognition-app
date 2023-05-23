import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FaceDetectionService } from '../face-detection.service';
import { FaceRecognitionPlusService } from '../face-recognition-plus.service';
import { environment } from 'src/environments/environment';


interface FaceData {
  faceId: string;
  faceRectangle: [height: number, left: number, top: number, width: number];
  glasses: string;
  headpose: [pitch: number, roll: number, yaw: number];
  noise: [noiseLevel: string, value: number];
  blur: [blurLevel: string, value: number];
  exposure: [exposureLevel: string, value: number];
  occulsion: [foreheadOcclusion: boolean, eyeOcclusion: boolean, mouthOcclusion: boolean];
  accessories: [name: string, confidence: number];
 
  age: {
    low: number;
    high: number;
  };

  gender:{
    gender: string;
    probability: number;
  }
}

@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent {
  imageUrl = ''; // Holds the image URL
  faceData: FaceData[] = []; // Holds the detected face data
  selectedFile: File | null = null; // The selected file to be uploaded

  private endpoint = 'https://face-api-v2.cognitiveservices.azure.com/face/v1.0'; // Replace with your Face API endpoint
  private subscriptionKey = 'b0149ff724c44500bc5916e1342db560'; // Replace with your Face API subscription key
  personName = ''; // Replace with your desired person name



  constructor(private httpClient: HttpClient,
      private cloudinaryService: CloudinaryService, 
      private faceDetectionService : FaceDetectionService,
      // private faceRecognitionPlusService: FaceRecognitionPlusService
      ) {}


 

  openUploader(): void {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (event) => this.onFileSelected(event);
    inputElement.click();
    
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.resetFields();
      this.selectedFile = inputElement.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
      
    }
  }


  uploadAndDetectFaces(file: File): void {
    this.cloudinaryService.uploadFile(file)
      .then((result: any) => {
        console.log('File uploaded successfully');
        this.resetFields();
        const fileUrl = result.secure_url;
        console.log('File URL:', fileUrl);
        this.imageUrl = fileUrl;
        this.detectFaces(fileUrl);
        
      })
      .catch((error: any) => {
        console.error('Error uploading file:', error);
      });
  }

  
detectFaces(imageUrl: string) {
  // alert('Detected Face');
console.log('ENVIRONMENT  keys', environment.facePlusPlus.apiKey, environment.facePlusPlus.apiSecret, environment.facePlusPlus.endpoint);

  this.detectAndFetchFaceData(imageUrl)
    .then(([detectedFaces, msFaceData]) => {
      const faceData = this.mapFaceData(detectedFaces, msFaceData);
      this.faceData = faceData;
      console.log(this.faceData);

      // Create a FaceSet when face data is received
      // this.createAndTrainFaceSet(faceData);
    })
    .catch(error => {
      console.error('Face Detection API request failed: here is the error', error);
      this.faceData = []; // Reset face data in case of an error
    });
}

async detectAndFetchFaceData(imageUrl: string): Promise<[any[], any[]]> {
  const faceDetectionResponse = await this.faceDetectionService.detectFaces(imageUrl);
  console.log('Detected faces:', faceDetectionResponse);
  const detectedFaces = faceDetectionResponse.data.detected_faces;
  
  const msFaceUrl = `${this.endpoint}/detect`;
  const msFaceHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': this.subscriptionKey
  });
  const msFaceParams = { returnFaceAttributes: 'blur,exposure,noise,glasses,accessories,occlusion,headpose' };
  const msFaceBody = { url: imageUrl };
  const msFaceResponse = await this.httpClient.post<any[]>(msFaceUrl, msFaceBody, { headers: msFaceHeaders, params: msFaceParams }).toPromise();
  
  return [detectedFaces, msFaceResponse || []];
}


mapFaceData(detectedFaces: any[], msFaceData: any[]): FaceData[] {
  return detectedFaces.map((face: any) => {
    const age = {
      low: (face.Age["Age-Range"] as { Low: number }).Low,
      high: (face.Age["Age-Range"] as { High: number }).High
    };

    const gender = {
      gender: face.Gender["Gender"],
      probability: face.Gender["Probability"]
    }
    
    const msFace = msFaceData.find((f: any) => f.faceId === face.faceId);

    return {
      age,
      gender,
      faceId: msFace?.faceId,
      faceRectangle: msFace?.faceRectangle,
      glasses: msFace?.faceAttributes?.glasses,
      headpose: msFace?.faceAttributes?.headpose,
      noise: msFace?.faceAttributes?.noise,
      blur: msFace?.faceAttributes?.blur,
      exposure: msFace?.faceAttributes?.exposure,
      occulsion: msFace?.faceAttributes?.occlusion,
      accessories: msFace?.faceAttributes?.accessories
    } as FaceData;
  });
}

// createAndTrainFaceSet(faceData: FaceData[]) {
//   // alert('Detected Face');
// // console.log('ENVIRONMENT  keys', environment.facePlusPlus.apiKey, environment.facePlusPlus.apiSecret, environment.facePlusPlus.endpoint);
// console.log('person Name', this.personName);
//   this.faceRecognitionPlusService.createFaceSet(this.personName)
//     .subscribe({
//       next: (createFaceSetResponse) => {
//         console.log('Created FaceSet:', createFaceSetResponse);

//         const faceSetToken = createFaceSetResponse.faceset_token;
//         const faceTokens = faceData.map(face => face.faceId);

//         // Add the detected face(s) to the FaceSet
//         this.faceRecognitionPlusService.addFaceToFaceSet(faceTokens, faceSetToken)
//           .subscribe({
//             next: (addFaceToFaceSetResponse) => {
//               console.log('Added face to FaceSet:', addFaceToFaceSetResponse);

//               // Train the FaceSet with the newly added face(s)
//               this.faceRecognitionPlusService.trainFaceSet(faceSetToken)
//                 .subscribe({
//                   next: (trainFaceSetResponse) => {
//                     console.log('Trained FaceSet:', trainFaceSetResponse);
//                   },
//                   error: (error) => {
//                     console.error('Face++ Train FaceSet request failed:', error);
//                   }
//                 });
//             },
//             error: (error) => {
//               console.error('Face++ Add Face to FaceSet request failed:', error);
//             }
//           });
//       },
//       error: (error) => {
//         console.error('Face++ Create FaceSet request failed:', error);
//       }
//     });
// }


  

  submit() {
    if(this.selectedFile){
      this.uploadAndDetectFaces(this.selectedFile);
      this.resetFields();
    }else{
      ('Please select an image');
    }
  }

  resetFields(): void {
    this.faceData = [
      {
        faceId: "N/A",
        faceRectangle: [0, 0, 0, 0],
        glasses: "N/A",
        headpose: [0, 0, 0],
        noise: ["N/A", 0],
        blur: ["N/A", 0],
        exposure: ["N/A", 0],
        occulsion: [false, false, false],
        accessories: ["N/A", 0],
        age: { low: 0, high: 0 },
        gender: { gender: "N/A", probability: 0 },
      },
    ];
  }
  
}             
