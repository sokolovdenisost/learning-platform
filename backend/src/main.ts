import { NestFactory } from '@nestjs/core';
import { MongoDBStore } from 'connect-mongodb-session';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
