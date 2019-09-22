import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TransactionsService } from './../src/suspicious/transactions.service';
import { TransactionState } from './../src/suspicious/models/transaction';

describe('Suspicious Transactions (e2e)', () => {
  let app;
  let transactionsService = {
    findSuspicious: () => [{ id: 'a1c' }],
    updateSuspiciousTransactionState: jest.fn().mockReturnValue({ id: '23x' }),
  };

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

  it('getSuspiciousTransactions', () => {
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
        data: {
          getSuspiciousTransactions: transactionsService.findSuspicious(),
        },
      });
  });

  it('approveSuspiciousTransaction', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables: {},
        query: `mutation {
          updateSuspiciousTransaction(input: {id: "1", state: Approved}) {
            id
          }
        }`,
      })
      .expect(200)
      .expect({
        data: {
          updateSuspiciousTransaction: transactionsService.updateSuspiciousTransactionState(),
        },
      })
      .then(() =>
        expect(
          transactionsService.updateSuspiciousTransactionState,
        ).toHaveBeenCalledWith('1', TransactionState.Approved),
      );
  });

  afterAll(async () => {
    await app.close();
  });
});
