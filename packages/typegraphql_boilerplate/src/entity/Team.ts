import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn
} from "typeorm";
import { Channel } from "./Channel";
import { TeamMember } from "./TeamMember";

@ObjectType()
@Entity()
export class Team extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column("varchar", { length: 255, unique: true })
	name: string;

	@Field(() => [TeamMember])
	@OneToMany(() => TeamMember, teamMember => teamMember.team)
	members: TeamMember[];

	@Field(() => [Channel])
	@OneToMany(() => Channel, channel => channel.team)
	channels: Channel[];
}
