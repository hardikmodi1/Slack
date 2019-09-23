import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	Resolver,
	Root
} from "type-graphql";
import { FindOneOptions, getConnection } from "typeorm";
import { Channel } from "../../entity/Channel";
import { ChannelMember } from "../../entity/ChannelMember";
import { TeamMember } from "../../entity/TeamMember";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import ComposeErrorMessage from "../shared/ComposeErrorMessage";
import { CreateChannelInput } from "./createChannel/CreateChannelInput";
import CreateChannelOutput from "./createChannel/CreateChannelOutput";

@Resolver(Channel)
export class CreateChannelResolver {
	@Authorized()
	@Mutation(() => [CreateChannelOutput])
	async createChannel(
		@Arg("data") { name, isPublic, teamId, members }: CreateChannelInput,
		@Ctx() ctx: Context
	): Promise<Array<typeof CreateChannelOutput>> {
		if (!name || !name.trim()) {
			return [
				ComposeErrorMessage("name", "Channel name should not be empty")
			];
		}
		const ownerPromise: Promise<
			TeamMember | undefined
		> = TeamMember.findOne({
			where: { teamId, isOwner: true, userId: ctx.req.session!.userId }
		});
		//find the logged in user
		const userPromise: Promise<User | undefined> = User.findOne({
			where: { id: ctx.req.session!.userId }
		});
		const [owner, user] = await Promise.all([ownerPromise, userPromise]);
		if (!owner) {
			return [
				ComposeErrorMessage(
					"name",
					"Only owner is allowed to create channel!"
				)
			];
		}
		//if user with given id does not exist or account is deleted
		if (!user) {
			return [ComposeErrorMessage("user", "User does not exist")];
		}

		const channel = await Channel.create({
			name,
			teamId,
			public: isPublic
		}).save();
		if (!isPublic) {
			const channelMembers = members.filter(
				member => member !== ctx.req.session!.userId
			);
			channelMembers.push(ctx.req.session!.userId);
			await getConnection()
				.createQueryBuilder()
				.insert()
				.into(ChannelMember)
				.values(
					channelMembers.map(member => {
						return {
							channelId: channel.id,
							userId: member
						};
					})
				)
				.execute();
		}
		return [channel];
	}

	@FieldResolver()
	async members(@Root() parent: Channel) {
		const members = getConnection().query(`
			select * from public.channel_member as chm 
			join public.user as u on u.id=chm."userId" 
			where chm."channelId"='${parent.id}'
		`);
		return members;
	}

	@FieldResolver()
	async messages(@Root() parent: Channel) {
		const findOptions: FindOneOptions = {
			relations: ["messages"],
			where: { id: parent.id }
		};
		const channel: Channel | undefined = await Channel.findOne(findOptions);
		return channel!.messages;
	}

	@FieldResolver()
	async memberCount(@Root() parent: Channel, @Ctx() ctx: Context) {
		return await ctx.loaders.channelMemberCountLoader.load(parent.id);
	}
}
