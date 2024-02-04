import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    home:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        overflow:'hidden',
        zIndex:10,
    },
    box:{
        width:'100%',
        paddingTop:40,
        paddingBottom:20,
        paddingLeft:17,
        paddingRight:17,
        flexDirection: 'row', // 默认为 'column'
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex:9
    },
    leftButton:{
        width:20,
        height:20
    },
    title:{
        marginLeft:10,
        color:'#ffffff',
        fontSize:19
    },
    left:{
        flexDirection:'row'
    },
    right:{
        width:60,
        justifyContent: 'space-between',
        flexDirection:'row'
    },
    backgroundImage:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        // opacity:0.5
    }

})

export default styles
