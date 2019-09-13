import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Channel } from "../../entity/Channel";
import { ChannelMember } from "../../entity/ChannelMember";
import { Context } from "../../types/Context";
import ComposeErrorMessage from "../shared/ComposeErrorMessage";
import CreateChannelOutput from "./createChannel/CreateChannelOutput";

@Resolver()
export class GetOrCreateDMChannelResolver {
	@Mutation(() => [CreateChannelOutput])
	async getOrCreateDMChannel(
		@Arg("teamId") teamId: string,
		@Arg("member") member: string,
		@Ctx() ctx: Context
	): Promise<Array<typeof CreateChannelOutput>> {
		if (!ctx.req.session!.userId) {
			return [ComposeErrorMessage("login", "Session expired!")];
		}
		const members: string[] = [member, ctx.req.session!.userId];
		console.log(members);
		const isDMChannelExists = await getConnection().query(`
      select ch.id,ch.name,ch."dmChannel" from 
      channel as ch, channel_member as chm
      where ch.id=chm."channelId" and ch."dmChannel"=true and ch."teamId"='${teamId}' and ch.public=false
      group by ch.id having array_agg(chm."userId") @>Array['${members[0]}','${members[1]}']::uuid[] and count(chm."userId")=${members.length}
    `);
		console.log(isDMChannelExists);
		if (isDMChannelExists.length) {
			return isDMChannelExists;
		}
		const users = await getConnection().query(`
			select u.username from public.user as u where u.id in ('${members[0]}','${members[1]}')
		`);
		const channel = await Channel.create({
			dmChannel: true,
			public: false,
			name: users.map((user: any) => user.username).join(", "),
			teamId
		}).save();
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(ChannelMember)
			.values(
				members.map(member => {
					return {
						channelId: channel.id,
						userId: member
					};
				})
			)
			.execute();
		return [channel];
	}
}
