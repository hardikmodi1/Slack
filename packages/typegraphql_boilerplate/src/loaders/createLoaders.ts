import * as DataLoader from "dataloader";
import { Channel } from "../entity/Channel";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { batchChannels } from "./ChannelLoader";
import { batchChannelMemberCount } from "./ChannelMemberCountLoader";
import { batchMessages } from "./MessageLoader";
import { batchUsers } from "./UserLoader";

export default function createLoaders(ctx: any) {
	return {
		channelLoader: new DataLoader<string, Channel[]>(ids =>
			batchChannels(ids, ctx)
		),
		userLoader: new DataLoader<string, User>(ids => batchUsers(ids)),
		messageLoader: new DataLoader<string, Message>(ids =>
			batchMessages(ids)
		),
		channelMemberCountLoader: new DataLoader<string, number>(ids =>
			batchChannelMemberCount(ids)
		)
	};
}
