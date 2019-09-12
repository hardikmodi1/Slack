import { Icon } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { Channel } from "../../../generated/graphqlTypes";
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
	users: any;
	team: any;
	channels: Channel[];
	onAddChannelClick: () => void;
	onAddTeamMemberClick: () => void;
	onDirectMessageClick: () => void;
}

const Channels: React.FC<Props> = ({
	username,
	team,
	users,
	channels,
	onAddChannelClick,
	onAddTeamMemberClick,
	onDirectMessageClick
}) => {
	const channel = ({ id, name }: { id: string; name: string }) => (
		<Link to={`/view-team/${team.id}/${id}`} key={`channel-${id}`}>
			<SideBarListItem># {name}</SideBarListItem>
		</Link>
	);

	const user = ({ id, username: name }: { id: string; username: string }) => (
		<Link to={`/view-team/user/${team.id}/${id}`} key={`user-${id}`}>
			<SideBarListItem>
				<Bubble me={username === name} /> {name}
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
					{channels.map(channel)}
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
					{users.map(user)}
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
