import * as React from "react";
import HeaderWrapper from "./styled-components/HeaderWrapper";

interface Props {
	channelName: string;
}

const Header: React.FC<Props> = ({ channelName }) => {
	return <HeaderWrapper># {channelName}</HeaderWrapper>;
};

export default Header;
