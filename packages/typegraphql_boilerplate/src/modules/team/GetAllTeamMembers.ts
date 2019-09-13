import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";

@Resolver()
export class GettAllTeamMembersResolver {
	@Query(() => [User])
	async getAllTeamMembers(
		@Arg("teamId") teamId: string,
		@Ctx() ctx: Context
	): Promise<User[]> {
		if (!ctx.req.session!.userId) {
			return [];
		}
		return await getConnection().query(
			`select u."id", u.username, u.email from team_member as tmember join public.user as u on u.id=tmember."userId" where tmember."teamId"='${teamId}'`
		);
		// return await TeamMember.find({
		// 	where: { teamId },
		// 	relations: ["user"]
		// });
	}
}
