import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RootSiblingPortal} from "react-native-root-siblings";
import Player from "componests/player";
import {reducer, useStore} from "utils/dva16";
import {NHome, RSetState} from "common/constant";
import CurrentList from "componests/player/currentList";
import Lyric from "componests/lyric";

const FloatingWindow = (props:{
}) => {
    const {playerHeight,playerIsShow,currentListIsShow,lyricIsShow} = useStore(NHome);
    useEffect(() => {

    }, []);
    return (
        <RootSiblingPortal>
            <View>
                <Player style={{bottom:playerHeight,display:playerIsShow?undefined:"none",backgroundColor:'rgba(255,255,255,0.93)'}} />
                <Lyric visible={lyricIsShow} setVisible={(value)=>{
                    reducer(NHome,RSetState,{lyricIsShow:value})
                }}/>
                <CurrentList visible={currentListIsShow} setVisible={(value)=>{
                    reducer(NHome,RSetState,{currentListIsShow:value})
                }}/>

            </View>

        </RootSiblingPortal>

    );
};

export default FloatingWindow;
