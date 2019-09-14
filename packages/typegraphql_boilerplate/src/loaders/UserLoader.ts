import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const batchUsers = async (userIds: string[]) => {
	const allUsers: User[] = await getConnection().query(
		`
	  select u.username,u.email,u.id from public.user as u where u.id in ($1)
  `,
		userIds
	);
	const userMap: { [key: string]: User } = {};
	allUsers.forEach(user => {
		userMap[user.id] = user;
	});

	return userIds.map(userId => userMap[userId]);
};
