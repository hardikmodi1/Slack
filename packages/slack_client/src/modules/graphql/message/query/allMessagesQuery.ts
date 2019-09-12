import gql from "graphql-tag";

export const ALL_MESSAGES_QUERY = gql`
	query AllMessagesQuery($channelId: Float!, $offset: Float!) {
		allMessages(channelId: $channelId, offset: $offset) {
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
