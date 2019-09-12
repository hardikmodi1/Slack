import gql from "graphql-tag";

export const NEW_MEESSAGE_SUBSCRIPTION = gql`
	subscription NewMessageSubscription($channelId: Float!) {
		newMessage(channelId: $channelId) {
			id
			text
			time
			url
			type
			originalName
			user {
				username
			}
		}
	}
`;
