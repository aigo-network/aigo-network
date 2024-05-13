import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeContainer from "components/SafeContainer";

export const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <SafeContainer style={styles.safeContainer}>
                <Image source={require('assets/img/login/logo.png')} style={styles.logoImg} />
                <Image source={require('assets/img/login/shipper.png')} />
                <Text style={styles.text}>{'Turns your everyday\nActions into rewards'}</Text>
                <TouchableOpacity style={styles.loginBtn}>
                    <Image source={require('assets/img/login/google-login.png')} />
                </TouchableOpacity>
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
    safeContainer: {
        justifyContent: 'center',
    },
    logoImg: {
        aspectRatio: 273 / 67,
        marginBottom: 36,
    },
    text: {
        marginTop: 30,
        fontFamily: 'Gabarito',
        fontWeight: '500',
        fontSize: 19,
        color: 'rgba(255, 255, 255, .8)',
    },
    loginBtn: {
        marginTop: 68,
    },
})