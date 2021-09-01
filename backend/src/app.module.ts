import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.dv9wr.mongodb.net/learningPlatform'), AuthModule, SettingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
