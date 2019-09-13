import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { ChannelMember } from "./ChannelMember";
import { Message } from "./Message";
import { TeamMember } from "./TeamMember";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column("varchar", { length: 255, unique: true })
	email: string;

	@Field()
	@Column("varchar", { length: 255, unique: true })
	username: string;

	@Column("text")
	password: string;

	@Column("bool", { default: true })
	confirmed: boolean;

	@OneToMany(() => Message, message => message.user)
	messages: Message[];

	@OneToMany(() => TeamMember, teamMember => teamMember.user)
	member_of_teams: TeamMember[];

	@OneToMany(() => ChannelMember, channelMember => channelMember.user)
	member_of_channels: ChannelMember[];
}
