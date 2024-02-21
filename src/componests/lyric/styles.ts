import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    home: {
        borderRadius: 1,
    },
    box: {
        width: "100%",
        height: Dimensions.get('screen').height,
        backgroundColor: '#000000',
        paddingTop: 35,
        paddingBottom: 35,
    },
    back: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
})

export default styles
