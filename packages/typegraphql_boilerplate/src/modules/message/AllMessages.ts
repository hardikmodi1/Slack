import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Message } from "../../entity/Message";
import { Context } from "../../types/Context";

@Resolver()
export class AllMessagesResolver {
	@Query(() => [Message])
	async allMessages(
		@Arg("channelId") channelId: string,
		@Arg("offset") offset: number,
		@Ctx() ctx: Context
	): Promise<Message[]> {
		if (!ctx.req.session) {
			return [];
		}
		const messages: Message[] = await getConnection().query(
			`select * from message where "channelId"='${channelId}' order by time DESc limit 15 offset ${offset}`
		);
		return messages.reverse();
	}
}
