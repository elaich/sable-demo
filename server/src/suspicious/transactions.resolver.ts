import { Query, Resolver } from '@nestjs/graphql';
import { Transaction } from './models/transaction';
import { TransactionsService } from './transactions.service';

@Resolver(of => Transaction)
export class TransactionsResolver {

  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(returns => [Transaction])
  getSuspiciousTransactions(): Transaction[] {
    return this.transactionsService.findSuspicious();
  }
}
