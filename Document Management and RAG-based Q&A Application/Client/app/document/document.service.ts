import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    constructor(private http: HttpClient) {}

    uploadDocument(doc: { title: string; content: string }) {
        return this.http.post('/api/documents', doc);
    }

    getDocuments() {
        return this.http.get('/api/documents');
    }

    deleteDocument(id: number) {
        return this.http.delete(`/api/documents/${id}`);
    }
}
