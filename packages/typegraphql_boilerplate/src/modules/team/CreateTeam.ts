import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Channel } from "../../entity/Channel";
import { Team } from "../../entity/Team";
import { TeamMember } from "../../entity/TeamMember";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import ComposeErrorMessage from "../shared/ComposeErrorMessage";
import CreateTeamOutput from "./createTeam/CreateTeamOutput";

@Resolver()
export class CreateTeamResolver {
	@Mutation(() => [CreateTeamOutput], { nullable: true })
	async createTeam(
		@Arg("name") name: string,
		@Ctx() ctx: Context
	): Promise<Array<typeof CreateTeamOutput>> {
		if (!name || !name.trim()) {
			return [ComposeErrorMessage("name", "Name should not be empty")];
		}
		//find the logged in user
		if (!ctx.req.session || !ctx.req.session.userId) {
			return [ComposeErrorMessage("user", "Your session had expired!")];
		}
		const user: User | undefined = await User.findOne({
			where: { id: ctx.req.session.userId },
			relations: ["member_of_teams"]
		});
		//if user with given id does not exist or account is deleted
		if (!user) {
			return [ComposeErrorMessage("user", "User does not exist")];
		}

		try {
			const team = await Team.create({
				name: name
			}).save();
			await Channel.create({
				name: "general",
				team
			}).save();
			await TeamMember.create({
				isOwner: true,
				teamId: team.id,
				userId: ctx.req.session.userId
			}).save();
			// await Promise.all([SaveChannelPromise,SaveTeamMemberPromise])
			return [team];
		} catch (error) {
			return [ComposeErrorMessage("name", "Team name already exist")];
		}
	}
}
