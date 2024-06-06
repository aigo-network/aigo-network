import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusTag, { Status } from 'components/StatusTag';
import { appState } from 'state/app';
import { config } from 'utils/config';
import { useSnapshot } from 'valtio';

const PartnerProgram = () => {
	const { navigate } = useNavigation();
	const { content, appUser } = useSnapshot(appState);
	const phoneNumberVerifyStatus = appUser?.phoneNumberVerified
		? Status.Good
		: Status.Warning;
	const nnidVerifyStatus = appUser?.NyamNyamUserProfile?.NNID
		? Status.Good
		: Status.Warning;
	const { partnerSection } = content.screens.profile;
	const partnerImg = require('assets/img/nyam-nyam-partner-img.png');
	const handleVerifyPartner = () => {
		if (!appUser?.phoneNumberVerified) {
			navigate('VerifyPhoneNumber');
		} else if (!appUser.NyamNyamUserProfile?.NNID) {
			navigate('VerifyNNID');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{partnerSection.partner}</Text>
			<TouchableOpacity onPress={handleVerifyPartner}>
				<View style={styles.box}>
					<Image style={styles.partnerImg} source={partnerImg} />
					<View style={styles.boxContent}>
						<Text style={styles.boxTitle}>{partnerSection.partnerName}</Text>
						<Text style={styles.boxDescription}>
							{partnerSection.descriptionPrefix + ' '}
							<Text style={styles.descriptionHighlight}>
								{config.activity.CompleteNyamNyamVerification.points}{' '}
								{partnerSection.reward}
							</Text>{' '}
							{partnerSection.descriptionSuffix}
						</Text>
						<View style={styles.statusGroup}>
							<StatusTag
								status={phoneNumberVerifyStatus}
								goodLabel={partnerSection.phoneNumberVerified}
								warningLabel={partnerSection.phoneNumberUnverified}
							/>
							<StatusTag
								status={nnidVerifyStatus}
								goodLabel={partnerSection.NyamNyamIdVerified}
								warningLabel={partnerSection.NyamNyamIdUnverified}
							/>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default PartnerProgram;

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		gap: 18,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	box: {
		borderRadius: 10,
		backgroundColor: '#fff',
		elevation: 3,
		shadowColor: '#cacaca',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.4,
		shadowRadius: 10,
		flexDirection: 'row',
		gap: 15,
		paddingVertical: 10,
		alignItems: 'center',
	},
	partnerImg: {
		width: 120,
		aspectRatio: 76 / 79,
	},
	boxContent: {
		gap: 5,
		flex: 1,
	},
	boxTitle: {
		color: '#1c1917',
		fontSize: 16,
		fontWeight: '700',
	},
	boxDescription: {
		color: 'rgba(108, 103, 100, .7)',
		paddingRight: 10,
	},
	descriptionHighlight: {
		color: '#6740ff',
	},
	statusGroup: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 5,
	},
});
