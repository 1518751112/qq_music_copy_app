import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        elevation: 4, // Android 阴影效果
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex:10,
    },
    dragging: {
        backgroundColor: 'lightgrey',
    },
});

export default styles
