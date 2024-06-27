import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port, () => {
    console.log(`启动成功,访问 http://localhost:${port}`);
  });
}
bootstrap();
