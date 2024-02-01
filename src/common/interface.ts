import {NavigationProp} from "@react-navigation/core/lib/typescript/src/types";
import type {Route} from "@react-navigation/routers";

export interface ViewsConfig {
    component: any,
    name: string,
    options: {
        title: string,
        headerShown?: boolean,
    }
}

export interface NavigationDes {
    navigation: NavigationProp<any>,
    route: Route<any>
}
