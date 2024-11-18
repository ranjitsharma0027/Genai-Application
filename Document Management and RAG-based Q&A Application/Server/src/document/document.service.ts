import { Injectable, HttpService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>,
        private httpService: HttpService,
    ) {}

    async create(doc: Partial<Document>): Promise<Document> {
        const document = await this.documentRepository.save(doc);
        await this.triggerIngestion(document.id, document.content);
        return document;
    }

    private async triggerIngestion(docId: number, content: string) {
        const url = 'http://RAG:8000/ingest';
        await this.httpService.post(url, { docId, content }).toPromise();
    }
}
