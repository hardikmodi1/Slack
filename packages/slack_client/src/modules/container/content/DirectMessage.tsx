import { DataProxy } from "apollo-cache";
import findIndex from "lodash/findIndex";
import * as React from "react";
import { useMutation, useQuery } from "react-apollo";
import { Redirect } from "react-router";
import {
	CreateDirectMessageMutationMutation,
	CreateDirectMessageMutationMutationVariables,
	GetUserByIdQueryQuery,
	GetUserByIdQueryQueryVariables
} from "src/generated/graphqlTypes";
import { TEAMS_QUERY } from "src/modules/graphql/team/query/allTeamsQuery";
import { GET_USER_BY_ID_QUERY } from "src/modules/graphql/user/query/getUserByIdQuery";
import { CREATE_DIRECT_MESSAGE_MUTATION } from "../../../modules/graphql/directMessage/mutation/createDirectMessage";
import Sidebar from "../sidebar/Sidebar";
import Container from "../styled-components/Container";
import DirectMessageContainer from "./DirectMessageContainer";
import Header from "./Header";
// import MessageContainer from './MessageContainer';
import SendMessage from "./SendMessage";

export interface Props {
	userId: number;
	team: any;
	allTeams: any;
	username: string;
	teamIdx: number;
}

// @Todo: add type safety on team by making owner nullable on banckend and handle the case when no team
const DirectMessage: React.FC<Props> = ({
	userId,
	team,
	allTeams,
	username,
	teamIdx
}) => {
	const [createDirectMessage] = useMutation<
		CreateDirectMessageMutationMutation,
		CreateDirectMessageMutationMutationVariables
	>(CREATE_DIRECT_MESSAGE_MUTATION);

	const { data, loading } = useQuery<
		GetUserByIdQueryQuery,
		GetUserByIdQueryQueryVariables
	>(GET_USER_BY_ID_QUERY, { variables: { userId } });
	if (!loading && data && !data.getUserById) {
		return <Redirect to="/view-team" />;
	}

	async function sendMessageSubmit(text: string) {
		await createDirectMessage({
			variables: {
				text,
				teamId: parseInt(team.id, 10),
				receiverId: userId
			},
			update(cache: DataProxy) {
				const cachedQuery: any = cache.readQuery({
					query: TEAMS_QUERY
				});
				const cacheCurrentTeam = cachedQuery.teams[teamIdx];
				const memberIndex = findIndex(
					cacheCurrentTeam.team.directMessageUsers,
					["id", userId.toString()]
				);
				if (memberIndex === -1) {
					const updatedData = { ...cachedQuery };
					(updatedData as any).teams[
						teamIdx
					].team.directMessageUsers.push({
						__typename: "User",
						id: userId.toString(),
						email: "h4@gmail.com",
						username: "h4"
					});
					cache.writeQuery({
						query: TEAMS_QUERY,
						data: updatedData
					});
				}
			},
			optimisticResponse: {
				__typename: "Mutation",
				createDirectMessage: true
			}
		});
	}

	return (
		<Container>
			<Sidebar
				teams={allTeams}
				team={team}
				teamIdx={teamIdx}
				username={username}
			/>
			{!loading && <Header channelName={data!.getUserById!.username} />}

			<DirectMessageContainer
				teamId={parseInt(team.id, 10)}
				otherUserId={userId}
			/>

			<SendMessage
				submit={sendMessageSubmit}
				channelId={userId}
				channelName={
					data && data!.getUserById ? data!.getUserById!.username : ""
				}
			/>
		</Container>
	);
};

export default DirectMessage;
