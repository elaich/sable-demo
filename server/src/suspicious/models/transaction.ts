import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Transaction {
  @Field(type => ID)
  id: string;
}
