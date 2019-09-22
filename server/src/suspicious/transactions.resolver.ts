import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transaction, TransactionState } from './models/transaction';
import { TransactionsService } from './transactions.service';

@Resolver(of => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(returns => [Transaction])
  getSuspiciousTransactions(): Transaction[] {
    return this.transactionsService.findSuspicious();
  }

  @Mutation(returns => Transaction)
  approveSuspiciousTransaction(@Args('id') id: string): Transaction {
    return this.transactionsService.updateSuspiciousTransactionState(
      id,
      TransactionState.Approved,
    );
  }
}
