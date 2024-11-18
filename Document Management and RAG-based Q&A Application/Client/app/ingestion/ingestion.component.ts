import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-ingestion',
    template: `
        <h2>Ingestion Management</h2>
        <button (click)="triggerIngestion()">Trigger Ingestion</button>
        <p>Status: {{ status }}</p>
    `,
})
export class IngestionComponent {
    status = 'Not Started';

    constructor(private http: HttpClient) {}

    triggerIngestion() {
        this.http.post('/api/ingestion/trigger', {}).subscribe(() => (this.status = 'In Progress'));
    }
}

