import 'reflect-metadata';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { User } from '../user/User';

@ObjectType()
export class Note {
  @Field((type) => ID)
  id: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field()
  title: string;

  @Field((type) => String, { nullable: true })
  content: string | null;

  @Field((type) => User, { nullable: true })
  author?: User | null;
}
