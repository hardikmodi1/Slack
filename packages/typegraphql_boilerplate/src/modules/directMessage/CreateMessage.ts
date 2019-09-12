import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	PubSub,
	PubSubEngine,
	Resolver,
	Root
} from "type-graphql";
import { FindOneOptions } from "typeorm";
import { DirectMessage } from "../../entity/DirectMessage";
import { TeamMember } from "../../entity/TeamMember";
import { Context } from "../../types/Context";
import { DIRECT_MESSAGE } from "./constants";

@Resolver(DirectMessage)
export class CreateDirectMessageResolver {
	@Mutation(() => Boolean)
	async createDirectMessage(
		@Arg("receiverId") receiverId: number,
		@Arg("teamId") teamId: number,
		@Arg("text") text: string,
		@PubSub() pubSub: PubSubEngine,
		@Ctx() ctx: Context
	): Promise<Boolean> {
		if (!text || !text.trim()) {
			return false;
		}
		if (!ctx.req.session!.userId) {
			return false;
		}
		const senderPromise: Promise<
			TeamMember | undefined
		> = TeamMember.findOne({
			where: { teamId, userId: ctx.req.session!.userId }
		});
		const receiverPromise: Promise<
			TeamMember | undefined
		> = TeamMember.findOne({ where: { teamId, userId: receiverId } });
		const [sender, receiver] = await Promise.all([
			senderPromise,
			receiverPromise
		]);
		if (!sender || !receiver) {
			return false;
		}
		const directMessage = await DirectMessage.create({
			text,
			teamId,
			senderId: ctx.req.session!.userId,
			receiverId,
			time: new Date()
		}).save();
		await pubSub.publish(DIRECT_MESSAGE, directMessage);
		return true;
	}

	@FieldResolver()
	async sender(@Root() parent: DirectMessage) {
		const findOptions: FindOneOptions = {
			relations: ["sender"],
			where: { id: parent.id }
		};
		const message: DirectMessage | undefined = await DirectMessage.findOne(
			findOptions
		);
		return message!.sender;
	}

	@FieldResolver()
	async team(@Root() parent: DirectMessage) {
		const findOptions: FindOneOptions = {
			relations: ["team"],
			where: { id: parent.id }
		};
		const message: DirectMessage | undefined = await DirectMessage.findOne(
			findOptions
		);
		return message!.team;
	}

	@FieldResolver()
	async receiver(@Root() parent: DirectMessage) {
		const findOptions: FindOneOptions = {
			relations: ["receiver"],
			where: { id: parent.id }
		};
		const message: DirectMessage | undefined = await DirectMessage.findOne(
			findOptions
		);
		return message!.receiver;
	}
}
