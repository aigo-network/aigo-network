import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatusTag, { Status } from '@aigo/components/StatusTag';
import { config } from '@aigo/config';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
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
		color: defaultTheme.textDark90,
	},
	box: {
		borderRadius: 10,
		backgroundColor: defaultTheme.gray10,
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
		color: defaultTheme.textDark90,
		fontSize: 16,
		fontWeight: '700',
	},
	boxDescription: {
		color: defaultTheme.textDark70,
		paddingRight: 10,
	},
	descriptionHighlight: {
		color: defaultTheme.cta100,
	},
	statusGroup: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 5,
	},
});
