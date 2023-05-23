# Documentation

Face Recognition Application

# Documentation

This document provides a detailed description of the Face Recognition application.

## Application Description

The Angular  Face Recognition application is a human face detection and analyzing application. It is designed to get the essential information about the faces in the photo. This documentation aims to provide developers with a clear understanding of the application's architecture, main components, class structure, client-server communication, and the process of sending API calls and handling their results.

## Installation

To run the Face Recognition application, perform the following actions:

1. Install Node.js on your system.
2. Install the Angular CLI by running the command `npm install -g @angular/cli`.
3. Clone the repository from GitHub.
4. Navigate to the project directory.
5. Run the command `npm install` to install the dependencies.
6. Run the command `ng serve` to start the application.

## 

## **Usage**

To use the Professional Face Recognition App, follow the instructions below:

1. Accessing the Application
    - Open a web browser and enter the URL where the application is deployed.
2. Uploading an Image
    - On the main page of the application, you will see the "Upload an Image" section.
    - Click the "Upload Image" button to open the file selection dialog.
    - Choose an image file from your local system and click "Open" to upload it.
    - The uploaded image will be displayed in the "Image Preview" section.
3. Analyzing the Face
    - Once the image is uploaded, you can enter the person's name in the "Person's Name" field.
    - Click the "Analyze the Face" button to initiate the analysis process.
    - The application will detect faces in the uploaded image and display the analysis results in the "Analysis Results" section.
4. Viewing Analysis Results
    - In the "Analysis Results" section, you will see a table displaying various attributes of the detected faces.
    - The table includes information such as Face ID, Age, Gender, Glasses, and more.
    - If multiple faces are detected, each face's attributes will be displayed in a separate row.
    - If a particular attribute is not detected for a face, "N/A" will be displayed.

Note: The application communicates with external services, such as the Cloudinary service for image upload and the Face Detection service for face analysis. Ensure that you have a stable internet connection while using the app.

With these instructions, you can now effectively use the Professional Face Recognition App to upload images, analyze faces, and view the analysis results.

## **Architecture and Main Components**

The architecture of the Professional Face Recognition App is designed to provide efficient face analysis and recognition capabilities. The following figure illustrates the overall architecture:

![niazio.png](Documentation%201293f61b30fe4d52b03b63f670bcd1d6/niazio.png)

The main components of the application are as follows:

1. **Upload an Image Component**: This component allows users to upload an image for face analysis. It includes the image upload functionality, image preview, and input field for entering the person's name.
2. **Analysis Results Component**: This component displays the results of the face analysis. It presents various attributes of the detected faces, such as Face ID, Age, Gender, Glasses, and more. The results are organized in a tabular format for easy readability.
3. **Cloudinary Service**: The Cloudinary service is responsible for handling the image upload functionality. It securely stores the uploaded image and provides a URL for accessing the image.
4. **Face Detection Service**: The Face Detection service is used to detect faces in the uploaded image. It utilizes algorithms and techniques to identify and locate faces accurately.

These components and services work together to provide a seamless user experience for uploading images, analyzing faces, and displaying the analysis results. The architecture ensures that the application is scalable, modular, and extensible for future enhancements and improvements.

## **API Calls and Displaying Results**

**Cloudinary Upload API Call:**

- The application utilizes the Cloudinary API to upload the selected image file.
- When the user clicks the "Upload Image" button, the `openUploader()` method is triggered.
- This method dynamically creates an input element, allowing the user to select an image file.
- Once the file is selected, the `onFileSelected()` method is called to handle the event.
- The selected file is assigned to the `selectedFile` property, and the URL of the file is generated using `URL.createObjectURL()`.
- The `uploadAndDetectFaces()` method is then invoked to upload the file to Cloudinary and detect faces.

**Cloudinary File Upload API Call:**

- The `uploadAndDetectFaces(file: File)` method uses the `cloudinaryService` to upload the selected file to Cloudinary.
- It calls the `uploadFile(file: File)` method of the `cloudinaryService`, which returns a Promise resolving to the uploaded file URL.
- If the upload is successful, the file URL is stored in the `fileUrl` variable.

**Face Detection API Call:**

- The `detectFaces(fileUrl: string)` method makes an API call to the face detection service.
- It utilizes the `faceDetectionService` to detect faces in the uploaded image.
- The `detectFaces(fileUrl)` method internally makes a face detection API call using the `faceDetectionService`.
- The response from the face detection API contains an array of detected faces.

**Face Recognition API Call:**

- The application constructs an API call to the face recognition service using Angular's `HttpClient` module.
- The API call is made in the `detectAndFetchFaceData()` method, where a POST request is sent to the Face API endpoint (`this. endpoint`).
- The request includes the necessary headers and parameters, such as `Content-Type` and `Ocp-Apim-Subscription-Key`.
- The response from the API call contains face data for each detected face.

**Mapping Face Data:**

- After receiving the responses from the face detection API and the face recognition API, the `mapFaceData()` method is invoked.
- This method maps the detected faces with the retrieved face data, combining relevant attributes to create a unified representation of the face data.
- The resulting `face data` array contains the mapped face data, including attributes such as face ID, age, gender, glasses, and more.

**Displaying Results:**

- In the HTML template, the analysis results are displayed using Angular's structural directives, such as `ngIf`, `ngFor`, and `ng-template`.
- Face attributes, such as face ID, age, gender, glasses, etc., are rendered in a table format.

By following this process, the application successfully makes API calls to Cloudinary for file upload, to the face detection service to detect faces, and to the face recognition service to retrieve face data. The retrieved face data is then mapped and displayed in the HTML template for analysis results.

This concludes the description of the API calls and their respective sections in the application.

## Conclusion

This document has provided a detailed description of the Face Recognition application. It has outlined the features of the application as well as the installation and usage instructions.