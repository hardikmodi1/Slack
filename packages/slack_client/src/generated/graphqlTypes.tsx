import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type ChangePasswordInput = {
  password: Scalars['String'],
  token: Scalars['String'],
};

export type Channel = {
  __typename?: 'Channel',
  id: Scalars['ID'],
  name: Scalars['String'],
  public: Scalars['Boolean'],
  dmChannel?: Maybe<Scalars['Boolean']>,
  members: Array<ChannelMember>,
  messages: Array<Message>,
};

export type ChannelMember = {
  __typename?: 'ChannelMember',
  userId: Scalars['String'],
  channelId: Scalars['String'],
  user: User,
  channel: Channel,
};

export type CreateChannelInput = {
  name: Scalars['String'],
  isPublic: Scalars['Boolean'],
  teamId: Scalars['String'],
  members?: Maybe<Array<Scalars['String']>>,
};

export type CreateChannelOutput = Error | Channel;

export type CreateMessageInput = {
  text?: Maybe<Scalars['String']>,
  channelId: Scalars['String'],
};

export type CreateTeamOutput = Error | Team;


export type Error = {
  __typename?: 'Error',
  path?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
};

export type Message = {
  __typename?: 'Message',
  id: Scalars['ID'],
  text?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
  channel?: Maybe<Channel>,
  user?: Maybe<User>,
  time?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  createChannel: Array<CreateChannelOutput>,
  getOrCreateDMChannel: Array<CreateChannelOutput>,
  createMessage: Scalars['Boolean'],
  addTeamMember?: Maybe<Error>,
  createTeam?: Maybe<Array<CreateTeamOutput>>,
  changePassword?: Maybe<User>,
  confirmUser: Scalars['Boolean'],
  forgotPassword: Scalars['Boolean'],
  login?: Maybe<Array<Error>>,
  logout: Scalars['Boolean'],
  register?: Maybe<Array<Error>>,
};


export type MutationCreateChannelArgs = {
  data: CreateChannelInput
};


export type MutationGetOrCreateDmChannelArgs = {
  member: Scalars['String'],
  teamId: Scalars['String']
};


export type MutationCreateMessageArgs = {
  file?: Maybe<Scalars['Upload']>,
  data: CreateMessageInput
};


export type MutationAddTeamMemberArgs = {
  teamId: Scalars['String'],
  email: Scalars['String']
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  usernameOrEmail: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};

export type PasswordInput = {
  password: Scalars['String'],
};

export type Query = {
  __typename?: 'Query',
  allMessages: Array<Message>,
  teams?: Maybe<Array<TeamMember>>,
  getAllTeamMembers: Array<User>,
  getUserById?: Maybe<User>,
  me?: Maybe<User>,
  hello: Scalars['String'],
};


export type QueryAllMessagesArgs = {
  offset: Scalars['Float'],
  channelId: Scalars['String']
};


export type QueryGetAllTeamMembersArgs = {
  teamId: Scalars['String']
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String']
};

export type RegisterInput = {
  password: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
};

export type Subscription = {
  __typename?: 'Subscription',
  newMessage: Message,
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['String']
};

export type Team = {
  __typename?: 'Team',
  id: Scalars['ID'],
  name: Scalars['String'],
  members: Array<TeamMember>,
  channels: Array<Channel>,
};

export type TeamMember = {
  __typename?: 'TeamMember',
  isOwner: Scalars['Boolean'],
  userId: Scalars['String'],
  teamId: Scalars['String'],
  user: User,
  team: Team,
};


export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  username: Scalars['String'],
};
export type CreateChannelMutationMutationVariables = {
  name: Scalars['String'],
  isPublic: Scalars['Boolean'],
  teamId: Scalars['String'],
  members?: Maybe<Array<Scalars['String']>>
};


export type CreateChannelMutationMutation = (
  { __typename?: 'Mutation' }
  & { createChannel: Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  ) | (
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'dmChannel'>
  )> }
);

export type GetOrCreateDmChannelMutationMutationVariables = {
  teamId: Scalars['String'],
  member: Scalars['String']
};


export type GetOrCreateDmChannelMutationMutation = (
  { __typename?: 'Mutation' }
  & { getOrCreateDMChannel: Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  ) | (
    { __typename?: 'Channel' }
    & Pick<Channel, 'id' | 'name' | 'dmChannel'>
  )> }
);

export type CreateMessageMutationMutationVariables = {
  text?: Maybe<Scalars['String']>,
  channelId: Scalars['String'],
  file?: Maybe<Scalars['Upload']>
};


export type CreateMessageMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMessage'>
);

export type AllMessagesQueryQueryVariables = {
  channelId: Scalars['String'],
  offset: Scalars['Float']
};


export type AllMessagesQueryQuery = (
  { __typename?: 'Query' }
  & { allMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'time' | 'url' | 'type' | 'originalName'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )> }
);

export type NewMessageSubscriptionSubscriptionVariables = {
  channelId: Scalars['String']
};


export type NewMessageSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'time' | 'url' | 'type' | 'originalName'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) }
);

export type AddTeamMemberMutatioMutationVariables = {
  teamId: Scalars['String'],
  email: Scalars['String']
};


export type AddTeamMemberMutatioMutation = (
  { __typename?: 'Mutation' }
  & { addTeamMember: Maybe<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  )> }
);

export type CreateTeamMutationMutationVariables = {
  name: Scalars['String']
};


export type CreateTeamMutationMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: Maybe<Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  ) | (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  )>> }
);

export type TeamsQueryQueryVariables = {};


export type TeamsQueryQuery = (
  { __typename?: 'Query' }
  & { teams: Maybe<Array<(
    { __typename?: 'TeamMember' }
    & Pick<TeamMember, 'isOwner'>
    & { team: (
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
      & { channels: Array<(
        { __typename?: 'Channel' }
        & Pick<Channel, 'id' | 'name' | 'dmChannel'>
      )> }
    ) }
  )>> }
);

export type GetAllTeamMembersQueryQueryVariables = {
  teamId: Scalars['String']
};


export type GetAllTeamMembersQueryQuery = (
  { __typename?: 'Query' }
  & { getAllTeamMembers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'id'>
  )> }
);

export type LoginMutationMutationVariables = {
  usernameOrEmail: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutationMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  )>> }
);

export type RegisterMutationMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String']
};


export type RegisterMutationMutation = (
  { __typename?: 'Mutation' }
  & { register: Maybe<Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  )>> }
);

export type GetUserByIdQueryQueryVariables = {
  userId: Scalars['String']
};


export type GetUserByIdQueryQuery = (
  { __typename?: 'Query' }
  & { getUserById: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  )> }
);

export type MeQueryQueryVariables = {};


export type MeQueryQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username'>
  )> }
);

export const CreateChannelMutationDocument = gql`
    mutation CreateChannelMutation($name: String!, $isPublic: Boolean!, $teamId: String!, $members: [String!]) {
  createChannel(data: {name: $name, isPublic: $isPublic, teamId: $teamId, members: $members}) {
    ... on Error {
      path
      message
    }
    ... on Channel {
      id
      name
      dmChannel
    }
  }
}
    `;
export type CreateChannelMutationMutationFn = ApolloReactCommon.MutationFunction<CreateChannelMutationMutation, CreateChannelMutationMutationVariables>;
export type CreateChannelMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateChannelMutationMutation, CreateChannelMutationMutationVariables>, 'mutation'>;

    export const CreateChannelMutationComponent = (props: CreateChannelMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateChannelMutationMutation, CreateChannelMutationMutationVariables> mutation={CreateChannelMutationDocument} {...props} />
    );
    
export type CreateChannelMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateChannelMutationMutation, CreateChannelMutationMutationVariables> & TChildProps;
export function withCreateChannelMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateChannelMutationMutation,
  CreateChannelMutationMutationVariables,
  CreateChannelMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateChannelMutationMutation, CreateChannelMutationMutationVariables, CreateChannelMutationProps<TChildProps>>(CreateChannelMutationDocument, {
      alias: 'withCreateChannelMutation',
      ...operationOptions
    });
};
export type CreateChannelMutationMutationResult = ApolloReactCommon.MutationResult<CreateChannelMutationMutation>;
export type CreateChannelMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateChannelMutationMutation, CreateChannelMutationMutationVariables>;
export const GetOrCreateDmChannelMutationDocument = gql`
    mutation GetOrCreateDMChannelMutation($teamId: String!, $member: String!) {
  getOrCreateDMChannel(teamId: $teamId, member: $member) {
    ... on Error {
      path
      message
    }
    ... on Channel {
      id
      name
      dmChannel
    }
  }
}
    `;
export type GetOrCreateDmChannelMutationMutationFn = ApolloReactCommon.MutationFunction<GetOrCreateDmChannelMutationMutation, GetOrCreateDmChannelMutationMutationVariables>;
export type GetOrCreateDmChannelMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<GetOrCreateDmChannelMutationMutation, GetOrCreateDmChannelMutationMutationVariables>, 'mutation'>;

    export const GetOrCreateDmChannelMutationComponent = (props: GetOrCreateDmChannelMutationComponentProps) => (
      <ApolloReactComponents.Mutation<GetOrCreateDmChannelMutationMutation, GetOrCreateDmChannelMutationMutationVariables> mutation={GetOrCreateDmChannelMutationDocument} {...props} />
    );
    
export type GetOrCreateDmChannelMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<GetOrCreateDmChannelMutationMutation, GetOrCreateDmChannelMutationMutationVariables> & TChildProps;
export function withGetOrCreateDmChannelMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetOrCreateDmChannelMutationMutation,
  GetOrCreateDmChannelMutationMutationVariables,
  GetOrCreateDmChannelMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, GetOrCreateDmChannelMutationMutation, GetOrCreateDmChannelMutationMutationVariables, GetOrCreateDmChannelMutationProps<TChildProps>>(GetOrCreateDmChannelMutationDocument, {
      alias: 'withGetOrCreateDmChannelMutation',
      ...operationOptions
    });
};
export type GetOrCreateDmChannelMutationMutationResult = ApolloReactCommon.MutationResult<GetOrCreateDmChannelMutationMutation>;
export type GetOrCreateDmChannelMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<GetOrCreateDmChannelMutationMutation, GetOrCreateDmChannelMutationMutationVariables>;
export const CreateMessageMutationDocument = gql`
    mutation CreateMessageMutation($text: String, $channelId: String!, $file: Upload) {
  createMessage(data: {text: $text, channelId: $channelId}, file: $file)
}
    `;
export type CreateMessageMutationMutationFn = ApolloReactCommon.MutationFunction<CreateMessageMutationMutation, CreateMessageMutationMutationVariables>;
export type CreateMessageMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateMessageMutationMutation, CreateMessageMutationMutationVariables>, 'mutation'>;

    export const CreateMessageMutationComponent = (props: CreateMessageMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateMessageMutationMutation, CreateMessageMutationMutationVariables> mutation={CreateMessageMutationDocument} {...props} />
    );
    
export type CreateMessageMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateMessageMutationMutation, CreateMessageMutationMutationVariables> & TChildProps;
export function withCreateMessageMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateMessageMutationMutation,
  CreateMessageMutationMutationVariables,
  CreateMessageMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateMessageMutationMutation, CreateMessageMutationMutationVariables, CreateMessageMutationProps<TChildProps>>(CreateMessageMutationDocument, {
      alias: 'withCreateMessageMutation',
      ...operationOptions
    });
};
export type CreateMessageMutationMutationResult = ApolloReactCommon.MutationResult<CreateMessageMutationMutation>;
export type CreateMessageMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessageMutationMutation, CreateMessageMutationMutationVariables>;
export const AllMessagesQueryDocument = gql`
    query AllMessagesQuery($channelId: String!, $offset: Float!) {
  allMessages(channelId: $channelId, offset: $offset) {
    id
    text
    time
    url
    type
    originalName
    user {
      username
    }
  }
}
    `;
export type AllMessagesQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllMessagesQueryQuery, AllMessagesQueryQueryVariables>, 'query'> & ({ variables: AllMessagesQueryQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AllMessagesQueryComponent = (props: AllMessagesQueryComponentProps) => (
      <ApolloReactComponents.Query<AllMessagesQueryQuery, AllMessagesQueryQueryVariables> query={AllMessagesQueryDocument} {...props} />
    );
    
export type AllMessagesQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<AllMessagesQueryQuery, AllMessagesQueryQueryVariables> & TChildProps;
export function withAllMessagesQuery<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllMessagesQueryQuery,
  AllMessagesQueryQueryVariables,
  AllMessagesQueryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AllMessagesQueryQuery, AllMessagesQueryQueryVariables, AllMessagesQueryProps<TChildProps>>(AllMessagesQueryDocument, {
      alias: 'withAllMessagesQuery',
      ...operationOptions
    });
};
export type AllMessagesQueryQueryResult = ApolloReactCommon.QueryResult<AllMessagesQueryQuery, AllMessagesQueryQueryVariables>;
export const NewMessageSubscriptionDocument = gql`
    subscription NewMessageSubscription($channelId: String!) {
  newMessage(channelId: $channelId) {
    id
    text
    time
    url
    type
    originalName
    user {
      username
    }
  }
}
    `;
export type NewMessageSubscriptionComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>, 'subscription'>;

    export const NewMessageSubscriptionComponent = (props: NewMessageSubscriptionComponentProps) => (
      <ApolloReactComponents.Subscription<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables> subscription={NewMessageSubscriptionDocument} {...props} />
    );
    
export type NewMessageSubscriptionProps<TChildProps = {}> = ApolloReactHoc.DataProps<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables> & TChildProps;
export function withNewMessageSubscription<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NewMessageSubscriptionSubscription,
  NewMessageSubscriptionSubscriptionVariables,
  NewMessageSubscriptionProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables, NewMessageSubscriptionProps<TChildProps>>(NewMessageSubscriptionDocument, {
      alias: 'withNewMessageSubscription',
      ...operationOptions
    });
};
export type NewMessageSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewMessageSubscriptionSubscription>;
export const AddTeamMemberMutatioDocument = gql`
    mutation AddTeamMemberMutatio($teamId: String!, $email: String!) {
  addTeamMember(teamId: $teamId, email: $email) {
    path
    message
  }
}
    `;
export type AddTeamMemberMutatioMutationFn = ApolloReactCommon.MutationFunction<AddTeamMemberMutatioMutation, AddTeamMemberMutatioMutationVariables>;
export type AddTeamMemberMutatioComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddTeamMemberMutatioMutation, AddTeamMemberMutatioMutationVariables>, 'mutation'>;

    export const AddTeamMemberMutatioComponent = (props: AddTeamMemberMutatioComponentProps) => (
      <ApolloReactComponents.Mutation<AddTeamMemberMutatioMutation, AddTeamMemberMutatioMutationVariables> mutation={AddTeamMemberMutatioDocument} {...props} />
    );
    
export type AddTeamMemberMutatioProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddTeamMemberMutatioMutation, AddTeamMemberMutatioMutationVariables> & TChildProps;
export function withAddTeamMemberMutatio<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddTeamMemberMutatioMutation,
  AddTeamMemberMutatioMutationVariables,
  AddTeamMemberMutatioProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddTeamMemberMutatioMutation, AddTeamMemberMutatioMutationVariables, AddTeamMemberMutatioProps<TChildProps>>(AddTeamMemberMutatioDocument, {
      alias: 'withAddTeamMemberMutatio',
      ...operationOptions
    });
};
export type AddTeamMemberMutatioMutationResult = ApolloReactCommon.MutationResult<AddTeamMemberMutatioMutation>;
export type AddTeamMemberMutatioMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTeamMemberMutatioMutation, AddTeamMemberMutatioMutationVariables>;
export const CreateTeamMutationDocument = gql`
    mutation CreateTeamMutation($name: String!) {
  createTeam(name: $name) {
    ... on Error {
      path
      message
    }
    ... on Team {
      id
      name
    }
  }
}
    `;
export type CreateTeamMutationMutationFn = ApolloReactCommon.MutationFunction<CreateTeamMutationMutation, CreateTeamMutationMutationVariables>;
export type CreateTeamMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateTeamMutationMutation, CreateTeamMutationMutationVariables>, 'mutation'>;

    export const CreateTeamMutationComponent = (props: CreateTeamMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateTeamMutationMutation, CreateTeamMutationMutationVariables> mutation={CreateTeamMutationDocument} {...props} />
    );
    
export type CreateTeamMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateTeamMutationMutation, CreateTeamMutationMutationVariables> & TChildProps;
export function withCreateTeamMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateTeamMutationMutation,
  CreateTeamMutationMutationVariables,
  CreateTeamMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateTeamMutationMutation, CreateTeamMutationMutationVariables, CreateTeamMutationProps<TChildProps>>(CreateTeamMutationDocument, {
      alias: 'withCreateTeamMutation',
      ...operationOptions
    });
};
export type CreateTeamMutationMutationResult = ApolloReactCommon.MutationResult<CreateTeamMutationMutation>;
export type CreateTeamMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTeamMutationMutation, CreateTeamMutationMutationVariables>;
export const TeamsQueryDocument = gql`
    query TeamsQuery {
  teams {
    isOwner
    team {
      id
      name
      channels {
        id
        name
        dmChannel
      }
    }
  }
}
    `;
export type TeamsQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TeamsQueryQuery, TeamsQueryQueryVariables>, 'query'>;

    export const TeamsQueryComponent = (props: TeamsQueryComponentProps) => (
      <ApolloReactComponents.Query<TeamsQueryQuery, TeamsQueryQueryVariables> query={TeamsQueryDocument} {...props} />
    );
    
export type TeamsQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<TeamsQueryQuery, TeamsQueryQueryVariables> & TChildProps;
export function withTeamsQuery<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  TeamsQueryQuery,
  TeamsQueryQueryVariables,
  TeamsQueryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, TeamsQueryQuery, TeamsQueryQueryVariables, TeamsQueryProps<TChildProps>>(TeamsQueryDocument, {
      alias: 'withTeamsQuery',
      ...operationOptions
    });
};
export type TeamsQueryQueryResult = ApolloReactCommon.QueryResult<TeamsQueryQuery, TeamsQueryQueryVariables>;
export const GetAllTeamMembersQueryDocument = gql`
    query GetAllTeamMembersQuery($teamId: String!) {
  getAllTeamMembers(teamId: $teamId) {
    username
    email
    id
  }
}
    `;
export type GetAllTeamMembersQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllTeamMembersQueryQuery, GetAllTeamMembersQueryQueryVariables>, 'query'> & ({ variables: GetAllTeamMembersQueryQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAllTeamMembersQueryComponent = (props: GetAllTeamMembersQueryComponentProps) => (
      <ApolloReactComponents.Query<GetAllTeamMembersQueryQuery, GetAllTeamMembersQueryQueryVariables> query={GetAllTeamMembersQueryDocument} {...props} />
    );
    
export type GetAllTeamMembersQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetAllTeamMembersQueryQuery, GetAllTeamMembersQueryQueryVariables> & TChildProps;
export function withGetAllTeamMembersQuery<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllTeamMembersQueryQuery,
  GetAllTeamMembersQueryQueryVariables,
  GetAllTeamMembersQueryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllTeamMembersQueryQuery, GetAllTeamMembersQueryQueryVariables, GetAllTeamMembersQueryProps<TChildProps>>(GetAllTeamMembersQueryDocument, {
      alias: 'withGetAllTeamMembersQuery',
      ...operationOptions
    });
};
export type GetAllTeamMembersQueryQueryResult = ApolloReactCommon.QueryResult<GetAllTeamMembersQueryQuery, GetAllTeamMembersQueryQueryVariables>;
export const LoginMutationDocument = gql`
    mutation LoginMutation($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    path
    message
  }
}
    `;
export type LoginMutationMutationFn = ApolloReactCommon.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;
export type LoginMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutationMutation, LoginMutationMutationVariables>, 'mutation'>;

    export const LoginMutationComponent = (props: LoginMutationComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutationMutation, LoginMutationMutationVariables> mutation={LoginMutationDocument} {...props} />
    );
    
export type LoginMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutationMutation, LoginMutationMutationVariables> & TChildProps;
export function withLoginMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutationMutation,
  LoginMutationMutationVariables,
  LoginMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutationMutation, LoginMutationMutationVariables, LoginMutationProps<TChildProps>>(LoginMutationDocument, {
      alias: 'withLoginMutation',
      ...operationOptions
    });
};
export type LoginMutationMutationResult = ApolloReactCommon.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;
export const RegisterMutationDocument = gql`
    mutation RegisterMutation($email: String!, $password: String!, $username: String!) {
  register(data: {email: $email, password: $password, username: $username}) {
    path
    message
  }
}
    `;
export type RegisterMutationMutationFn = ApolloReactCommon.MutationFunction<RegisterMutationMutation, RegisterMutationMutationVariables>;
export type RegisterMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutationMutation, RegisterMutationMutationVariables>, 'mutation'>;

    export const RegisterMutationComponent = (props: RegisterMutationComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutationMutation, RegisterMutationMutationVariables> mutation={RegisterMutationDocument} {...props} />
    );
    
export type RegisterMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutationMutation, RegisterMutationMutationVariables> & TChildProps;
export function withRegisterMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutationMutation,
  RegisterMutationMutationVariables,
  RegisterMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutationMutation, RegisterMutationMutationVariables, RegisterMutationProps<TChildProps>>(RegisterMutationDocument, {
      alias: 'withRegisterMutation',
      ...operationOptions
    });
};
export type RegisterMutationMutationResult = ApolloReactCommon.MutationResult<RegisterMutationMutation>;
export type RegisterMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const GetUserByIdQueryDocument = gql`
    query GetUserByIdQuery($userId: String!) {
  getUserById(userId: $userId) {
    id
    email
    username
  }
}
    `;
export type GetUserByIdQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserByIdQueryQuery, GetUserByIdQueryQueryVariables>, 'query'> & ({ variables: GetUserByIdQueryQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetUserByIdQueryComponent = (props: GetUserByIdQueryComponentProps) => (
      <ApolloReactComponents.Query<GetUserByIdQueryQuery, GetUserByIdQueryQueryVariables> query={GetUserByIdQueryDocument} {...props} />
    );
    
export type GetUserByIdQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetUserByIdQueryQuery, GetUserByIdQueryQueryVariables> & TChildProps;
export function withGetUserByIdQuery<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserByIdQueryQuery,
  GetUserByIdQueryQueryVariables,
  GetUserByIdQueryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserByIdQueryQuery, GetUserByIdQueryQueryVariables, GetUserByIdQueryProps<TChildProps>>(GetUserByIdQueryDocument, {
      alias: 'withGetUserByIdQuery',
      ...operationOptions
    });
};
export type GetUserByIdQueryQueryResult = ApolloReactCommon.QueryResult<GetUserByIdQueryQuery, GetUserByIdQueryQueryVariables>;
export const MeQueryDocument = gql`
    query MeQuery {
  me {
    id
    email
    username
  }
}
    `;
export type MeQueryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQueryQuery, MeQueryQueryVariables>, 'query'>;

    export const MeQueryComponent = (props: MeQueryComponentProps) => (
      <ApolloReactComponents.Query<MeQueryQuery, MeQueryQueryVariables> query={MeQueryDocument} {...props} />
    );
    
export type MeQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQueryQuery, MeQueryQueryVariables> & TChildProps;
export function withMeQuery<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQueryQuery,
  MeQueryQueryVariables,
  MeQueryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQueryQuery, MeQueryQueryVariables, MeQueryProps<TChildProps>>(MeQueryDocument, {
      alias: 'withMeQuery',
      ...operationOptions
    });
};
export type MeQueryQueryResult = ApolloReactCommon.QueryResult<MeQueryQuery, MeQueryQueryVariables>;
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }

      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "CreateChannelOutput",
        "possibleTypes": [
          {
            "name": "Error"
          },
          {
            "name": "Channel"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "CreateTeamOutput",
        "possibleTypes": [
          {
            "name": "Error"
          },
          {
            "name": "Team"
          }
        ]
      }
    ]
  }
};

      export default result;
    