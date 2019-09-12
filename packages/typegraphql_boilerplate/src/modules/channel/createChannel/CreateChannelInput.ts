import { Field, InputType } from "type-graphql";

@InputType()
export class CreateChannelInput {
	@Field()
	name: string;

	@Field()
	isPublic: boolean;

	@Field()
	teamId: number;

	@Field(() => [String], { nullable: true })
	members: string[];
}
