import { Controller, Post, Body } from '@nestjs/common';
import { PythonService } from './python.service';

@Controller('documents')
export class DocumentController {
    constructor(private readonly pythonService: PythonService) {}

    @Post('ingest')
    async ingestDocument(@Body() body: { title: string; content: string }) {
        return this.pythonService.ingestDocument(body.title, body.content);
    }
}
