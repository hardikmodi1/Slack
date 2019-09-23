import * as DataLoader from "dataloader";
import { Channel } from "../entity/Channel";
import { User } from "../entity/User";
import { batchChannels } from "./ChannelLoader";
import { batchChannelMemberCount } from "./ChannelMemberCountLoader";
import { batchUsers } from "./UserLoader";

export default function createLoaders(ctx: any) {
	return {
		channelLoader: new DataLoader<string, Channel[]>(ids =>
			batchChannels(ids, ctx)
		),
		userLoader: new DataLoader<string, User>(ids => batchUsers(ids)),
		channelMemberCountLoader: new DataLoader<string, number>(ids =>
			batchChannelMemberCount(ids)
		)
	};
}
