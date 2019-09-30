import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql';

export enum TransactionState {
  Suspicious,
  None,
  Approved,
  Declined
}

registerEnumType(TransactionState, {
  name: "TransactionState",
});

@ObjectType()
export class Transaction {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  from: string;


  @Field(type => ID)
  to: string;

  @Field(type => Int)
  amount: number;

  @Field(type => TransactionState)
  state: TransactionState;

  @Field(type => Date)
  createdAt: Date;
}
