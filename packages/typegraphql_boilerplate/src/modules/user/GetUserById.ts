import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver(User)
export class GetUserByIdResolver {
	@Query(() => User, { nullable: true })
	async getUserById(
		@Arg("userId") userId: string
	): Promise<User | undefined> {
		return User.findOne({ where: { id: userId } });
	}
}
