import { Arg, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Channel } from "../../entity/Channel";
import { ChannelMember } from "../../entity/ChannelMember";
import { Team } from "../../entity/Team";
import { Context } from "../../types/Context";

@Resolver()
export class GetOrCreateDMChannelResolver {
	@Mutation(() => Int)
	async getOrCreateDMChannel(
		@Arg("teamId") teamId: string,
		@Arg("members", () => [String]) members: string[],
		@Ctx() ctx: Context
	): Promise<number> {
		if (!ctx.req.session!.userId) {
			return -1;
		}
		const allMembers = [...members, ctx.req.session!.userId.toString()];
		const isDMChannelExists = await getConnection().query(`
      select ch.id from 
      channel as ch, channel_member as chm
      where ch.id=chm."channelId" and ch."dmChannel"=true and ch."teamId"=${teamId} and ch.public=false
      group by ch.id having array_agg(chm."userId") @>Array[${allMembers}] and count(chm."userId")=${allMembers.length}
    `);
		if (isDMChannelExists.length) {
			return isDMChannelExists[0].id;
		}
		const team: Team | undefined = await Team.findOne({
			where: { id: teamId }
		});
		const channel = await Channel.create({
			dmChannel: true,
			public: false,
			name: "First",
			team
		}).save();
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(ChannelMember)
			.values(
				members.map(member => {
					return {
						channelId: channel.id,
						userId: parseInt(member, 10)
					};
				})
			)
			.execute();
		return channel.id;
	}
}
