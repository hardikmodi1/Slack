import { Arg, Resolver, Root, Subscription } from "type-graphql";
import { DirectMessage } from "../../entity/DirectMessage";
import { DIRECT_MESSAGE } from "./constants";

@Resolver()
export class NewDirectMessageResolver {
	@Subscription({
		topics: DIRECT_MESSAGE,
		filter: ({ payload, args }) => {
			console.log(args);
			console.log(payload);
			return (
				args.teamId === payload.teamId &&
				(args.userId === payload.senderId ||
					args.userId === payload.receiverId)
			);
		}
	})
	newDirectMessage(
		@Root() MessagePayload: DirectMessage,
		@Arg("userId") userId: number,
		@Arg("teamId") teamId: number
	): DirectMessage {
		console.log(userId);
		console.log(teamId);
		return MessagePayload;
	}
}
