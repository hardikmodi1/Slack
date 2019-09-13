import * as React from "react";
import { useMutation } from "react-apollo";
import {
	AddTeamMemberMutatioMutation,
	AddTeamMemberMutatioMutationVariables,
	Channel,
	Team
} from "../../../generated/graphqlTypes";
import { ADD_TEAM_MEMBER_MUTATION } from "../../../modules/graphql/team/mutation/addTeamMember";
import { normalizeErrors } from "../../../modules/shared/normalizeError";
import AddChannelModalConnector from "./channel/AddChannelModalConnector";
import Channels from "./Channels";
import AddMemberModal from "./directMessage/AddMemberModal";
import DirectMessageModal from "./directMessage/DirectMessageModal";
import Teams from "./Teams";

interface Props {
	teams: Team[];
	team: Team;
	teamIdx: number;
	username: string;
}

const Sidebar: React.FC<Props> = ({ teams, team, teamIdx, username }) => {
	const [addChannelModalVisible, setAddChannelModalVisible] = React.useState(
		false
	);

	// const [getOrCreateDMChannel] = useMutation<
	// 	GetOrCreateDmChannelMutationMutation,
	// 	GetOrCreateDmChannelMutationMutationVariables
	// >(GET_OR_CREATE_DM_CHANNEL_MUTATION);

	function onAddChannelClick() {
		setAddChannelModalVisible(true);
	}

	function handleCancel() {
		setAddChannelModalVisible(false);
	}
	const [
		addTeamMemberModalVisible,
		setAddTeamMemberModalVisible
	] = React.useState(false);

	function onAddTeamMemberClick() {
		setAddTeamMemberModalVisible(true);
	}

	function handleAddTeamMemberCancel() {
		setAddTeamMemberModalVisible(false);
	}

	const [
		directMessageModalVisible,
		setDirectMessageModalVisible
	] = React.useState(false);
	function onDirectMessageClick() {
		setDirectMessageModalVisible(true);
	}

	function onDirectMessageCancel() {
		setDirectMessageModalVisible(false);
	}

	const [addTeamMember, { loading: addTeamMemberLoading }] = useMutation<
		AddTeamMemberMutatioMutation,
		AddTeamMemberMutatioMutationVariables
	>(ADD_TEAM_MEMBER_MUTATION);

	async function addTeamMemberSubmit(email: string) {
		const { data: addTeamMemberData } = await addTeamMember({
			variables: { email, teamId: teams[teamIdx].id }
		});
		if (
			addTeamMemberData &&
			addTeamMemberData.addTeamMember &&
			addTeamMemberData.addTeamMember.path
		) {
			return normalizeErrors([addTeamMemberData.addTeamMember] as any[]);
		}
		setAddTeamMemberModalVisible(false);
		return null;
	}
	const regularChannels: Channel[] = [];
	const dmChannels: Channel[] = [];
	team.channels.forEach((channel: Channel) => {
		if (channel.dmChannel) {
			dmChannels.push(channel);
		} else {
			regularChannels.push(channel);
		}
	});
	return (
		<>
			<Teams
				teams={teams.map((t: any) => ({
					id: t.id,
					name: t.name
				}))}
			>
				Teams
			</Teams>
			<Channels
				team={team}
				regularChannels={regularChannels}
				username={username}
				dmChannels={dmChannels}
				onAddChannelClick={onAddChannelClick}
				onAddTeamMemberClick={onAddTeamMemberClick}
				onDirectMessageClick={onDirectMessageClick}
			>
				Channels
			</Channels>
			<AddChannelModalConnector
				username={username}
				teamId={team.id}
				teamIdx={teamIdx}
				handleCancel={handleCancel}
				addChannelModalVisible={addChannelModalVisible}
			/>
			<AddMemberModal
				submit={addTeamMemberSubmit}
				loading={addTeamMemberLoading}
				open={addTeamMemberModalVisible}
				handleCancel={handleAddTeamMemberCancel}
			/>
			<DirectMessageModal
				username={username}
				teamIdx={teamIdx}
				teamId={team.id}
				open={directMessageModalVisible}
				handleCancel={onDirectMessageCancel}
			/>
		</>
	);
};

export default Sidebar;
