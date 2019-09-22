import { Field, InputType, ID } from 'type-graphql';
import { TransactionState } from '../models/transaction';

@InputType()
export class UpdateTransactionInput {

  @Field(type => ID)
  id: string;

  @Field(type => TransactionState)
  state: TransactionState;
}
