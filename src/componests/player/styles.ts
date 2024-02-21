import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    home:{
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        overflow:'hidden',
        zIndex:10,
        paddingVertical:10,
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
    },
    txt:{
      fontSize:16,
      color:'#000000',
        marginLeft:15
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    image:{
        width:37,
        height:37,
        borderRadius:25
    },
    strip:{
        width: 35,
        height: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
    },
    wrapper: {
        width: "100%",
        color: "#000000",
        zIndex:10,
    },
    tabsLine:{
        height:3,
        backgroundColor:'#ff4200',
        borderRadius:6,
    },
    menuContent:{
        width:"100%",
        backgroundColor:'#ffffff',
        alignContent:'center',
    },
    tool:{
        paddingVertical:7,
        paddingHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    toolLeft:{
        paddingHorizontal:10,
        paddingVertical:8,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:20
    },
    toolRight:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'25%'
    },
    songListBox:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
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
    },
    songListBoxRight:{
        flexDirection:'row',
        alignItems:'center'
    },
    songListBoxLeftTextSelect:{
        color:'#ff0000'
    },
    scrollView:{
        width:'100%',
        height:500,
        paddingLeft:17,
        paddingRight:17,
        zIndex:10,
    }
})

export default styles
