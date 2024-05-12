import { StyleSheet, Text, View } from "react-native";
import SafeContainer from "components/SafeContainer";

export const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <SafeContainer>
                <Text></Text>
            </SafeContainer>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6740ff',
    }
})