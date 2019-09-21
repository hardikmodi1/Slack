import gql from "graphql-tag";

export const GET_CHANNEL_DETAILS_QUERY = gql`
	query GetChannelsDetailsQuery($channelId: String!) {
		getChannelDetails(channelId: $channelId) {
			id
			name
			members {
				id
				email
				username
			}
		}
	}
`;
