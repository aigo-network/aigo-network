import type { FC, ReactNode } from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    children: ReactNode;
    style?: ViewStyle;
}

export const SafeContainer: FC<Props> = ({ children, style }) => {
    const insets = useSafeAreaInsets();
    const containerStyle = {
        flex: 1,
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    } as ViewStyle;

    return (
        <View style={[containerStyle, style]}>
            {children}
        </View>
    )
}

export default SafeContainer;