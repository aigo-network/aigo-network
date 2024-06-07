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
  latest7DaysCheckIn?: Maybe<Array<Maybe<DailyCheckIn>>>;
};

export type Invitation = {
  __typename?: 'Invitation';
  invitedBy?: Maybe<Scalars['String']['output']>;
  invitedId?: Maybe<Scalars['String']['output']>;
};

export type NyamNyamUserProfile = {
  __typename?: 'NyamNyamUserProfile';
  NNID?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  extKey?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nick?: Maybe<Scalars['String']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum PhoneNumberVerification {
  /** Signed in by Phone number but mismatch with Phone number from user's profile */
  Mismatch = 'MISMATCH',
  /** Asked for verifying by OTP, continue to verify by SMS OTP */
  OtpSmsVerifying = 'OTP_SMS_VERIFYING',
  /** Correctly verified */
  Verified = 'VERIFIED'
}

export type RootMutation = {
  __typename?: 'RootMutation';
  checkIn?: Maybe<DailyCheckIn>;
  completeOnboarding?: Maybe<User>;
  deleteUser?: Maybe<User>;
  inputInvitationCode?: Maybe<Invitation>;
  updateProfile?: Maybe<User>;
  /**
   * Verify Nyam Nyam Identity by calling NN API, needed NNID and Phone number.
   * 	Phone Number must be added to profile and verified before verify Nyam Nyam user identity
   */
  verifyNyamNyamUser?: Maybe<NyamNyamUserProfile>;
  /**
   * Phone number must be added to user profile.
   * 		If user signed-in by Phone number, it will check if Auth Phone number and Phone number in profile is matched or not.
   * 		Else using OTP SMS to verify new phone number.
   * 		
   */
  verifyPhoneNumber?: Maybe<PhoneNumberVerification>;
};


export type RootMutationInputInvitationCodeArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationUpdateProfileArgs = {
  profile?: InputMaybe<UserProfile>;
};


export type RootMutationVerifyNyamNyamUserArgs = {
  NNID?: InputMaybe<Scalars['String']['input']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  ping?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  GOPoints?: Maybe<Scalars['Int']['output']>;
  NyamNyamUserProfile?: Maybe<NyamNyamUserProfile>;
  city?: Maybe<Scalars['String']['output']>;
  completeOnboarding?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dailyMissions?: Maybe<DailyMissions>;
  descriptions?: Maybe<Array<Maybe<UserDescription>>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  invitationCode?: Maybe<Scalars['String']['output']>;
  invitedBy?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneNumberVerified?: Maybe<Scalars['Boolean']['output']>;
  phoneNumberVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
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


export type UpdateProfileMutation = { __typename?: 'RootMutation', updateProfile?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, descriptions?: Array<UserDescription | null> | null, city?: string | null, imageUrl?: string | null, phoneNumber?: string | null } | null };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'RootMutation', completeOnboarding?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, phoneNumber?: string | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null } | null } | null };

export type CheckInMutationVariables = Exact<{ [key: string]: never; }>;


export type CheckInMutation = { __typename?: 'RootMutation', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null };

export type InputInvitationCodeMutationVariables = Exact<{
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type InputInvitationCodeMutation = { __typename?: 'RootMutation', inputInvitationCode?: { __typename?: 'Invitation', invitedBy?: string | null, invitedId?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'RootMutation', deleteUser?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null } | null } | null };

export type VerifyPhoneNumberMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyPhoneNumberMutation = { __typename?: 'RootMutation', verifyPhoneNumber?: PhoneNumberVerification | null };

export type VerifyNyamNyamUserMutationVariables = Exact<{
  nnid?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyNyamNyamUserMutation = { __typename?: 'RootMutation', verifyNyamNyamUser?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, phoneNumber?: string | null, phoneNumberVerified?: boolean | null, phoneNumberVerifiedAt?: any | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, NyamNyamUserProfile?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null, latest7DaysCheckIn?: Array<{ __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null> | null } | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, phoneNumber?: string | null, phoneNumberVerified?: boolean | null, phoneNumberVerifiedAt?: any | null, GOPoints?: number | null, completeOnboarding?: boolean | null, NyamNyamUserProfile?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null } | null };


export const UpdateProfileDocument = gql`
    mutation updateProfile($profile: UserProfile) {
  updateProfile(profile: $profile) {
    id
    name
    email
    descriptions
    city
    imageUrl
    phoneNumber
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
    phoneNumber
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
export const InputInvitationCodeDocument = gql`
    mutation inputInvitationCode($code: String) {
  inputInvitationCode(code: $code) {
    invitedBy
    invitedId
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation deleteUser {
  deleteUser {
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
export const VerifyPhoneNumberDocument = gql`
    mutation verifyPhoneNumber {
  verifyPhoneNumber
}
    `;
export const VerifyNyamNyamUserDocument = gql`
    mutation verifyNyamNyamUser($nnid: String) {
  verifyNyamNyamUser(NNID: $nnid) {
    NNID
    createdAt
    extKey
    id
    name
    nick
    registrationNumber
    updatedAt
    verifiedAt
  }
}
    `;
export const GetUserDocument = gql`
    query getUser {
  user {
    id
    name
    email
    phoneNumber
    phoneNumberVerified
    phoneNumberVerifiedAt
    imageUrl
    city
    descriptions
    NyamNyamUserProfile {
      NNID
      createdAt
      extKey
      id
      name
      nick
      registrationNumber
      updatedAt
      verifiedAt
    }
    GOPoints
    dailyMissions {
      checkIn {
        date
        completed
      }
      latest7DaysCheckIn {
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
    NyamNyamUserProfile {
      NNID
      createdAt
      extKey
      id
      name
      nick
      registrationNumber
      updatedAt
      verifiedAt
    }
    phoneNumber
    phoneNumberVerified
    phoneNumberVerifiedAt
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
    inputInvitationCode(variables?: InputInvitationCodeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<InputInvitationCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InputInvitationCodeMutation>(InputInvitationCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'inputInvitationCode', 'mutation', variables);
    },
    deleteUser(variables?: DeleteUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser', 'mutation', variables);
    },
    verifyPhoneNumber(variables?: VerifyPhoneNumberMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<VerifyPhoneNumberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyPhoneNumberMutation>(VerifyPhoneNumberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifyPhoneNumber', 'mutation', variables);
    },
    verifyNyamNyamUser(variables?: VerifyNyamNyamUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<VerifyNyamNyamUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyNyamNyamUserMutation>(VerifyNyamNyamUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifyNyamNyamUser', 'mutation', variables);
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