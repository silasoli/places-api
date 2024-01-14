import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/exception-filters/http-exception.filter';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment-timezone'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Places API')
    .setDescription('Places API developed by @silasoli')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  };

  SwaggerModule.setup('docs', app, document, customOptions);

  Date.prototype.toJSON = function (): string {
    return moment(this)
      .tz('America/Sao_Paulo')
      .subtract(3, 'hours')
      .format('YYYY-MM-DDTHH:mm:ss.SSS');
  };

  const port = configService.get('PORT');
  if (!port) throw new Error("Application port wasn't found");

  await app.listen(port);
}
bootstrap();
