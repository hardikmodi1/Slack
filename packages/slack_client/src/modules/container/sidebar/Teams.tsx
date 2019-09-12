import { Tooltip } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import {
	TeamList,
	TeamListItem,
	TeamWrapper
} from "./styled-components/TeamWrapper";

interface Props {
	teams: any;
}

const Teams: React.FC<Props> = ({ teams }) => {
	const team = ({ id, name }: { id: string; name: string }) => (
		<Link to={`/view-team/${id}`} key={`team-${id}`}>
			<TeamListItem>
				<Tooltip placement="rightBottom" title={name}>
					{name.charAt(0).toUpperCase()}
				</Tooltip>
			</TeamListItem>
		</Link>
	);

	return (
		<TeamWrapper>
			<div>
				<TeamList>
					{teams.map(team)}

					<Link to="/create-team" key="add-team">
						<TeamListItem>
							<Tooltip
								placement="rightBottom"
								title="Create Team"
							>
								+
							</Tooltip>
						</TeamListItem>
					</Link>
				</TeamList>
			</div>
		</TeamWrapper>
	);
};

export default Teams;
