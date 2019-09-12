import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { FindManyOptions } from "typeorm";
import { DirectMessage } from "../../entity/DirectMessage";
import { Message } from "../../entity/Message";
import { Context } from "../../types/Context";

@Resolver()
export class AllDirectMessagesResolver {
	@Query(() => [DirectMessage])
	async allDirectMessages(
		@Arg("teamId") teamId: number,
		@Arg("otherUserId") otherUserId: number,
		@Ctx() ctx: Context
	): Promise<Message[]> {
		if (!ctx.req.session) {
			return [];
		}
		const userId = ctx.req.session.userId;
		const findOptions: FindManyOptions = {
			where: [
				{ teamId, senderId: otherUserId, receiverId: userId },
				{ teamId, senderId: userId, receiverId: otherUserId }
			],
			order: { time: "ASC" }
		};
		return await DirectMessage.find(findOptions);
	}
}
