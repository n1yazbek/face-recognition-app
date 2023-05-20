import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface FaceData {
  // gender: string;
  // age: number;
  faceRectangle: [height: number, left: number, top: number, width: number] //check the syntax
  // name: string;
  // confidence: number;
  // smile: number;
  // emotion: string;
  glasses: string;
  headpose: [pitch : number, roll : number, yaw : number]
  noise : [noiseLevel : string, value : number];
  blur : [blurLevel : string, value : number];
  exposure : [exposureLevel : string, value : number];
  occulsion : [foreheadOcclusion : boolean, eyeOcclusion : boolean, mouthOcclusion : boolean];
  accessories : [name : string, confidence : number];

}
//(emotion, gender, age, smile, facial hair, hair and makeup
// blur,exposure,noise,glasses,accessories,occlusion,headpose,qualityforrecognition
@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent {
  // imageUrl= 'https://drive.google.com/uc?export=download&id=1CZwUkA8qArdMVyI_Hk0ifWzXHXSFPOCo';
  // imageUrl= 'https://drive.google.com/uc?export=download&id=1o-mLs8lvuPSbrlLRPyVLw1UqZwMGZIk5';
  // imageUrl= 'https://drive.google.com/uc?export=download&id=1UCMGZwJp7PNvmpvUvz5oTkEArnjSDtpq';
  imageUrl= 'https://drive.google.com/uc?export=download&id=1WToRd6qp36r2BcyHbtP0HRK1CLu5IuL0';
  // imageUrl= 'https://drive.google.com/uc?export=download&id=1UCMGZwJp7PNvmpvUvz5oTkEArnjSDtpq';
  //https://drive.google.com/file/d/10c8MOV0IAAiODuillP2V-EeJrMoY8G1P/view?usp=sharing
  //https://drive.google.com/file/d/1UGnnCcb3ICpwzEDie0UesC-lykzRSubY/view?usp=sharing
  //https://drive.google.com/file/d/16LaSC2fL5e385sOUCcczqcrmshQy-cH2/view?usp=sharing
  //https://drive.google.com/file/d/1EP1frl1clu7aD0LrciLn34ygeBiizTRp/view?usp=sharing
  //https://drive.google.com/file/d/1WToRd6qp36r2BcyHbtP0HRK1CLu5IuL0/view?usp=sharing

  // imageUrl= 'https://drive.google.com/file/d/1o-mLs8lvuPSbrlLRPyVLw1UqZwMGZIk5/view?usp=sharing';
  // imageUrl= 'https://drive.google.com/file/d/1o-mLs8lvuPSbrlLRPyVLw1UqZwMGZIk5/view?usp=sharing';
  // images[] = ['1CZwUkA8qArdMVyI_Hk0ifWzXHXSFPOCo', '1CZwUkA8qArdMVyI_Hk0ifWzXHXSFPOCo', '1CZwUkA8qArdMVyI_Hk0ifWzXHXSFPOCo']
  description= '';
  faceData: FaceData[] = [];


  private endpoint = 'https://face-api-v2.cognitiveservices.azure.com/face/v1.0'; // Replace with your Face API endpoint

  // private endpoint = 'https://germanywestcentral.api.cognitive.microsoft.com/face/v1.0';// Replace with your Face API endpoint
  private subscriptionKey = 'b0149ff724c44500bc5916e1342db560'; // Replace with your Face API subscription key
  // private apiRegion = 'germanywestcentral'; // Replace with your Face API region (e.g. westeurope)

  constructor(private httpClient: HttpClient) { }

  // onFileSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     // this.imageUrl = URL.createObjectURL(file);
  //     this.imageUrl = 'https://drive.google.com/uc?export=download&id=1CZwUkA8qArdMVyI_Hk0ifWzXHXSFPOCo';
  //   }
  // }

  detectFaces(imageUrl: string) {
    const url = `${this.endpoint}/detect`;
    console.log("URLS is here", url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.subscriptionKey
    });
    const params = { returnFaceAttributes: 'blur,exposure,noise,glasses,accessories,occlusion,headpose' };
    const body = { url: imageUrl };
    console.log("body is here", body);

    return this.httpClient.post<any[]>(url, body, { headers, params });
  }

  submit() {
    if (this.imageUrl) {
      this.detectFaces(this.imageUrl)
        .subscribe({
          next: (response: any[]) => {
            console.log(response); // Logging the API response for debugging purposes
  
            if (response.length > 0) {
              const detectedFaces = response;
              const faceData = detectedFaces.map((face) => {
                const faceAttributes = face.faceAttributes;
                const glasses = faceAttributes.glasses;
                const faceRectangle = face.faceRectangle;
                const headpose = faceAttributes.headpose;
                const noise = faceAttributes.noise;
                const blur = faceAttributes.blur;
                const exposure = faceAttributes.exposure;
                const occulsion = faceAttributes.occlusion;
                const accessories = faceAttributes.accessories;
                return {   glasses : glasses, faceRectangle : faceRectangle, headpose : headpose, noise : noise, blur : blur, exposure : exposure, occulsion : occulsion, accessories : accessories};
              });
  
              this.faceData = faceData;
            } else {
              this.faceData = []; // No faces detected
              console.log("No faces detected");
            }
          },
          error: (error: any) => {
            console.error(error); // Logging any errors that occur during the API request
            this.faceData = []; // Reset face data in case of an error
          }
        });
    }
  }
  
  
  trainFaceRecognition() {
    const url = `${this.endpoint}/train`;
    const headers = new HttpHeaders().set('Ocp-Apim-Subscription-Key', this.subscriptionKey);
  
    return this.httpClient.post(url, null, { headers });
  }
  
  
}
