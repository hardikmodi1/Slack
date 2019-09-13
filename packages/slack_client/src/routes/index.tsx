import * as React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import ViewTeam from "../modules/container/ViewTeam";
import ViewTeamContainer from "../modules/container/ViewTeamContainer";
import CreateTeam from "../modules/team/create/CreateTeamConnector";
import Login from "../modules/user/login/LoginConnector";
import Register from "../modules/user/register/RegisterConnector";
import AuthRoute from "./AuthRoute";
import GuestRoute from "./GuestRoute";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<GuestRoute exact={true} path="/register" component={Register} />
			<GuestRoute exact={true} path="/login" component={Login} />
			<AuthRoute
				exact={true}
				path="/create-team"
				component={CreateTeam}
			/>
			<AuthRoute exact={true} path="/" component={ViewTeam} />
			<AuthRoute
				exact={true}
				path="/view-team/:teamId?/:channelId?"
				component={ViewTeamContainer}
			/>
		</Switch>
	</BrowserRouter>
);

export default Routes;
