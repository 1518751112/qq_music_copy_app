import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(255,255,255,0.81)',
        marginVertical:10,
        width:250,
        borderRadius:5
    },
    progressBar: {
        backgroundColor:'#5b5b5b',
        borderRadius:5
    },
    progressBox: {
        position: 'absolute',
        padding:10,
        alignSelf: 'flex-start',
    },
    progress: {
        padding:10,
    },
    progressBtn: {
        width:10,
        height:10,
        borderRadius:20,
        backgroundColor:'#ffffff'
    },
    touchableContainer: {
        position: 'absolute',
        top: -20, // 负值表示向外扩展点击范围
        bottom: -20,
        left: -0,
        right: -0,
        // backgroundColor:'rgba(255,0,0,0.58)'
    },
})

export default styles
