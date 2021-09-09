import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Photo, PhotoSchema } from 'src/schemas/photo.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Photo.name, schema: PhotoSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {
  constructor(private settingsService: SettingsService) {}
}
