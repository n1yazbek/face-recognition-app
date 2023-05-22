import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

interface FaceData {
  faceRectangle: [height: number, left: number, top: number, width: number];
  glasses: string;
  headpose: [pitch: number, roll: number, yaw: number];
  noise: [noiseLevel: string, value: number];
  blur: [blurLevel: string, value: number];
  exposure: [exposureLevel: string, value: number];
  occulsion: [foreheadOcclusion: boolean, eyeOcclusion: boolean, mouthOcclusion: boolean];
  accessories: [name: string, confidence: number];
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

  constructor(private httpClient: HttpClient, private cloudinaryService: CloudinaryService) {}

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
      this.selectedFile = inputElement.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  uploadAndDetectFaces(file: File): void {
    this.cloudinaryService.uploadFile(file)
      .then((result: any) => {
        console.log('File uploaded successfully');
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
    const url = `${this.endpoint}/detect`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.subscriptionKey
    });
    const params = { returnFaceAttributes: 'blur,exposure,noise,glasses,accessories,occlusion,headpose' };
    const body = { url: imageUrl };

    this.httpClient.post<any[]>(url, body, { headers, params })
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
              return { glasses, faceRectangle, headpose, noise, blur, exposure, occulsion, accessories };
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

  submit() {
    if (this.selectedFile) {
      this.uploadAndDetectFaces(this.selectedFile);
    }
  }

  submitAnother() {
    // Reset the image URL and face data to prepare for another submission
    this.imageUrl = '';
    this.faceData = [];
  }
}
