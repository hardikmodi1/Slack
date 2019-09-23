import { Channel } from "src/entity/Channel";
import { getConnection } from "typeorm";

export const batchChannels = async (teamIds: string[], req: any) => {
	let ids = "";
	teamIds.forEach((teamId, index) => {
		if (index === teamIds.length - 1) {
			ids += "'" + teamId + "'";
		} else {
			ids += "'" + teamId + "'" + ",";
		}
	});
	const allChannels: Channel[] = await getConnection().query(
		`select distinct on (ch.id) ch.id,ch.name, ch."dmChannel", ch."teamId", ch.public from public.channel as ch left outer join channel_member as chm on 
			ch.id=chm."channelId"
			where ch."teamId" in (${ids}) and (ch.public=true or (chm."userId"='${
			req.session!.userId
		}')) `
	);
	const channelsPerTeam: { [key: string]: Channel[] } = {};
	allChannels.forEach(channel => {
		if (channelsPerTeam[channel.teamId]) {
			channelsPerTeam[channel.teamId].push(channel);
		} else {
			channelsPerTeam[channel.teamId] = [channel];
		}
	});
	return teamIds.map(teamId => channelsPerTeam[teamId]);
};
