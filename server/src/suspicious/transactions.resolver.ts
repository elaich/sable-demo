import { Query, Resolver } from '@nestjs/graphql';
import { Transaction } from './models/transaction';

@Resolver(of => Transaction)
export class TransactionsResolver {

  @Query(returns => [Transaction])
  getSuspiciousTransactions(): Transaction[] {
    return [] as Transaction[];
  }
}
