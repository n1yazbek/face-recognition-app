// import { Injectable } from '@angular/core';
// import axios from 'axios';

// @Injectable({
//   providedIn: 'root'
// })
// export class FaceDetectionService {
//   private  apiKey = '74f25ab7e5mshb9e17240ad6e39dp1e8739jsna45af6475ce1';
//   private endpoint = 'face-detection6.p.rapidapi.com';


//   detectFaces(imageUrl: string): Promise<any> {
//     const url = 'https://face-detection-infoerdo.p.rapidapi.com/detectFaces';
//     const headers = {
//       'Content-Type': 'application/json',
//       'X-RapidAPI-Key': this.apiKey,
//       'X-RapidAPI-Host': this.endpoint
//     };

//     const data = {
//       imageUrl: imageUrl,
//       accuracy_boost: 3
//     };

//     return axios.post(url, data, { headers });
//   }
// }



import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FaceDetectionService {
  private apiKey = 'bae4f9a4f7msh3d16b9abb3ccdecp187251jsn27237804a24e';
  private endpoint = 'face-detection6.p.rapidapi.com';

  detectFaces(imageUrl: string): Promise<any> {
    console.log('imageUrl', imageUrl);
    const url = 'https://face-detection6.p.rapidapi.com/img/face-age-gender';
    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.endpoint
    };

    const data = {
      url: imageUrl,
      accuracy_boost: 3
    };

    console.log('data', data);
    console.log('headers', headers);
    return axios.post(url, data, { headers });
  }
}
