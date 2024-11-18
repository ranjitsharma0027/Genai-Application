import { Module, HttpModule } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { QnaController } from './qna.controller';
import { PythonService } from './python.service';

@Module({
    imports: [HttpModule],
    controllers: [DocumentController, QnaController],
    providers: [PythonService],
})
export class AppModule {}
