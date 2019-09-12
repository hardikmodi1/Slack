import { Field, ID, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";

@ObjectType()
@Entity()
export class DirectMessage extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column("text")
	text: string;

	@Column({ nullable: true })
	senderId: number;

	@Column({ nullable: true })
	receiverId: number;

	@Column({ nullable: true })
	teamId: number;

	@Field(() => User)
	@ManyToOne(() => User, user => user.directMessagesSender)
	sender: User;

	@Field(() => User)
	@ManyToOne(() => Team, team => team.directMessages)
	team: Team;

	@Field(() => User)
	@ManyToOne(() => User, user => user.directMessagesReceiver)
	receiver: User;

	@Field(() => Date, { nullable: true })
	@Column({ default: new Date() })
	time: Date;
}
