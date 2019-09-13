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
	const currentTeamId: string = (params as any).teamId;
	const currentChannelId: string = (params as any).channelId;
	// const userId: string = (params as any).userId;
	const allTeams = data.teams!.map(item => {
		return { ...item.team, isOwner: item.isOwner };
	});
	const teamIdx = currentTeamId
		? findIndex(allTeams, ["id", currentTeamId])
		: 0;
	const team = teamIdx === -1 ? allTeams[0] : allTeams[teamIdx];
	return (
		<div>
			<ViewTeam
				currentChannelId={currentChannelId}
				team={team}
				allTeams={allTeams}
				username={meData.me!.username}
				teamIdx={teamIdx}
			/>
		</div>
	);
};

export default ViewTeamContainer;
