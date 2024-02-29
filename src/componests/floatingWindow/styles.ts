import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    box: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('screen').height,
        position:'absolute',
        top:0,
        zIndex: -2,
    }
});

export default styles
