import * as React from "react";
import { useApolloClient, useMutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import {
	LoginMutationMutationResult,
	LoginMutationMutationVariables
} from "../../../generated/graphqlTypes";
import { LOGIN_MUTATION } from "../../graphql/user/mutation/loginMutation";
import { normalizeErrors } from "../../shared/normalizeError";
import LoginView from "./LoginView";

const Login: React.FC<RouteComponentProps<{}>> = props => {
	const [login, { loading }] = useMutation<
		LoginMutationMutationResult,
		LoginMutationMutationVariables
	>(LOGIN_MUTATION);
	const client = useApolloClient();
	async function submit(values: LoginMutationMutationVariables) {
		const { data } = await login({ variables: values });
		if ((data! as any).login) {
			return normalizeErrors((data! as any).login as any[]);
		}
		return null;
	}
	async function onFinish() {
		await client!.resetStore();
		return props.history.push("/create-team");
	}
	return (
		<LoginView
			submit={submit}
			onFinish={onFinish}
			loading={loading}
			client={client}
		/>
	);
};

export default Login;
