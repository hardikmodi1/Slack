import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Team } from "../../entity/Team";
import { TeamMember } from "../../entity/TeamMember";
import { Context } from "../../types/Context";

@Resolver(Team)
export class AllTeamsResolver {
	@Query(() => [TeamMember], { nullable: true })
	async teams(@Ctx() ctx: Context): Promise<TeamMember[] | null> {
		if (!ctx.req.session) {
			return null;
		}
		const teams: TeamMember[] | undefined = await TeamMember.find({
			where: { userId: ctx.req.session.userId },
			relations: ["team"]
		});
		console.log(teams);
		return teams;
	}

	@FieldResolver()
	async members(@Root() parent: Team) {
		const teamMembers: TeamMember[] | undefined = await TeamMember.find({
			where: { teamId: parent.id },
			relations: ["user"]
		});
		return teamMembers;
	}

	@FieldResolver()
	async channels(@Root() parent: Team, @Ctx() ctx: Context) {
		return await ctx.loaders.channelLoader.load(parent.id);
	}
}
