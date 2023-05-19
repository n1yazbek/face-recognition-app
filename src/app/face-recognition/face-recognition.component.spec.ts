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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Initialize your component
  }

  uploadImage(event: any) {
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
        // Handle the response from the API
        console.log(response);
      },
      (error) => {
        console.error('Error detecting faces:', error);
      }
    );
  }
}
