import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { AppModule } from './modules/app/app.module';
import { API_PREFIX } from './shared/constants/global.constants';
import { SwaggerConfig } from './configs/config.interface';
import { GLOBAL_CONFIG } from './configs/global.config';
import { MyLogger } from './modules/logger/logger.service';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'error', 'warn'],
  });

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(
    // TODO: uncomment when ready
    // new GlobalExceptionFilter(),

    new InvalidFormExceptionFilter(),
  );

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  const PORT = process.env.PORT || GLOBAL_CONFIG.nest.port;
  await app.listen(PORT, async () => {
    const myLogger = await app.resolve(MyLogger);
    myLogger.log(`Server started listening: ${PORT}`);
  });
}
bootstrap();
