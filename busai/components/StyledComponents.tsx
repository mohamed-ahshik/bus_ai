import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

/**
 * SafeAreaView with Uniwind className support.
 * Use this instead of plain SafeAreaView when you need className props.
 */
export const StyledSafeAreaView = withUniwind(SafeAreaView);
