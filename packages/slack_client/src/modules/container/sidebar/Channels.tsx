import { Icon } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { Channel } from "../../../generated/graphqlTypes";
import findDisplayName from "../shared/findDisplayName";
import {
	Bubble,
	ChannelWrapper,
	PushLeft,
	SideBarList,
	SideBarListHeader,
	SideBarListItem,
	TeamNameHeader
} from "./styled-components/ChannelWrapper";

interface Props {
	username: string;
	dmChannels: Channel[];
	team: any;
	regularChannels: Channel[];
	onAddChannelClick: () => void;
	onAddTeamMemberClick: () => void;
	onDirectMessageClick: () => void;
}

const Channels: React.FC<Props> = ({
	username,
	team,
	dmChannels,
	regularChannels,
	onAddChannelClick,
	onAddTeamMemberClick,
	onDirectMessageClick
}) => {
	const channel = ({ id, name }: { id: string; name: string }) => (
		<Link to={`/${team.id}/${id}`} key={`channel-${id}`}>
			<SideBarListItem># {name}</SideBarListItem>
		</Link>
	);

	const user = ({ id, name }: { id: string; name: string }) => (
		<Link to={`/${team.id}/${id}`} key={`dmChannel-${id}`}>
			<SideBarListItem>
				<Bubble me={username === name} />{" "}
				{findDisplayName(name, username)}
			</SideBarListItem>
		</Link>
	);

	return (
		<ChannelWrapper>
			<PushLeft>
				<TeamNameHeader>{team.name}</TeamNameHeader>
				{username}
			</PushLeft>
			<div>
				<SideBarList>
					<SideBarListHeader>
						Channels{" "}
						{team.isOwner && (
							<Icon
								type="plus-circle"
								onClick={onAddChannelClick}
							/>
						)}
					</SideBarListHeader>
					{regularChannels.map(channel)}
				</SideBarList>
			</div>
			<div>
				<SideBarList>
					<SideBarListHeader>
						Direct Messages{" "}
						<Icon
							type="plus-circle"
							onClick={onDirectMessageClick}
						/>
					</SideBarListHeader>
					{dmChannels.map(user)}
				</SideBarList>
			</div>
			{team.isOwner && (
				<div>
					<a href="#invite-people" onClick={onAddTeamMemberClick}>
						+ Invite People
					</a>
				</div>
			)}
		</ChannelWrapper>
	);
};

export default Channels;
