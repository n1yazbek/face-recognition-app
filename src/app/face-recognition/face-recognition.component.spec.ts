import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FaceRecognitionComponent } from './face-recognition.component';

describe('FaceRecognitionComponent', () => {
  let component: FaceRecognitionComponent;
  let fixture: ComponentFixture<FaceRecognitionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FaceRecognitionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceRecognitionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle image upload and API response', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } };

    component.onImageUpload(mockEvent);

    const request = httpMock.expectOne(`${component.endpoint}/detect?returnFaceId=true&returnFaceAttributes=age,gender`);
    expect(request.request.method).toBe('POST');

    request.flush([{ faceId: '1', faceAttributes: { age: 25, gender: 'male' } }]);

    expect(component.detectedFaces.length).toBe(1);
    expect(component.detectedFaces[0].faceId).toBe('1');
    expect(component.detectedFaces[0].faceAttributes.age).toBe(25);
    expect(component.detectedFaces[0].faceAttributes.gender).toBe('male');
  });

  it('should handle API error', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } };

    component.onImageUpload(mockEvent);

    const request = httpMock.expectOne(`${component.endpoint}/detect?returnFaceId=true&returnFaceAttributes=age,gender`);
    expect(request.request.method).toBe('POST');

    const errorResponse = { message: 'Internal Server Error' };
    request.error(new ErrorEvent('Network error', { error: errorResponse }));

    expect(component.detectedFaces.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith('Error detecting faces:', errorResponse);
  });
});
