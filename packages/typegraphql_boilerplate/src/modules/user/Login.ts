import * as bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import ComposeErrorMessage from "../shared/ComposeErrorMessage";
import Error from "../shared/ErrorType";

@Resolver()
export class LoginResolver {
	@Mutation(() => [Error], { nullable: true })
	async login(
		@Arg("usernameOrEmail") usernameOrEmail: string,
		@Arg("password") password: string,
		@Ctx() ctx: Context
	): Promise<Error[] | null> {
		const user = await User.findOne({
			where: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
		});
		if (!user) {
			return [
				ComposeErrorMessage("usernameOrEmail", "User does not exist")
			];
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return [ComposeErrorMessage("password", "Password is incorrect")];
		}
		if (!user.confirmed) {
			return [
				ComposeErrorMessage("password", "Please confirm your account")
			];
		}
		ctx.req.session!.userId = user.id;
		// const findOptions: FindOneOptions = {
		// 	where: { id: 1 },
		// 	relations: ["members"]
		// };
		// const teams: Team | undefined = await Team.findOne(findOptions);
		// console.log(teams);
		return null;
		// const team = new Team();
		// team.name = "Sprinklr";
		// team.owner = user;
		// team.users = [user];
		// await team.save();
		// user.teams_member = [...user.teams_member, team];
		// await user.save();
		// const teams: User[] = await User.find({
		// 	relations: ["teams_member", "teams"]
		// });
		// console.log(teams[0]);
		// const team1: Team | undefined = await Team.findOne(
		// 	{ id: 1 },
		// 	{ relations: ["members"] }
		// );
		// team1!.members = [...team1!.members, user];
		// console.log(team);
		// await team1!.save();
		// console.log(await Team.findOne({ id: 2 }, { relations: ["members"] }));

		// const team2: Team | undefined = await Team.findOne({ id: 1 });
		// const channel = new Channel();
		// channel.name = "Frontend_Sprinklr";
		// channel.team = team2!;
		// channel.public = true;
		// await channel.save();
		// const channel: Channel | undefined = await Channel.findOne({ id: 1 });
		// const message = new Message();
		// message.text = "I am fine!";
		// message.userId = user.id;
		// message.channelId = channel!.id;
		// console.log(message);
		// await message.save();
	}
}
