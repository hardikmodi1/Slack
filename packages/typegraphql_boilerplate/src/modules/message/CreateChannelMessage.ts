import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Mutation,
	PubSub,
	PubSubEngine,
	Resolver,
	Root
} from "type-graphql";
import { FindOneOptions } from "typeorm";
import { Message } from "../../entity/Message";
import { Context } from "../../types/Context";
import { CHANNEL_MESSAGE } from "./constants";
import { CreateMessageInput } from "./createMessage/CreateMessageInput";
import { UploadFileTpye } from "./createMessage/UploadFileType";
const uuidv4 = require("uuid/v4");

@Resolver(Message)
export class CreateMessageResolver {
	@Authorized()
	@Mutation(() => Boolean)
	async createMessage(
		@Arg("data") { channelId, text }: CreateMessageInput,
		@Arg("file", () => GraphQLUpload, { nullable: true })
		file: UploadFileTpye,
		@PubSub() pubSub: PubSubEngine,
		@Ctx() ctx: Context
	): Promise<Boolean> {
		if (!file && (!text || !text.trim())) {
			return false;
		}
		var uniqueFileName;
		if (file) {
			const { createReadStream, filename } = file;
			uniqueFileName = `${filename}__${uuidv4()}`;
			await createReadStream().pipe(
				createWriteStream(__dirname + `/../../files/${uniqueFileName}`)
			);
		}
		const message = await Message.create({
			userId: ctx.req.session!.userId,
			time: new Date(),
			channelId,
			type: file && file.mimetype,
			text,
			url: file && uniqueFileName
		}).save();
		// const message = new Message();
		// message.text = text;
		// message.userId = ctx.req.session!.userId;
		// message.channelId = channelId;
		// message.time = new Date();
		// await message.save();
		await pubSub.publish(CHANNEL_MESSAGE, message);
		return true;
	}

	@FieldResolver()
	async originalName(@Root() parent: Message) {
		if (parent.url) {
			const uniqueIdIndex = parent.url.lastIndexOf("__");
			return uniqueIdIndex === -1
				? parent.url
				: parent.url.substring(0, uniqueIdIndex);
		}
		return parent.url;
	}

	@FieldResolver()
	async url(@Root() parent: Message) {
		return parent.url
			? `http://localhost:4000/files/${parent.url}`
			: parent.url;
	}

	@FieldResolver()
	async user(@Root() parent: Message) {
		const findOptions: FindOneOptions = {
			relations: ["user"],
			where: { id: parent.id }
		};
		const message: Message | undefined = await Message.findOne(findOptions);
		return message!.user;
	}

	@FieldResolver()
	async channel(@Root() parent: Message) {
		const findOptions: FindOneOptions = {
			relations: ["channel"],
			where: { id: parent.id }
		};
		const message: Message | undefined = await Message.findOne(findOptions);
		return message!.channel;
	}
}
