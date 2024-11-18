import { Module, HttpModule } from '@nestjs/common';
import { QnaController } from './qna.controller';

@Module({
    imports: [HttpModule],
    controllers: [QnaController],
})
export class QnaModule {}

