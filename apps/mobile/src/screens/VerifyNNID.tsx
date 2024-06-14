import { useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	FadeInDown,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { graphqlClient } from '@aigo/api/graphql';
import Button from '@aigo/components/Button';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import KeyboardView from '@aigo/components/KeyboardView';
import PointPopup from '@aigo/components/PointPopup';
import SafeContainer from '@aigo/components/SafeContainer';
import { config } from '@aigo/config';
import { useNavigation } from '@react-navigation/native';
import { Align, showModal } from 'empty-modal';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

const AnimatedView = Animated.createAnimatedComponent(View);

const VerifyNNIDScreen = () => {
	const { goBack } = useNavigation();
	const paddingBot = useSharedValue(0);
	const [loading, setLoading] = useState(false);
	const [nnid, setNnid] = useState('');
	const [error, setError] = useState(false);
	const { content } = useSnapshot(appState);
	const {
		title,
		enterNNID,
		subText,
		errorMessage,
		inputPlaceholder,
		continueButton,
	} = content.screens.nnidVerify;

	const onKeyboardShow = () => {
		paddingBot.value = withTiming(20);
	};
	const onKeyboardHide = () => {
		paddingBot.value = withTiming(40);
	};
	const onChangeText = (text: string) => {
		if (error) {
			setError(false);
		}
		setNnid(text);
	};

	const btnPaddingBottom = useAnimatedStyle(
		() => ({ paddingBottom: paddingBot.value }),
		[paddingBot],
	);

	const showCompleteNyamNyamVerification = () => {
		const { messagePrefix } = appState.content.modal.earnPoints;
		const points = config.activity.CompleteNyamNyamVerification.points;
		const { cleanModal } = showModal(
			<Animated.View entering={FadeInDown}>
				<PointPopup
					point={points}
					messagePrefix={messagePrefix}
					onPressClose={() => {
						cleanModal();
					}}
				/>
			</Animated.View>,
			{
				id: 'complete-nyam-nyam-verification',
				align: Align.FullCenter,
				showBackdrop: true,
			},
		);
	};

	const handleVerifyNyamNyamUser = async () => {
		setLoading(true);

		try {
			const nyamNyamUser = await graphqlClient.verifyNyamNyamUser({ nnid });
			if (nyamNyamUser) {
				const { user } = await graphqlClient.getUser();
				user && appActions.setAppUser(user);
				showCompleteNyamNyamVerification();
				goBack();
			}
		} catch (error) {
			console.log(error);
			setError(true);
		}

		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<SafeContainer>
				<KeyboardView
					style={{ justifyContent: 'space-between' }}
					onKeyboardShow={onKeyboardShow}
					onKeyboardHide={onKeyboardHide}
					aboveMaskComponent={
						<AnimatedView style={[styles.btnContainer, btnPaddingBottom]}>
							<Button
								style={[styles.btn, !!nnid && styles.activeBtn]}
								onPress={handleVerifyNyamNyamUser}
								disabled={!nnid}
								loading={loading}
							>
								<Text style={[styles.btnText, !!nnid && styles.activeBtnText]}>
									{continueButton}
								</Text>
							</Button>
						</AnimatedView>
					}
				>
					<View style={styles.innerContainer}>
						<View style={styles.titleContainer}>
							<TouchableOpacity
								style={styles.backButton}
								hitSlop={14}
								onPress={goBack}
							>
								<LeftArrowIcon color={'#000'} width={16} />
							</TouchableOpacity>
							<Text style={styles.title}>{title}</Text>
						</View>
						<View style={styles.contentContainer}>
							<Text style={styles.mainText}>{enterNNID}</Text>
							<Text style={styles.subText}>{subText}</Text>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								autoFocus
								style={styles.input}
								placeholder={inputPlaceholder}
								placeholderTextColor="#d0d0d0"
								onChangeText={onChangeText}
							/>
							{error && <Text style={styles.errorMess}>{errorMessage}</Text>}
						</View>
					</View>
				</KeyboardView>
			</SafeContainer>
		</View>
	);
};

export default VerifyNNIDScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		gap: 50,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginHorizontal: 25,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	backButton: {
		paddingVertical: 10,
		paddingRight: 10,
	},
	contentContainer: {
		gap: 15,
		marginHorizontal: 25,
	},
	mainText: {
		color: '#000',
		fontSize: 30,
		fontWeight: '700',
	},
	subText: {
		fontSize: 16,
		color: 'rgba(0, 0, 0, .7)',
	},
	inputContainer: {
		marginHorizontal: 25,
		gap: 20,
	},
	input: {
		fontSize: 25,
		fontWeight: '700',
		color: '#714cfe',
		textAlign: 'center',
	},
	errorMess: {
		textAlign: 'center',
		fontSize: 16,
		color: '#ec0000',
	},
	btnContainer: {
		marginHorizontal: 25,
	},
	btn: {
		backgroundColor: '#ebf7e6',
		paddingVertical: 15,
		borderRadius: 50,
	},
	activeBtn: {
		backgroundColor: '#a0fa82',
	},
	btnText: {
		fontFamily: 'Gabarito',
		fontWeight: '500',
		fontSize: 19,
		color: '#b1c2ab',
	},
	activeBtnText: {
		color: '#6740ff',
	},
});
