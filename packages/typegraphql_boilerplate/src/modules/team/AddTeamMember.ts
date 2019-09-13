import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { TeamMember } from "../../entity/TeamMember";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import ComposeErrorMessage from "../shared/ComposeErrorMessage";
import ErrorType from "../shared/ErrorType";

@Resolver()
export class AddTeamMemberResolver {
	@Mutation(() => ErrorType, { nullable: true })
	async addTeamMember(
		@Arg("email") email: string,
		@Arg("teamId") teamId: string,
		@Ctx() ctx: Context
	): Promise<ErrorType | null> {
		if (!email || !email.trim()) {
			return ComposeErrorMessage("name", "Email should not be empty");
		}
		//find the logged in user
		if (!ctx.req.session || !ctx.req.session.userId) {
			return ComposeErrorMessage("user", "Your session had expired!");
		}
		const owner = await TeamMember.findOne({
			where: { isOwner: true, userId: ctx.req.session.userId, teamId }
		});
		if (!owner) {
			return ComposeErrorMessage(
				"name",
				"Only owner allowed to add team member"
			);
		}
		const user: User | undefined = await User.findOne({ where: { email } });
		if (!user) {
			return ComposeErrorMessage("name", "User does not exist");
		}
		await TeamMember.create({
			teamId,
			userId: user.id
		}).save();
		return null;
		// const ownerPromise: Promise<Team | undefined> = Team.findOne({
		// 	where: { teamId, userId:  },
		// });
		// const userToAddPromise: Promise<User | undefined> = User.findOne({
		// 	where: { email },
		// 	relations: ["teams_member"]
		// });
		// const teamMembersPromise: Promise<Team | undefined> = Team.findOne({
		// 	where: { id: teamId },
		// 	relations: ["members"]
		// });
		// const [owner, user, team] = await Promise.all([
		// 	ownerPromise,
		// 	userToAddPromise,
		// 	teamMembersPromise
		// ]);
		// if (owner!.owner.id !== ctx.req.session.userId) {
		// 	return ComposeErrorMessage(
		// 		"name",
		// 		"Only owner is allowed to add memeber to the team!"
		// 	);
		// }
		// //if user with given id does not exist or account is deleted
		// if (!user) {
		// 	return ComposeErrorMessage("name", "User does not exist");
		// }

		// if (!team) {
		// 	return ComposeErrorMessage("name", "Team does not exist");
		// }
		// team.members = [...team.members, user];
		// await team.save();
		// user.teams_member = [...user.teams_member, team];
		// await user.save();
		// return null;
	}
}
