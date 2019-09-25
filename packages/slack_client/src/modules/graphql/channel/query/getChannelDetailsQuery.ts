import gql from "graphql-tag";

export const GET_CHANNEL_DETAILS_QUERY = gql`
	query GetChannelsDetailsQuery($channelId: String!) {
		getChannelDetails(channelId: $channelId) {
			files {
				type
				url
				originalName
			}
			id
			name
			members {
				id
				email
				username
			}
			pinnedMessagesCount
			pinnedMessages {
				id
				user {
					username
				}
				pinnedMessage {
					id
					text
					url
					type
					originalName
				}
			}
		}
	}
`;
