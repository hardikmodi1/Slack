import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Channel } from "./Channel";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity()
export class PinnedMessages extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: true })
	channelId: string;

	@Column({ nullable: true })
	userId: string;

	@Column({ nullable: true })
	pinnedMessageId: string;

	@Field(() => Channel, { nullable: true })
	@ManyToOne(() => Channel, channel => channel.messages)
	channel: Channel;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, user => user.pinnedMessagesOfUser)
	user: User;

	@Field(() => Message)
	@OneToOne(() => Message)
	@JoinColumn()
	pinnedMessage: Message;
}
