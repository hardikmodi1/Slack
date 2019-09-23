import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import createLoaders from "./loaders/createLoaders";
import { pubsub, redis } from "./redis";
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const http = require("http");

const main = async () => {
	await createConnection();
	const schema = await buildSchema({
		resolvers: [__dirname + "/modules/**/*.?s"],
		authChecker: ({ context: { req } }) => {
			return !!req.session.userId;
		},
		authMode: "null",
		pubSub: pubsub,
		dateScalarMode: "isoDate"
	});

	const sessionMiddleare = session({
		store: new RedisStore({
			client: redis as any
		}),
		name: "qid",
		secret: "aslkdfjoiq12312",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
		}
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: any) => ({
			req,
			res,
			loaders: createLoaders(req),
			url: req ? `${req.protocol}://${req.get("host")}` : ''
		}),
		subscriptions: {
			onConnect: (_, webSocket: any) => {
				sessionMiddleare(webSocket.upgradeReq, {} as any, () => {
					if (!webSocket.upgradeReq.session.userId) {
						throw new Error("not authenticated!");
					}
				});
				return true;
			}
		}
	});
	const app = Express();

	app.use(
		cors({
			origin: true,
			credentials: true
		})
	);

	app.use("/files", Express.static("src/files"));

	app.use(sessionMiddleare);
	apolloServer.applyMiddleware({ app, cors: false });
	const httpServer = http.createServer(app);
	apolloServer.installSubscriptionHandlers(httpServer);
	httpServer.listen(4000, () => {
		console.log(
			`🚀 Server ready at http://localhost:${4000}${
				apolloServer.graphqlPath
			}`
		);
		console.log(
			`🚀 Subscriptions ready at ws://localhost:${4000}${
				apolloServer.subscriptionsPath
			}`
		);
	});
	// app.listen(4000, () => {
	// 	console.log("Server started on http://localhost:4000/graphql");
	// });
};

main();
