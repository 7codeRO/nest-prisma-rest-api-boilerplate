import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let _app: TestingModule;

  beforeAll(async () => {
    _app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });
});
