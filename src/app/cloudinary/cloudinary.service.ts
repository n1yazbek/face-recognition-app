import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cloudinary } from 'cloudinary-core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinary: any;

  constructor() {
    this.cloudinary = new Cloudinary({ 
      cloud_name: environment.cloudinary.cloudName,
      api_key: environment.cloudinary.apiKey,
      api_secret: environment.cloudinary.apiSecret
    });
  }

  uploadFile(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', environment.cloudinary.uploadPreset);

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            console.log('our log is here: Uploaded successfully:', xhr.responseText);
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            console.log('our log is here: Upload failed:', xhr.status);
            reject(xhr.statusText);
          }
        }
      };
      xhr.onerror = () => {
        reject(xhr.statusText);
      };
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`, true);
      xhr.send(formData);
    });
  }
}
