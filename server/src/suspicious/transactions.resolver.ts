import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transaction, TransactionState } from './models/transaction';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionInput } from './dto/update-transaction.input';

@Resolver(of => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(returns => [Transaction])
  getSuspiciousTransactions(): Transaction[] {
    return this.transactionsService.findSuspicious();
  }

  @Mutation(returns => Transaction)
  updateSuspiciousTransaction(
    @Args('input') input: UpdateTransactionInput,
  ): Transaction {
    return this.transactionsService.updateSuspiciousTransactionState(input.id, input.state);
  }
}
