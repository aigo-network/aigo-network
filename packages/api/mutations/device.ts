import { gql } from 'graphql-request';

export const registerDeviceMutation = gql`
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
