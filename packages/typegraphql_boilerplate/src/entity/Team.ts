import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { Channel } from "./Channel";
import { DirectMessage } from "./DirectMessage";
import { TeamMember } from "./TeamMember";
import { User } from "./User";

@ObjectType()
@Entity()
export class Team extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("varchar", { length: 255, unique: true })
	name: string;

	@Field(() => [TeamMember])
	@OneToMany(() => TeamMember, teamMember => teamMember.team)
	members: TeamMember[];

	@Field(() => [User])
	directMessageUsers: User[];

	@Field(() => [Channel])
	@OneToMany(() => Channel, channel => channel.team)
	channels: Channel[];

	@OneToMany(() => DirectMessage, directMessage => directMessage.team)
	directMessages: DirectMessage[];
}
