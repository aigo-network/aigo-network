import { Keyboard, StyleSheet, Text, View } from "react-native"
import SafeContainer from "./SafeContainer";
import { Button } from "./Button";
import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
	disabled: boolean;
	onPress: () => void;
	children: ReactNode;
	title: string;
	subTitle: string;
	mainBtnText?: string; 
}

export const OnboardLayout: FC<Props> = ({ disabled, onPress, children, title, subTitle, mainBtnText }) => {
	const [keyboardShown, setKeyboardShown] = useState(Keyboard.isVisible());
	const btnBackgroundColor = {backgroundColor: disabled ? '#ebf7e6' : '#a0fa82'};
	const btnTextColor = {color: disabled ? '#b1c2ab' : '#6740ff'};
	const btnPaddingBottom = {paddingBottom: keyboardShown ? 0 : 40};

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardShown(Keyboard.isVisible());
		})
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardShown(Keyboard.isVisible());
		})

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		}
	}, [])

	return (
		<View style={styles.container}>
			<SafeContainer>
				<View style={styles.contentContainer}>
					<Text style={[styles.text, styles.title]}>{title}</Text>
					<Text style={[styles.text, styles.subTitle]}>{subTitle}</Text>
					{children}
				</View>
				<View style={[styles.btnContainer, btnPaddingBottom]}>
					<Button style={[styles.btn, btnBackgroundColor]} onPress={onPress} disabled={disabled}>
						<Text style={[styles.btnText, btnTextColor]}>{mainBtnText || 'Continue'}</Text>
					</Button>
				</View>
			</SafeContainer>
		</View>
	)
}

export default OnboardLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6740ff',
	},
	text: {
		fontFamily: 'Gabarito',
		color: '#fff',
		textAlign: 'center',
	},
	title: {
		fontSize: 30,
		fontWeight: '500',
	},
	subTitle: {
		marginTop: 10,
		fontSize: 16,
	},
	contentContainer: {
		flex: 1,
	},
	btnContainer: {
		paddingHorizontal: 40,
		justifyContent: 'flex-end',
	},
	btn: {
		backgroundColor: '#a0fa82',
		paddingVertical: 15,
		borderRadius: 50,
	},
	btnText: {
		fontFamily: 'Gabarito',
		fontWeight: '500',
		fontSize: 19,
	},
})