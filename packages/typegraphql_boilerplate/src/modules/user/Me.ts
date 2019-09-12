import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";

@Resolver(User)
export class MeResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() ctx: Context): Promise<User | undefined> {
		if (!ctx.req.session!.userId) {
			return undefined;
		}
		console.log("object");
		return User.findOne(ctx.req.session!.userId);
	}
}
