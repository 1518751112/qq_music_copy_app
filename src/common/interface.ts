import {NavigationProp} from "@react-navigation/core/lib/typescript/src/types";

export interface ViewsConfig {
    component: any,
    name: string,
    options: {
        title: string,
        headerShown?: boolean,
    }
}

export type Navigation = NavigationProp<any>
export interface NavigationDes {
    navigation: Navigation,
    route: {
        /**
         * Unique key for the route.
         */
        key: string;
        /**
         * User-provided name for the route.
         */
        name: string;
        /**
         * Path associated with the route.
         * Usually present when the screen was opened from a deep link.
         */
        path?: string;
        params?: any;
    }
}
