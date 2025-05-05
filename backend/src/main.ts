import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {writeFileSync} from "fs";
import {join} from "path";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // eslint-disable-next-line @typescript-eslint/no-var-requires
import * as YAML from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

    app.enableCors({
        origin: [
            'http://localhost:5173', // NOT FOR PRODUCTION
        ],
        credentials: true,
    });

  const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  writeFileSync(
      join(process.cwd(), 'openapi.yaml'),
      YAML.stringify(document, {
        aliasDuplicateObjects: false,
      }),
  );

  await app.listen(3000);
}
bootstrap();
