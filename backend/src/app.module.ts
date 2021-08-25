import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.dv9wr.mongodb.net/learningPlatform'), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
