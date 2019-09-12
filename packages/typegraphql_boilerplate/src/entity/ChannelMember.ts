import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { Channel } from "./Channel";
import { User } from "./User";

@ObjectType()
@Entity()
export class ChannelMember extends BaseEntity {
	@Field()
	@PrimaryColumn()
	userId: number;

	@Field()
	@PrimaryColumn()
	channelId: number;

	@Field(() => User)
	@ManyToOne(() => User, user => user.member_of_channels, { primary: true })
	@JoinColumn({ name: "userId" })
	user: User;

	@Field(() => Channel)
	@ManyToOne(() => Channel, channel => channel.members, {
		primary: true
	})
	@JoinColumn({ name: "channelId" })
	channel: Channel;
}
