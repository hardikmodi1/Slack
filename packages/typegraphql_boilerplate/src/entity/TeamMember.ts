import { Field, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";

@ObjectType()
@Entity()
export class TeamMember extends BaseEntity {
	@Field()
	@Column("boolean", { default: false })
	isOwner: boolean;

	@Field()
	@PrimaryColumn()
	userId: string;

	@Field()
	@PrimaryColumn()
	teamId: string;

	@Field(() => User)
	@ManyToOne(() => User, user => user.member_of_teams, { primary: true })
	@JoinColumn({ name: "userId" })
	user: User;

	@Field(() => Team)
	@ManyToOne(() => Team, team => team.members, {
		primary: true
	})
	@JoinColumn({ name: "teamId" })
	team: Team;
}
