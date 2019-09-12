import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Channel } from "./Channel";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field({ nullable: true })
	@Column("text", { nullable: true })
	text: string;

	@Column({ nullable: true })
	channelId: number;

	@Field({ nullable: true })
	@Column("text", { nullable: true })
	url: string;

	@Field({ nullable: true })
	@Column("text", { nullable: true })
	type: string;

	@Column({ nullable: true })
	userId: number;

	@Field({ nullable: true })
	originalName: string;

	@Field(() => Channel, { nullable: true })
	@ManyToOne(() => Channel, channel => channel.messages)
	channel: Channel;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, user => user.messages)
	user: User;

	@Field(() => Date, { nullable: true })
	@Column({ default: new Date() })
	time: Date;
}
