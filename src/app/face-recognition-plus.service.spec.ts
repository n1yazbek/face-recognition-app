import { TestBed } from '@angular/core/testing';

// import { FaceRecognitionPlusService } from './face-recognition-plus.service';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {

  constructor(private http: HttpClient) { }
  

  detectFace(imageUrl: string) {
    
    const url = 'https://api-us.faceplusplus.com/facepp/v3/detect';
    const body = {
      api_key: environment.facePlusPlus.apiKey,
      api_secret: environment.facePlusPlus.apiSecret,
      image_url: imageUrl
      
    };

    return this.http.post(url, body);
  }
  

  createFaceSet(displayName: string) {
    const url = 'https://api-us.faceplusplus.com/facepp/v3/faceset/create';
    const body = {
      api_key: environment.facePlusPlus.apiKey,
      api_secret: environment.facePlusPlus.apiSecret,
      display_name: displayName
    };
    return this.http.post(url, body);
  }
  

  addFaceToFaceSet(faceTokens: string[], facesetToken: string) {
    const url = 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface';
    const body = {
      api_key: environment.facePlusPlus.apiKey,
      api_secret: environment.facePlusPlus.apiSecret,
      faceset_token: facesetToken,
      face_tokens: faceTokens.join(',')
    };
    return this.http.post(url, body);
  }
  
  trainFaceSet(facesetToken: string) {
    const url = 'https://api-us.faceplusplus.com/facepp/v3/faceset/train';
    const body = {
      api_key: environment.facePlusPlus.apiKey,
      api_secret: environment.facePlusPlus.apiSecret,
      faceset_token: facesetToken
    };
    return this.http.post(url, body);
  }
  
  searchFace(faceToken: string, facesetToken: string) {
    const url = 'https://api-us.faceplusplus.com/facepp/v3/search';
    const body = {
      api_key: environment.facePlusPlus.apiKey,
      api_secret: environment.facePlusPlus.apiSecret,
      face_token: faceToken,
      faceset_token: facesetToken
    };
    return this.http.post(url, body);
  }
  

  // You can add more methods as required.
}
