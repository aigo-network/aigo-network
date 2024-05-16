import { Image, StyleSheet, Text, View } from "react-native";
import SafeContainer from "components/SafeContainer";
import { Button } from "components/Button";

export const LoginScreen = () => {
    return (
        <View style={styles.container}>
			<Image source={require('assets/img/login/background-logo.png')} style={styles.backgroundImage} />
            <SafeContainer style={styles.safeContainer}>
				<View>
					<Image source={require('assets/img/login/logo.png')} style={styles.logoImg} />
					<Text style={styles.welcome}>{`Welcome to\nAiGO`}</Text>
					<Text style={styles.slogan}>{'Turns your everyday\nActions into rewards'}</Text>
				</View>
                <View style={styles.btnGroup}>
                    <Button prefix={
                        	<Image source={require('assets/img/login/google-logo.png')} />
                    	}
						style={styles.btn}
					>
                        <Text style={styles.btnText}>Log in with Google</Text>
                    </Button>
                    <Button prefix={
                        	<Image source={require('assets/img/login/apple-logo.png')} />
                    	}
						style={styles.btn}
					>
                        <Text style={styles.btnText}>Log in with Apple</Text>
                    </Button>
                </View>
				<Text style={styles.version}>Version 0.1</Text>
            </SafeContainer>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6740ff',
    },
	backgroundImage: {
		position: 'absolute',
		bottom: 0,
		left: 200,
	},
    safeContainer: {
        justifyContent: 'space-between',
    },
    logoImg: {
		alignSelf: 'center',
        aspectRatio: 150 / 138,
		marginTop: 120,
        marginBottom: 24,
    },
    welcome: {
        fontFamily: 'Gabarito',
        fontWeight: '600',
        fontSize: 42,
        textAlign: 'center',
        color: '#fff',
    },
    slogan: {
        alignSelf: 'center',
        marginTop: 14,
        fontFamily: 'Gabarito',
        fontSize: 19,
        color: '#a0fa82',
    },
    btnGroup: {
		flex: 1,
        gap: 17,
        paddingHorizontal: 40,
		justifyContent: 'flex-end',
		paddingBottom: 50,
    },
	btn:{
		paddingVertical: 15,
		backgroundColor: '#ededed',
		borderRadius: 50,
	},
    btnText: {
        textAlign: 'center',
		fontFamily: 'Gabarito',
		fontSize: 20,
    },
	version: {
		fontFamily: 'Gabarito',
		textAlign: 'center',
		color: '#fff',
	}
})