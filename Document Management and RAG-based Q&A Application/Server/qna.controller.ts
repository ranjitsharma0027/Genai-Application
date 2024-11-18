import { Controller, Post, Body } from '@nestjs/common';
import { PythonService } from './python.service';

@Controller('qna')
export class QnaController {
    constructor(private readonly pythonService: PythonService) {}

    @Post()
    async askQuestion(@Body() body: { question: string; documentIds: number[] }) {
        return this.pythonService.askQuestion(body.question, body.documentIds);
    }
}


