import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { ChannelMember } from "./ChannelMember";
import { Message } from "./Message";
import { Team } from "./Team";
import { User } from "./User";

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column("varchar", { length: 255 })
	name: string;

	@Field()
	@Column("boolean", { default: true })
	public: boolean;

	@Column()
	teamId: string;

	@Field({ nullable: true })
	@Column("boolean", { default: false })
	dmChannel: boolean;

	@ManyToOne(() => Team, team => team.channels)
	team: Team;

	@Field(() => [User])
	@OneToMany(() => ChannelMember, channelMember => channelMember.channel)
	members: ChannelMember[];

	@Field(() => [Message])
	@OneToMany(() => Message, message => message.channel)
	messages: Message[];

	@Field()
	memberCount: number;
}
