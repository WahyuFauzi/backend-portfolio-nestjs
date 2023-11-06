import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Receivable, ReceivableSchema } from './schema/receivable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Receivable.name, schema: ReceivableSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
