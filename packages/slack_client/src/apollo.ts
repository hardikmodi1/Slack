import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from "apollo-utilities";
import introspectionQueryResultData from "./generated/graphqlTypes";

const httpLink = createUploadLink({
	credentials: "include",
	uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000/graphql`,
	options: {
		reconnect: true
	}
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

export const client = new ApolloClient({
	cache,
	link,
	connectToDevTools: true
});
