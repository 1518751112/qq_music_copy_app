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
        paddingTop:Dimensions.get('window').height*0.12,
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
        width:Dimensions.get('window').width*0.26,
    },
    topBoxTopLeImage:{
        width: '100%',
        height: Dimensions.get('window').width*0.26,
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
        marginLeft:10,
        width:Dimensions.get('window').width*0.59,
        overflow:'hidden'
    },
    topBoxTopRightLabel:{
        flexDirection:'row'
    },
    topBoxTopRightTitle:{
        color:'#ffffff',
        fontSize:20
    },
    creator:{
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        alignItems:'center',
    },
    creatorAvatar:{
        width:25,
        height:25,
        borderRadius:20,
    },
    creatorDesc:{
        color:'rgba(255,255,255,0.89)',
        maxWidth:135,
        marginLeft:10
    },
    tag:{
        backgroundColor:'rgba(255,255,255,0.29)',
        color:"#ffffff",
        fontSize:15,
        paddingTop:3,
        paddingBottom:3,
        paddingLeft:5,
        paddingRight:5,
        borderRadius:3,
        marginRight:5
    },
    attention:{
        marginLeft:8,
        flexDirection:'row',
        alignItems:'center',
        padding:5,
        backgroundColor:'rgba(255,255,255,0.1)',
        borderRadius:15
    },
    desc:{
        color:'rgba(255,255,255,0.89)',
        marginTop:10,
        fontSize:15
    },
    topBoxBottom:{
        width:'100%',
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    topBoxBottomCent:{
        flexDirection:'row',
        alignItems:'center',
        width:'30%',
        height:39,
        backgroundColor:'rgba(255,255,255,0.29)',
        borderRadius:30,
        justifyContent:'center'
    },
    topBoxBottomCentText:{
        color:'white',
        marginLeft:4,
        fontSize:16,
        fontFamily:'JetBrainsMono-Bold'
    },
    bottomBoxTop:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        width:'100%',
        backgroundColor:'rgb(255,255,255)',
        paddingVertical:15,
        paddingHorizontal:17,
    },
    listPlay:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:4,
    },
    listPlayLeft:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    listPlayLeftText:{
        marginLeft:8,
        color:'black',
        fontSize:18,
    },
    listPlayLeftNum:{
        marginLeft:5,
        color:'#727272',
        fontSize:13,
    },
    listPlayRight:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    songList:{
        width:'100%',
        // height:Dimensions.get('window').height-95,
        // paddingTop:10,
        paddingLeft:17,
        paddingRight:17,
        backgroundColor:'rgb(255,255,255)',
        zIndex:4,
    },
    songListBox:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20
    },
    songListBoxLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    songListBoxLeftNum:{
        color:'#727272',
        fontSize:16,
    },
    songListBoxLeftText:{
        marginLeft:10,
        color:'black',
        fontSize:16,
        maxWidth:300
    },
    songListBoxRight:{
        flexDirection:'row',
        alignItems:'center'
    },
    songListBoxLeftTextSelect:{
        color:'#ff0000'
    },
})

export default styles
