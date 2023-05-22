// import { TestBed } from '@angular/core/testing';

// // import { FaceRecognitionPlusService } from './face-recognition-plus.service';

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';



// @Injectable({
//   providedIn: 'root'
// })
// export class FaceRecognitionService {

//   constructor(private http: HttpClient) { }

//   detectFace(imageUrl: string) {
//     const url = 'https://api-us.faceplusplus.com/facepp/v3/detect';
//     const body = {
//       api_key: environment.facePlusPlus.apiKey,
//       api_secret: environment.facePlusPlus.apiSecret,
//       image_url: imageUrl
//     };
//     return this.http.post(url, body);
//   }
  

//   createFaceSet(displayName: string) {
//     const url = 'https://api-us.faceplusplus.com/facepp/v3/faceset/create';
//     const body = {
//       api_key: environment.facePlusPlus.apiKey,
//       api_secret: environment.facePlusPlus.apiSecret,
//       display_name: displayName
//     };
//     return this.http.post(url, body);
//   }
  

//   addFaceToFaceSet(faceTokens: string[], facesetToken: string) {
//     const url = 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface';
//     const body = {
//       api_key: environment.facePlusPlus.apiKey,
//       api_secret: environment.facePlusPlus.apiSecret,
//       faceset_token: facesetToken,
//       face_tokens: faceTokens.join(',')
//     };
//     return this.http.post(url, body);
//   }
  
//   trainFaceSet(facesetToken: string) {
//     const url = 'https://api-us.faceplusplus.com/facepp/v3/faceset/train';
//     const body = {
//       api_key: environment.facePlusPlus.apiKey,
//       api_secret: environment.facePlusPlus.apiSecret,
//       faceset_token: facesetToken
//     };
//     return this.http.post(url, body);
//   }
  
//   searchFace(faceToken: string, facesetToken: string) {
//     const url = 'https://api-us.faceplusplus.com/facepp/v3/search';
//     const body = {
//       api_key: environment.facePlusPlus.apiKey,
//       api_secret: environment.facePlusPlus.apiSecret,
//       face_token: faceToken,
//       faceset_token: facesetToken
//     };
//     return this.http.post(url, body);
//   }
  

//   // You can add more methods as required.
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class FaceRecognitionPlusService {
  private readonly API_URL = '/facepp/v3/faceset/create?api_key=-YlvtIYewVB8K5ZWV9fObSQLVHUiLZc3&api_secret=1NlROHafM0ZkvJwEFR2pH_nTyluyh6aK';
  // private  API_URL = 'http://localhost:3000/api/facepp/v3/faceset/create?api_key=-YlvtIYewVB8K5ZWV9fObSQLVHUiLZc3&api_secret=1NlROHafM0ZkvJwEFR2pH_nTyluyh6aK';
  private  API_KEY = environment.facePlusPlus.apiKey;
  private  API_SECRET = environment.facePlusPlus.apiSecret;

  constructor(private http: HttpClient) {}

  createFaceSet(displayName: string): Observable<any> {
    console.log('createFaceSet');
    const url = `${this.API_URL}`;
    const body = {
      api_key: this.API_KEY,
      api_secret: this.API_SECRET,
      display_name: displayName
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
console.log('urls and body and headers', url, body, headers);
    return this.http.post(url, body, { headers });
  }

  addFaceToFaceSet(faceTokens: string[], faceSetToken: string): Observable<any> {
    const url = `${this.API_URL}/faceset/addface`;
    const params = {
      api_key: this.API_KEY,
      api_secret: this.API_SECRET,
      face_tokens: faceTokens.join(','),
      faceset_token: faceSetToken,
    };
    return this.http.post(url, params);
  }

  trainFaceSet(faceSetToken: string): Observable<any> {
    const url = `${this.API_URL}/faceset/train`;
    const params = {
      api_key: this.API_KEY,
      api_secret: this.API_SECRET,
      faceset_token: faceSetToken,
    };
    return this.http.post(url, params);
  }

  searchFace(faceToken: string, faceSetToken: string): Observable<any> {
    const url = `${this.API_URL}/search`;
    const params = {
      api_key: this.API_KEY,
      api_secret: this.API_SECRET,
      face_token: faceToken,
      faceset_token: faceSetToken,
    };
    return this.http.post(url, params);
  }
}

