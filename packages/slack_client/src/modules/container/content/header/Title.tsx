import { Icon } from "antd";
import React from "react";
import { Channel } from "../../../../generated/graphqlTypes";
import findDisplayName from "../../shared/findDisplayName";
import Subtitle from "../styled-components/Subtitle";
import ChannelInfo from "./ChannelInfo";

interface Props {
	channel: Channel;
	username: string;
}

const Title: React.FC<Props> = ({ channel, username }) => {
	const [visible, setVisible] = React.useState<boolean>(false);
	function showDrover() {
		setVisible(true);
	}
	function hideDrover() {
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
				<Subtitle onClick={showDrover}>
					<Icon type="user" style={{ paddingRight: "5px" }} />
					{channel.memberCount}
				</Subtitle>
			)}
			<ChannelInfo
				visible={visible}
				onClose={hideDrover}
				channel={channel}
			/>
		</div>
	);
};

export default Title;
