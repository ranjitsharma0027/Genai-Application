import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PythonService {
    private readonly pythonBackendUrl: string = process.env.PYTHON_BACKEND_URL;
    private readonly pythonApiKey: string = process.env.PYTHON_BACKEND_API_KEY;

    constructor(private readonly httpService: HttpService) {}

    async ingestDocument(title: string, content: string): Promise<any> {
        try {
            const url = `${this.pythonBackendUrl}/ingest`;
            const response = await this.httpService.post(
                url,
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${this.pythonApiKey}`,
                    },
                },
            ).toPromise();
            return response.data;
        } catch (error) {
            console.error('Error in Python ingestion:', error.message);
            throw new HttpException('Failed to ingest document', HttpStatus.BAD_GATEWAY);
        }
    }

    async askQuestion(question: string, documentIds: number[]): Promise<any> {
        try {
            const url = `${this.pythonBackendUrl}/qna`;
            const response = await this.httpService.post(
                url,
                { question, documentIds },
                {
                    headers: {
                        Authorization: `Bearer ${this.pythonApiKey}`,
                    },
                },
            ).toPromise();
            return response.data;
        } catch (error) {
            console.error('Error in Python Q&A:', error.message);
            throw new HttpException('Failed to process Q&A', HttpStatus.BAD_GATEWAY);
        }
    }
}
