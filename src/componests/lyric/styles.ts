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
        overflow:'hidden',
    },
    background:{
        flex: 1,
        position:'absolute',
        top:0,
        width:'100%',
        height:'100%',
        opacity:0.5
    },
    back: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    top:{
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal:30,
        marginTop: 20,
    },
    lrc:{
        height:'70%',
        width:'100%',
    },
    lrcText:{
    },
    scheduleText:{
        color:'#cecece'
    },
    bottom:{
        height:'15%',
    },
    schedule:{
        paddingTop:15,
        paddingHorizontal:10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    function:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems:'center',
        paddingHorizontal:30,
        marginTop: 40,
    },
})

export default styles
