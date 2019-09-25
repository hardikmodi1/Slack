import { Button, PageHeader } from "antd";
import * as React from "react";
import { Channel } from "../../../generated/graphqlTypes";
import Title from "./header/Title";
import HeaderWrapper from "./styled-components/HeaderWrapper";

interface Props {
	channelName: string;
	channel: Channel;
	username: string;
	teamId: string;
	teamIdx: number;
}

const Header: React.FC<Props> = ({
	channelName,
	channel,
	username,
	teamId,
	teamIdx
}) => {
	return (
		<HeaderWrapper>
			<PageHeader
				backIcon={false}
				title={
					<Title
						channel={channel}
						username={username}
						teamId={teamId}
						teamIdx={teamIdx}
					/>
				}
				extra={[<Button key="3">Operation</Button>]}
			/>
		</HeaderWrapper>
	);
};

export default Header;
