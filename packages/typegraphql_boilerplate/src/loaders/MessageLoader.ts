import { getConnection } from "typeorm";
import { Message } from "../entity/Message";

export const batchMessages = async (messageIds: string[]) => {
	let ids = "";
	messageIds.forEach((messageId, index) => {
		if (index === messageIds.length - 1) {
			ids += "'" + messageId + "'";
		} else {
			ids += "'" + messageId + "'" + ",";
		}
	});
	const allMessages: Message[] = await getConnection().query(
		`
	  select * from public.message as me where me.id in (${ids})
  `
	);
	const messageMap: { [key: string]: Message } = {};
	allMessages.forEach(message => {
		messageMap[message.id] = message;
	});
	return messageIds.map(messageId => messageMap[messageId]);
};
