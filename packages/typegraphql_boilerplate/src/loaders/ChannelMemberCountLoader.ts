import { getConnection } from "typeorm";

export const batchChannelMemberCount = async (channelIds: string[]) => {
	let ids = "";
	channelIds.forEach((channel, index) => {
		if (index === channelIds.length - 1) {
			ids += "'" + channel + "'";
		} else {
			ids += "'" + channel + "'" + ",";
		}
	});
	console.log(ids, "object");
	const allChannelsMembersCount = await getConnection().query(
		`select count(ch.id),ch.id from public.channel as ch left outer join channel_member as chm on 
			ch.id=chm."channelId"
			where ch.id in (${ids}) group by ch.id `
	);
	const membersCountPerChannel: { [key: string]: number } = {};
	allChannelsMembersCount.forEach((channel: any) => {
		membersCountPerChannel[channel.id] = parseInt(channel.count, 10);
	});
	console.log(membersCountPerChannel);
	return channelIds.map(channelId => membersCountPerChannel[channelId]);
};
