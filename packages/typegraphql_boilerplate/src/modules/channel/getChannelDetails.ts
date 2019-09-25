import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Channel } from "../../entity/Channel";
import { Team } from "../../entity/Team";
import { Context } from "../../types/Context";

@Resolver(Team)
export class GetChannelDetailsResolver {
	@Query(() => Channel, { nullable: true })
	async getChannelDetails(
		@Ctx() ctx: Context,
		@Arg("channelId") channelId: string
	): Promise<Channel | undefined> {
		if (!ctx.req.session) {
			return undefined;
		}
		return await Channel.findOne({ where: { id: channelId } });
	}
}
