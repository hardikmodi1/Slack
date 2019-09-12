import * as React from "react";
import styled from "styled-components";

export const ChannelWrapper = styled.div`
	grid-column: 2;
	grid-row: 1 / 4;
	background-color: #4e3a4c;
	color: #958993;
`;

export const TeamNameHeader = styled.h1`
	color: #fff;
	font-size: 20px;
	margin-bottom: 0px;
`;

export const SideBarList = styled.ul`
	width: 100%;
	list-style: none;
	padding-left: 0px;
`;

export const paddingLeft = "padding-left: 10px";

export const SideBarListItem = styled.li`
	padding: 2px;
	${paddingLeft};
	&:hover {
		background: #3e313c;
	}
`;

export const SideBarListHeader = styled.li`
	${paddingLeft};
	margin-top: 10px;
`;

export const PushLeft = styled.div`
	${paddingLeft};
`;

export const Green = styled.span`
	color: #38978d;
`;

export const Heart = styled.span`
	font-size: 11px;
`;

// @ts-ignore
export const Bubble = ({ on = true, me = false }) =>
	me ? <Heart>❤️</Heart> : on ? <Green>●</Green> : <span>'o'</span>;
