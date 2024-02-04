import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#F7F9FD",
    },
    topBox:{
        width: "100%",
        paddingTop:Dimensions.get('window').height*0.126,
        paddingLeft:17,
        paddingRight:17,
        paddingBottom:22,
        zIndex:4
    },
    topBoxBackImg:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        zIndex:3
    },
    topBoxTop:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    topBoxTopLeft:{
        position: 'relative',
        overflow:'hidden',
        borderRadius:10,
        width:Dimensions.get('window').width*0.3
    },
    topBoxTopLeImage:{
        width: '100%',
        height: Dimensions.get('window').width*0.3,
    },
    ttTop: {
        flexDirection: 'row',
        top: 2,
        right: 8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:99
    },
    ttBack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(86,86,86,0.10)',
        top: 0,
        left: 0,
        zIndex:9
    },
    topBoxTopRight:{
        position: 'relative',
        overflow:'hidden',
        borderRadius:10
    },
    topBoxTopRightLabel:{
        position: 'relative',
        overflow:'hidden',
        borderRadius:10
    },
    topBoxTopRightTitle:{
        color:'#ffffff',
        fontSize:18
    },
})

export default styles
