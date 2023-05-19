import { Component } from '@angular/core';

@Component({
  selector: 'app-face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css']
})
export class FaceRecognitionComponent {
  imageUrl = '';
  description = '';

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.imageUrl = URL.createObjectURL(file);

      // Perform face recognition or any other relevant logic here
      // Update the 'description' property with the recognized person's information or any other relevant data
      this.description = 'John Doe'; // Replace with actual recognized person's information
    }
  }

  submit() {
    // Logic to handle the submission
  }
}
