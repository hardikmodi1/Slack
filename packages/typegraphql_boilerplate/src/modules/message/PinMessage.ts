import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Resolver,
	Root
} from "type-graphql";
import { PinnedMessages } from "../../entity/PinnedMessages";
import { Context } from "../../types/Context";

@Resolver(PinnedMessages)
export class PinMessageResolver {
	@Mutation(() => Boolean)
	async pinMessage(
		@Arg("channelId") channelId: string,
		@Arg("messageId") messageId: string,
		@Ctx() ctx: Context
	): Promise<Boolean> {
		if (!ctx.req.session!.userId) {
			return false;
		}
		await PinnedMessages.create({
			channelId,
			pinnedMessageId: messageId,
			userId: ctx.req.session!.userId
		}).save();
		return true;
	}

	@FieldResolver()
	async user(@Root() parent: PinnedMessages, @Ctx() ctx: Context) {
		return await ctx.loaders.userLoader.load(parent.userId);
	}

	@FieldResolver()
	async pinnedMessage(@Root() parent: PinnedMessages, @Ctx() ctx: Context) {
		return await ctx.loaders.messageLoader.load(parent.pinnedMessageId);
	}
}
