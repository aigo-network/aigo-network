import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type DailyCheckIn = {
  __typename?: 'DailyCheckIn';
  completed?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
};

export type DailyMissions = {
  __typename?: 'DailyMissions';
  checkIn?: Maybe<DailyCheckIn>;
};

export type Invitation = {
  __typename?: 'Invitation';
  invitedBy?: Maybe<Scalars['String']['output']>;
  invitedId?: Maybe<Scalars['String']['output']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  checkIn?: Maybe<DailyCheckIn>;
  completeOnboarding?: Maybe<User>;
  inputInvitationCode?: Maybe<Invitation>;
  updateProfile?: Maybe<User>;
};


export type RootMutationInputInvitationCodeArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationUpdateProfileArgs = {
  profile?: InputMaybe<UserProfile>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  ping?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  GOPoints?: Maybe<Scalars['Int']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  completeOnboarding?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dailyMissions?: Maybe<DailyMissions>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descriptions?: Maybe<Array<Maybe<UserDescription>>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  invitationCode?: Maybe<Scalars['String']['output']>;
  invitedBy?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum UserDescription {
  CasualUser = 'CasualUser',
  CityExplorer = 'CityExplorer',
  Commuter = 'Commuter',
  FitnessEnthusiast = 'FitnessEnthusiast',
  NyamNyamDriver = 'NyamNyamDriver',
  Traveler = 'Traveler'
}

export type UserProfile = {
  city?: InputMaybe<Scalars['String']['input']>;
  descriptions?: InputMaybe<Array<InputMaybe<UserDescription>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileMutationVariables = Exact<{
  profile?: InputMaybe<UserProfile>;
}>;


export type UpdateProfileMutation = { __typename?: 'RootMutation', updateProfile?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, descriptions?: Array<UserDescription | null> | null, city?: string | null, imageUrl?: string | null } | null };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'RootMutation', completeOnboarding?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null } | null } | null };

export type CheckInMutationVariables = Exact<{ [key: string]: never; }>;


export type CheckInMutation = { __typename?: 'RootMutation', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null } | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null, completeOnboarding?: boolean | null } | null };


export const UpdateProfileDocument = gql`
    mutation updateProfile($profile: UserProfile) {
  updateProfile(profile: $profile) {
    id
    name
    email
    descriptions
    city
    imageUrl
  }
}
    `;
export const CompleteOnboardingDocument = gql`
    mutation completeOnboarding {
  completeOnboarding {
    id
    name
    email
    imageUrl
    city
    descriptions
    GOPoints
    dailyMissions {
      checkIn {
        date
        completed
      }
    }
    invitationCode
    createdAt
    updatedAt
  }
}
    `;
export const CheckInDocument = gql`
    mutation checkIn {
  checkIn {
    date
    completed
  }
}
    `;
export const GetUserDocument = gql`
    query getUser {
  user {
    id
    name
    email
    imageUrl
    city
    descriptions
    GOPoints
    dailyMissions {
      checkIn {
        date
        completed
      }
    }
    invitationCode
    createdAt
    updatedAt
  }
}
    `;
export const GetUserProfileDocument = gql`
    query getUserProfile {
  user {
    id
    name
    email
    city
    descriptions
    GOPoints
    completeOnboarding
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    updateProfile(variables?: UpdateProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileMutation>(UpdateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProfile', 'mutation', variables);
    },
    completeOnboarding(variables?: CompleteOnboardingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CompleteOnboardingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CompleteOnboardingMutation>(CompleteOnboardingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'completeOnboarding', 'mutation', variables);
    },
    checkIn(variables?: CheckInMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckInMutation>(CheckInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkIn', 'mutation', variables);
    },
    getUser(variables?: GetUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query', variables);
    },
    getUserProfile(variables?: GetUserProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserProfileQuery>(GetUserProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserProfile', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;