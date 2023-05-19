import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent implements OnInit {
  endpoint = 'https://facerecogition.cognitiveservices.azure.com/';
  subscriptionKey = 'fbeb38cdb00f41469390fac60a85e4a8';

  detectedFaces: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPretrainedModels();
  }
  
  fetchPretrainedModels() {
    this.http.get<any>('https://api.example.com/pretrained-models').subscribe(
      (response) => {
        // Process the fetched models and perform any necessary initialization
        console.log(response);
        // Initialize your component with the fetched data
      },
      (error) => {
        console.error('Error fetching pretrained models:', error);
      }
    );
  }
  

  onImageUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);
  
    this.http.post<any>(`${this.endpoint}/detect?returnFaceId=true&returnFaceAttributes=age,gender`, formData, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.subscriptionKey
      }
    }).subscribe(
      (response) => {
        // Handle the response from the API and extract the faces
        this.detectedFaces = response.map((face: any) => face.faceAttributes);
      },
      (error) => {
        console.error('Error detecting faces:', error);
      }
    );
  }

  onTrainingUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);

    this.http.post<any>(`${this.endpoint}/train`, formData, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.subscriptionKey
      }
    }).subscribe(
      (response) => {
        // Handle the response from the API
        console.log('Training successful:', response);
      },
      (error) => {
        console.error('Error training the recognition engine:', error);
      }
    );
  }
}
