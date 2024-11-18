import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
    private ingestionStatus = {};

    updateStatus(docId: number, status: string) {
        this.ingestionStatus[docId] = status;
    }

    getStatus(docId: number): string {
        return this.ingestionStatus[docId] || 'Not Started';
    }
}
