import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';

export interface UploadResponse {
  success: boolean;
  message: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private readonly http: HttpClient) {}

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    // El nombre debe coincidir con el parámetro IFormFile file del controlador.
    formData.append('file', file, file.name);

    return this.http.post<UploadResponse>(urlConstants.storageUpload, formData);
  }
}
