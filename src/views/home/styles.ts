import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    home: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#F7F9FD",
    },
    header: {
        height: 45,
        paddingLeft: 30,
        paddingRight: 30,
        // backgroundColor: 'red',
    },
    headerSearch: {
        width: '78%',
        height: '70%',
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
    },
    headerTxt: {
        color: 'rgba(157,157,157,0.35)',
        fontSize: 16,
        marginLeft: 5,
    },
    outWrapper: {
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10
    },
    wrapper: {
        width: "100%",
        height: 180,
        color: "#fff",
    },
    wrapperImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    zt: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    ztTxt: {
        fontSize: 19,
        color: 'black'
    },
    ztButton: {
        width: 80,
        height: '100%',
        borderRadius: 15,
    },
    ranking: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        paddingBottom: 10,
        marginBottom: 10,
        elevation: 5, // Android 阴影属性
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    rBox: {
        width: '100%',
        marginTop: 13
    },
    rBoxImage: {
        width: 52,
        height: 52,
        borderRadius: 10
    },
    rPlaylists: {
        width: '73%',
        flexDirection: 'row', // 默认为 'column'
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rPlaylistsTxt1: {
        color: 'red',
        fontSize: 16
    },
    rPlaylistsTxtTitle: {
        color: 'black',
        fontSize: 18
    },
    rPlaylistsTxtAuthor: {
        color: '#9a9a9a',
        fontSize: 14
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
    ttBottom: {
        position: 'absolute',
        right: 8,
        bottom: 5,
        zIndex:99
    }
})

export default styles
