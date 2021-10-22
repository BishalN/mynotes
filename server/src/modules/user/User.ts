import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { Note } from '../notes/Note';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number;

  @Field((type) => String, { nullable: true })
  bio: string | null;

  @Field((type) => String, { nullable: true })
  imageUrl: string | null;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;

  @Field((type) => [Note], { nullable: true })
  notes?: [Note] | null;
}
