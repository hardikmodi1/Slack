import { Icon } from "antd";
import React from "react";
import { Channel } from "../../../../generated/graphqlTypes";
import findDisplayName from "../../shared/findDisplayName";
import Subtitle from "../styled-components/Subtitle";
import ChannelInfo from "./ChannelInfo";

interface Props {
	channel: Channel;
	username: string;
	teamId: string;
	teamIdx: number;
}

const Title: React.FC<Props> = ({ channel, username, teamId, teamIdx }) => {
	const [visible, setVisible] = React.useState<boolean>(false);
	function showDrawer() {
		setVisible(true);
	}
	function hideDrawer() {
		setVisible(false);
	}
	return (
		<div>
			<div>
				#
				{channel.dmChannel
					? findDisplayName(channel.name, username)
					: channel.name}
			</div>
			{channel.dmChannel === true || channel.public ? (
				""
			) : (
				<Subtitle onClick={showDrawer}>
					<Icon type="user" className="icon-spacing" />
					{channel.memberCount}
				</Subtitle>
			)}
			<Subtitle onClick={showDrawer}>
				<Icon type="pushpin" className="icon-spacing" />
				{channel.pinnedMessagesCount}
			</Subtitle>
			<ChannelInfo
				teamId={teamId}
				teamIdx={teamIdx}
				visible={visible}
				onClose={hideDrawer}
				channel={channel}
			/>
		</div>
	);
};

export default Title;
