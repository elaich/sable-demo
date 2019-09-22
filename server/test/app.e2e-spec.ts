import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TransactionsService } from './../src/suspicious/transactions.service';

describe('Suspicious Transactions (e2e)', () => {
  let app;
  let transactionsService = { findSuspicious: () => [{id: 'a1c'}] };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `{
          getSuspiciousTransactions {
            id
          }
        }`,
      })
      .expect(200)
      .expect({
        data: { getSuspiciousTransactions: transactionsService.findSuspicious() },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
