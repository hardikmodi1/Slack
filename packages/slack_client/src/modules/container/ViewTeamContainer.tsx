import findIndex from "lodash/findIndex";
import * as React from "react";
import { useQuery } from "react-apollo";
import { Redirect, RouteComponentProps } from "react-router";
import {
	MeQueryQuery,
	MeQueryQueryVariables,
	TeamsQueryQuery,
	TeamsQueryQueryVariables
} from "../../generated/graphqlTypes";
import { TEAMS_QUERY } from "../graphql/team/query/allTeamsQuery";
import { ME_QUERY } from "../graphql/user/query/meQuery";
import DirectMessage from "./content/DirectMessage";
import ViewTeam from "./ViewTeam";

const ViewTeamContainer: React.FC<RouteComponentProps<{}>> = ({
	match: { params }
}) => {
	const { loading, data } = useQuery<
		TeamsQueryQuery,
		TeamsQueryQueryVariables
	>(TEAMS_QUERY, { fetchPolicy: "network-only" });
	const { loading: meLoading, data: meData } = useQuery<
		MeQueryQuery,
		MeQueryQueryVariables
	>(ME_QUERY);
	if (loading || meLoading) {
		return null;
	}
	if (!data || !meData) {
		return null;
	}
	if (data.teams!.length === 0) {
		return <Redirect to="/create-team" />;
	}
	const currentTeamId: number = parseInt((params as any).teamId, 10);
	const currentChannelId: number = parseInt((params as any).channelId, 10);
	const userId: number = parseInt((params as any).userId, 10);
	const allTeams = data.teams!.map(item => {
		return { ...item.team, isOwner: item.isOwner };
	});
	const teamIdx = currentTeamId
		? findIndex(allTeams, ["id", currentTeamId.toString()])
		: 0;
	const team = teamIdx === -1 ? allTeams[0] : allTeams[teamIdx];
	return (
		<div>
			{userId ? (
				userId && (
					<DirectMessage
						userId={userId}
						team={team}
						allTeams={allTeams}
						username={meData.me!.username}
						teamIdx={teamIdx === -1 ? 0 : teamIdx}
					/>
				)
			) : (
				<ViewTeam
					currentChannelId={currentChannelId}
					team={team}
					allTeams={allTeams}
					username={meData.me!.username}
					teamIdx={teamIdx}
				/>
			)}
		</div>
	);
};

export default ViewTeamContainer;
