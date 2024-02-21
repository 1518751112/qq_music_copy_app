import {Dimensions, StyleSheet} from "react-native";

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
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: -5,
        overflow: 'hidden'
    },
    dragging: {
        backgroundColor: 'lightgrey',
    },
    box: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "rgba(0,0,0,0.44)",
        zIndex: -10,
    }
});

export default styles
