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
    }
})

export default styles
