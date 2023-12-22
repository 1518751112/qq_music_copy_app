import {StyleSheet} from "react-native";

const global = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        flex: 1,
        position: 'relative'
    },
    getUser: {
        width: 100,
        height: 50,
        position: 'absolute',
        bottom:'10%',
        right:20,
        zIndex:999,
        borderRadius:15,
        padding:0,
        margin:0
    },
    fileUpdate: {
        width: 80,
        height: 80,
        padding:0,
        margin:0,
        borderColor:"#9a9a9a",
        borderRadius:5
    },
    fileUpdate_txt:{
        color:"#9a9a9a",
        fontSize:60
    }
})

export default global
