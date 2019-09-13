import gql from "graphql-tag";

export const GET_USER_BY_ID_QUERY = gql`
	query GetUserByIdQuery($userId: String!) {
		getUserById(userId: $userId) {
			id
			email
			username
		}
	}
`;
