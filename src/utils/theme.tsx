import {Dimensions, Platform, StatusBar} from 'react-native'

export const ThemeColor = {
    main: "#601D86", // 主题主颜色
    lineColor: "#dedede",
    f5: "#f5f5f5",
    f2: "#f2f2f2",
    headerBlack: "#2E2E30",
    "8d": "#8d8d8d",
    mainBtn: "#9C15CE"
}

export const WhiteHeaderStyle = {
    headerStyle: {
        backgroundColor: "white",

      },
    headerTitleStyle: {
        color: '#222',
        ...Platform.select({
          android: {
            width: Dimensions.get('window').width - 140,
            textAlign: 'center'
          }
        })
      },
      // headerBackTitleVisible: false,
      headerBackTitle: "返回",
      headerBackTitleStyle: { color: "#515151" },
}

export const ThemeHeaderStyle = {
    headerStyle: {
        backgroundColor: ThemeColor.main,
      },
    headerTitleStyle: {
        color: '#FFF',
        ...Platform.select({
          android: {
            width: Dimensions.get('window').width - 140,
            textAlign: 'center'
          }
        })
      },
      headerBackTitleStyle: { color: "white" },
      headerBackTitle: "返回",
}

export const BlackHeaderStyle = {
  headerStyle: {
      backgroundColor: ThemeColor.headerBlack,
      borderBottomWidth: 0,
        borderBottomColor: '#e4e4e4',
        elevation: 0,
        shadowOpacity: 0
    },
  headerTitleStyle: {
      color: '#FFF',
      ...Platform.select({
        android: {
          width: Dimensions.get('window').width - 140,
          textAlign: 'center'
        }
      })
    },
    headerBackTitle: "返回",
    headerBackTitleStyle: { color: "white" },
    // headerBackTitleVisible: false,
}

export const ViewBorderBottomLine = {
    borderBottomColor: ThemeColor.lineColor,
    borderBottomWidth: 0.5
}

export const setStatusWhite = ()=> {
  StatusBar.setBarStyle("light-content")
}

export const setStatusDark = ()=> {
  StatusBar.setBarStyle("dark-content")
}

export const TabHeight = 60
