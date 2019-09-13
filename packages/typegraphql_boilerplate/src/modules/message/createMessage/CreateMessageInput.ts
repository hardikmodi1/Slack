import { Field, InputType } from "type-graphql";

@InputType()
export class CreateMessageInput {
	@Field({ nullable: true })
	text: string;

	@Field()
	channelId: string;
}
