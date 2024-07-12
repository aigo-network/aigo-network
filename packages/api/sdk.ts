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

export type Device = {
  __typename?: 'Device';
  appVersion?: Maybe<Scalars['String']['output']>;
  brand?: Maybe<Scalars['String']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deviceId?: Maybe<Scalars['String']['output']>;
  deviceName?: Maybe<Scalars['String']['output']>;
  deviceType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  notificationToken?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  systemVersion?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userIdentifier?: Maybe<Scalars['String']['output']>;
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

export type RegisterDeviceInput = {
  appVersion?: InputMaybe<Scalars['String']['input']>;
  brand?: InputMaybe<Scalars['String']['input']>;
  carrier?: InputMaybe<Scalars['String']['input']>;
  deviceId: Scalars['String']['input'];
  deviceName?: InputMaybe<Scalars['String']['input']>;
  deviceType?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  notificationToken?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  systemVersion?: InputMaybe<Scalars['String']['input']>;
};

export type RootMutation = {
  __typename?: 'RootMutation';
  checkIn?: Maybe<DailyCheckIn>;
  completeOnboarding?: Maybe<User>;
  deleteUser?: Maybe<User>;
  inputInvitationCode?: Maybe<Invitation>;
  registerDevice?: Maybe<Device>;
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
  web3FarmingInitProfile?: Maybe<Web3FarmingProfile>;
  web3FarmingRefreshReferrals?: Maybe<Array<Maybe<Web3FarmingReferralCode>>>;
  web3FarmingVerifyQuestAndClaimPoints?: Maybe<Web3FarmingQuest>;
};


export type RootMutationInputInvitationCodeArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationRegisterDeviceArgs = {
  input: RegisterDeviceInput;
};


export type RootMutationUpdateProfileArgs = {
  profile?: InputMaybe<UserProfile>;
};


export type RootMutationVerifyNyamNyamUserArgs = {
  NNID?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationWeb3FarmingInitProfileArgs = {
  referralCode?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationWeb3FarmingVerifyQuestAndClaimPointsArgs = {
  questId?: InputMaybe<Scalars['String']['input']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  ping?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  web3FarmingProfile?: Maybe<Web3FarmingProfile>;
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

export type Web3FarmingProfile = {
  __typename?: 'Web3FarmingProfile';
  countSuccessReferrals?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invitedBy?: Maybe<Scalars['String']['output']>;
  quests?: Maybe<Array<Maybe<Web3FarmingQuest>>>;
  referralCodes?: Maybe<Array<Maybe<Web3FarmingReferralCode>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Web3FarmingQuest = {
  __typename?: 'Web3FarmingQuest';
  GOPoints?: Maybe<Scalars['Int']['output']>;
  URL?: Maybe<Scalars['String']['output']>;
  androidDownloadLink?: Maybe<Scalars['String']['output']>;
  appleDownloadLink?: Maybe<Scalars['String']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Web3FarmingQuestType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum Web3FarmingQuestType {
  DownloadApp = 'DownloadApp',
  FollowTwitter = 'FollowTwitter',
  JoinDiscord = 'JoinDiscord',
  JoinTelegram = 'JoinTelegram',
  LikeTwitterPost = 'LikeTwitterPost',
  RetweetTwitterPost = 'RetweetTwitterPost'
}

export type Web3FarmingReferralCode = {
  __typename?: 'Web3FarmingReferralCode';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  invitedDate?: Maybe<Scalars['DateTime']['output']>;
  invitedGOPoints?: Maybe<Scalars['Int']['output']>;
  invitedId?: Maybe<Scalars['String']['output']>;
  referrerGOPoints?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CheckInMutationVariables = Exact<{ [key: string]: never; }>;


export type CheckInMutation = { __typename?: 'RootMutation', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'RootMutation', completeOnboarding?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, phoneNumber?: string | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null } | null } | null };

export type RegisterDeviceMutationVariables = Exact<{
  input: RegisterDeviceInput;
}>;


export type RegisterDeviceMutation = { __typename?: 'RootMutation', registerDevice?: { __typename?: 'Device', id?: string | null, deviceId?: string | null, brand?: string | null, platform?: string | null, carrier?: string | null, deviceName?: string | null, deviceType?: string | null, appVersion?: string | null, systemVersion?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type InputInvitationCodeMutationVariables = Exact<{
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type InputInvitationCodeMutation = { __typename?: 'RootMutation', inputInvitationCode?: { __typename?: 'Invitation', invitedBy?: string | null, invitedId?: string | null } | null };

export type Web3FarmingInitProfileMutationVariables = Exact<{
  referralCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type Web3FarmingInitProfileMutation = { __typename?: 'RootMutation', web3FarmingInitProfile?: { __typename?: 'Web3FarmingProfile', id?: string | null, createdAt?: any | null, invitedBy?: string | null, quests?: Array<{ __typename?: 'Web3FarmingQuest', id?: string | null, type?: Web3FarmingQuestType | null, title?: string | null, description?: string | null, URL?: string | null, androidDownloadLink?: string | null, appleDownloadLink?: string | null, GOPoints?: number | null, completed?: boolean | null } | null> | null, referralCodes?: Array<{ __typename?: 'Web3FarmingReferralCode', id?: string | null, code?: string | null, invitedId?: string | null, invitedDate?: any | null, invitedGOPoints?: number | null, referrerGOPoints?: number | null } | null> | null } | null };

export type Web3FarmingVerifyQuestAndClaimPointsMutationVariables = Exact<{
  questId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Web3FarmingVerifyQuestAndClaimPointsMutation = { __typename?: 'RootMutation', web3FarmingVerifyQuestAndClaimPoints?: { __typename?: 'Web3FarmingQuest', id?: string | null, type?: Web3FarmingQuestType | null, title?: string | null, description?: string | null, URL?: string | null, androidDownloadLink?: string | null, appleDownloadLink?: string | null, GOPoints?: number | null, completed?: boolean | null } | null };

export type Web3FarmingRefreshReferralsMutationVariables = Exact<{ [key: string]: never; }>;


export type Web3FarmingRefreshReferralsMutation = { __typename?: 'RootMutation', web3FarmingRefreshReferrals?: Array<{ __typename?: 'Web3FarmingReferralCode', id?: string | null, code?: string | null, invitedDate?: any | null, invitedId?: string | null, invitedGOPoints?: number | null, referrerGOPoints?: number | null, createdAt?: any | null, updatedAt?: any | null } | null> | null };

export type UpdateProfileMutationVariables = Exact<{
  profile?: InputMaybe<UserProfile>;
}>;


export type UpdateProfileMutation = { __typename?: 'RootMutation', updateProfile?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, descriptions?: Array<UserDescription | null> | null, city?: string | null, imageUrl?: string | null, phoneNumber?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'RootMutation', deleteUser?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, imageUrl?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null, invitationCode?: string | null, createdAt?: any | null, updatedAt?: any | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null } | null } | null };

export type VerifyPhoneNumberMutationVariables = Exact<{ [key: string]: never; }>;


export type VerifyPhoneNumberMutation = { __typename?: 'RootMutation', verifyPhoneNumber?: PhoneNumberVerification | null };

export type VerifyNyamNyamUserMutationVariables = Exact<{
  nnid?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyNyamNyamUserMutation = { __typename?: 'RootMutation', verifyNyamNyamUser?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null };

export type GetUserGoPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGoPointsQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', GOPoints?: number | null } | null };

export type GetUserWithWeb3FarmingProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserWithWeb3FarmingProfileQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, city?: string | null, descriptions?: Array<UserDescription | null> | null, GOPoints?: number | null } | null, web3FarmingProfile?: { __typename?: 'Web3FarmingProfile', id?: string | null, createdAt?: any | null, invitedBy?: string | null, countSuccessReferrals?: number | null, quests?: Array<{ __typename?: 'Web3FarmingQuest', id?: string | null, title?: string | null, description?: string | null, GOPoints?: number | null, type?: Web3FarmingQuestType | null, URL?: string | null, androidDownloadLink?: string | null, appleDownloadLink?: string | null, completed?: boolean | null, createdAt?: any | null } | null> | null, referralCodes?: Array<{ __typename?: 'Web3FarmingReferralCode', id?: string | null, code?: string | null, invitedId?: string | null, invitedDate?: any | null, invitedGOPoints?: number | null, referrerGOPoints?: number | null } | null> | null } | null };

export type GetWeb3FarmingProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeb3FarmingProfileQuery = { __typename?: 'RootQuery', web3FarmingProfile?: { __typename?: 'Web3FarmingProfile', id?: string | null, createdAt?: any | null, invitedBy?: string | null, countSuccessReferrals?: number | null, quests?: Array<{ __typename?: 'Web3FarmingQuest', id?: string | null, title?: string | null, description?: string | null, GOPoints?: number | null, type?: Web3FarmingQuestType | null, URL?: string | null, androidDownloadLink?: string | null, appleDownloadLink?: string | null, completed?: boolean | null, createdAt?: any | null } | null> | null, referralCodes?: Array<{ __typename?: 'Web3FarmingReferralCode', id?: string | null, code?: string | null, invitedId?: string | null, invitedDate?: any | null, invitedGOPoints?: number | null, referrerGOPoints?: number | null } | null> | null } | null };

export type GetUserWitDailyMissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserWitDailyMissionsQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, city?: string | null, imageUrl?: string | null, descriptions?: Array<UserDescription | null> | null, invitationCode?: string | null, GOPoints?: number | null, completeOnboarding?: boolean | null, phoneNumber?: string | null, phoneNumberVerified?: boolean | null, phoneNumberVerifiedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, NyamNyamUserProfile?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null, dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null, latest7DaysCheckIn?: Array<{ __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null> | null } | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'RootQuery', user?: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, city?: string | null, imageUrl?: string | null, descriptions?: Array<UserDescription | null> | null, invitationCode?: string | null, GOPoints?: number | null, completeOnboarding?: boolean | null, phoneNumber?: string | null, phoneNumberVerified?: boolean | null, phoneNumberVerifiedAt?: any | null, createdAt?: any | null, updatedAt?: any | null, NyamNyamUserProfile?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null } | null };

export type ProfilePartFragment = { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null, city?: string | null, imageUrl?: string | null, descriptions?: Array<UserDescription | null> | null, invitationCode?: string | null, GOPoints?: number | null, completeOnboarding?: boolean | null, phoneNumber?: string | null, phoneNumberVerified?: boolean | null, phoneNumberVerifiedAt?: any | null, createdAt?: any | null, updatedAt?: any | null };

export type NyamNyamProfilePartFragment = { __typename?: 'User', NyamNyamUserProfile?: { __typename?: 'NyamNyamUserProfile', NNID?: string | null, createdAt?: any | null, extKey?: string | null, id?: string | null, name?: string | null, nick?: string | null, registrationNumber?: string | null, updatedAt?: any | null, verifiedAt?: any | null } | null };

export type DailyMissionPartFragment = { __typename?: 'User', dailyMissions?: { __typename?: 'DailyMissions', checkIn?: { __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null, latest7DaysCheckIn?: Array<{ __typename?: 'DailyCheckIn', date?: any | null, completed?: boolean | null } | null> | null } | null };

export const ProfilePartFragmentDoc = gql`
    fragment ProfilePart on User {
  id
  name
  email
  city
  imageUrl
  descriptions
  invitationCode
  GOPoints
  completeOnboarding
  phoneNumber
  phoneNumberVerified
  phoneNumberVerifiedAt
  createdAt
  updatedAt
}
    `;
export const NyamNyamProfilePartFragmentDoc = gql`
    fragment NyamNyamProfilePart on User {
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
}
    `;
export const DailyMissionPartFragmentDoc = gql`
    fragment DailyMissionPart on User {
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
export const RegisterDeviceDocument = gql`
    mutation registerDevice($input: RegisterDeviceInput!) {
  registerDevice(input: $input) {
    id
    deviceId
    brand
    platform
    carrier
    deviceName
    deviceType
    appVersion
    systemVersion
    createdAt
    updatedAt
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
export const Web3FarmingInitProfileDocument = gql`
    mutation web3FarmingInitProfile($referralCode: String) {
  web3FarmingInitProfile(referralCode: $referralCode) {
    id
    createdAt
    invitedBy
    quests {
      id
      type
      title
      description
      URL
      androidDownloadLink
      appleDownloadLink
      GOPoints
      completed
    }
    referralCodes {
      id
      code
      invitedId
      invitedDate
      invitedGOPoints
      referrerGOPoints
    }
  }
}
    `;
export const Web3FarmingVerifyQuestAndClaimPointsDocument = gql`
    mutation web3FarmingVerifyQuestAndClaimPoints($questId: String) {
  web3FarmingVerifyQuestAndClaimPoints(questId: $questId) {
    id
    type
    title
    description
    URL
    androidDownloadLink
    appleDownloadLink
    GOPoints
    completed
  }
}
    `;
export const Web3FarmingRefreshReferralsDocument = gql`
    mutation web3FarmingRefreshReferrals {
  web3FarmingRefreshReferrals {
    id
    code
    invitedDate
    invitedId
    invitedGOPoints
    referrerGOPoints
    createdAt
    updatedAt
  }
}
    `;
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
export const GetUserGoPointsDocument = gql`
    query getUserGOPoints {
  user {
    GOPoints
  }
}
    `;
export const GetUserWithWeb3FarmingProfileDocument = gql`
    query getUserWithWeb3FarmingProfile {
  user {
    id
    name
    email
    city
    descriptions
    GOPoints
  }
  web3FarmingProfile {
    id
    createdAt
    invitedBy
    quests {
      id
      title
      description
      GOPoints
      type
      URL
      androidDownloadLink
      appleDownloadLink
      completed
      createdAt
    }
    countSuccessReferrals
    referralCodes {
      id
      code
      invitedId
      invitedDate
      invitedGOPoints
      referrerGOPoints
    }
  }
}
    `;
export const GetWeb3FarmingProfileDocument = gql`
    query getWeb3FarmingProfile {
  web3FarmingProfile {
    id
    createdAt
    invitedBy
    quests {
      id
      title
      description
      GOPoints
      type
      URL
      androidDownloadLink
      appleDownloadLink
      completed
      createdAt
    }
    countSuccessReferrals
    referralCodes {
      id
      code
      invitedId
      invitedDate
      invitedGOPoints
      referrerGOPoints
    }
  }
}
    `;
export const GetUserWitDailyMissionsDocument = gql`
    query getUserWitDailyMissions {
  user {
    ...ProfilePart
    ...NyamNyamProfilePart
    ...DailyMissionPart
  }
}
    ${ProfilePartFragmentDoc}
${NyamNyamProfilePartFragmentDoc}
${DailyMissionPartFragmentDoc}`;
export const GetUserProfileDocument = gql`
    query getUserProfile {
  user {
    ...ProfilePart
    ...NyamNyamProfilePart
  }
}
    ${ProfilePartFragmentDoc}
${NyamNyamProfilePartFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    checkIn(variables?: CheckInMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CheckInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckInMutation>(CheckInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkIn', 'mutation', variables);
    },
    completeOnboarding(variables?: CompleteOnboardingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CompleteOnboardingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CompleteOnboardingMutation>(CompleteOnboardingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'completeOnboarding', 'mutation', variables);
    },
    registerDevice(variables: RegisterDeviceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RegisterDeviceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterDeviceMutation>(RegisterDeviceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'registerDevice', 'mutation', variables);
    },
    inputInvitationCode(variables?: InputInvitationCodeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<InputInvitationCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InputInvitationCodeMutation>(InputInvitationCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'inputInvitationCode', 'mutation', variables);
    },
    web3FarmingInitProfile(variables?: Web3FarmingInitProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Web3FarmingInitProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Web3FarmingInitProfileMutation>(Web3FarmingInitProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'web3FarmingInitProfile', 'mutation', variables);
    },
    web3FarmingVerifyQuestAndClaimPoints(variables?: Web3FarmingVerifyQuestAndClaimPointsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Web3FarmingVerifyQuestAndClaimPointsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Web3FarmingVerifyQuestAndClaimPointsMutation>(Web3FarmingVerifyQuestAndClaimPointsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'web3FarmingVerifyQuestAndClaimPoints', 'mutation', variables);
    },
    web3FarmingRefreshReferrals(variables?: Web3FarmingRefreshReferralsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Web3FarmingRefreshReferralsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Web3FarmingRefreshReferralsMutation>(Web3FarmingRefreshReferralsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'web3FarmingRefreshReferrals', 'mutation', variables);
    },
    updateProfile(variables?: UpdateProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileMutation>(UpdateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProfile', 'mutation', variables);
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
    getUserGOPoints(variables?: GetUserGoPointsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserGoPointsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserGoPointsQuery>(GetUserGoPointsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserGOPoints', 'query', variables);
    },
    getUserWithWeb3FarmingProfile(variables?: GetUserWithWeb3FarmingProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserWithWeb3FarmingProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserWithWeb3FarmingProfileQuery>(GetUserWithWeb3FarmingProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserWithWeb3FarmingProfile', 'query', variables);
    },
    getWeb3FarmingProfile(variables?: GetWeb3FarmingProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetWeb3FarmingProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWeb3FarmingProfileQuery>(GetWeb3FarmingProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWeb3FarmingProfile', 'query', variables);
    },
    getUserWitDailyMissions(variables?: GetUserWitDailyMissionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserWitDailyMissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserWitDailyMissionsQuery>(GetUserWitDailyMissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserWitDailyMissions', 'query', variables);
    },
    getUserProfile(variables?: GetUserProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserProfileQuery>(GetUserProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserProfile', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;