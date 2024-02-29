import React, {useEffect, useRef, useState} from 'react';
import {
    Animated,
    GestureResponderEvent,
    PanResponder,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import styles from "./styles";

//进度条
function Progress(props:{
    height:number,
    schedule:number,
    dragToEnlarge?:number
    style?:StyleProp<ViewStyle>
    barStyle?:StyleProp<ViewStyle>
    barBtnStyle?:StyleProp<ViewStyle>
    onCheng?: (value: number) => void
}) {
    const {height,dragToEnlarge=1,schedule,onCheng,style={},barStyle={},barBtnStyle={}} = props;
    const pan = useRef(new Animated.ValueXY()).current;
    const outData = useRef({widthMax:0,isClock:false,progressBtnW:0,leftOffset:0}).current;
    const [progressBoxH,setProgressBoxH] = useState(0)
    const [containerH,setContainerH] = useState(0)
    const [progressBarW,setProgressBarW] = useState(0)
    const [isDrag,setIsDrag] = useState(false)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // 开始手势操作，初始化值
                setIsDrag(true)
            },
            onPanResponderMove: (event, gestureState)=>{
                // @ts-ignore
                let newX = pan.x._offset + gestureState.dx;
                newX = Math.min(outData.widthMax-outData.leftOffset, newX);
                newX = Math.max(-outData.leftOffset, newX);
                setProgressBarW(newX+outData.leftOffset)

                // @ts-ignore
                gestureState.dx=newX-pan.x._offset;
                // 处理手势移动事件
                Animated.event([
                    null,
                    // { dx: position.x, dy: position.y },
                    //只允许在Y轴上拖动
                    { dx: pan.x },
                ],{
                    useNativeDriver:false
                })(event, gestureState);
            },
            onPanResponderRelease: () => {
                // 当手指释放时，根据当前位置计算进度并更新到合适的值
                // @ts-ignore
                const x = pan.x._value+pan.x._offset
                pan.setOffset({
                    // @ts-ignore
                    x: x,
                    // @ts-ignore
                    y: pan.y._value,
                });
                pan.setValue({ x: 0, y: 0 });
                out((x+outData.leftOffset)/outData.widthMax*100)
                setIsDrag(false)
            },
        })
    ).current;

    useEffect(()=>{
        if(schedule!=null&&!isDrag){
            let num = Math.min(schedule,100)
            num = Math.max(schedule,0)
            const x = (num/100*outData.widthMax)
            pan.setOffset({
                // @ts-ignore
                x: x-outData.leftOffset,
                // @ts-ignore
                y: pan.y._value,
            });
            pan.setValue({ x: 0, y: 0 });
            setProgressBarW(x)
        }
    },[schedule,isDrag])

    const onPress = (event:GestureResponderEvent)=>{
        if(outData.isClock)return;
        outData.isClock = true;
        //获取点击的位置
        const x = Math.min(event.nativeEvent.locationX,outData.widthMax)-outData.leftOffset;
        // console.log("点击位置",x)
        //使Animated.View移动到指定位置
        pan.setOffset({
            // @ts-ignore
            x: x,
            // @ts-ignore
            y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
        outData.isClock = false;
        setProgressBarW(x+outData.leftOffset)
        out((x+outData.leftOffset)/outData.widthMax*100)
    }
    const out = (num:number)=>{
        onCheng&&onCheng(num)
    }
    return (
        <TouchableOpacity style={[styles.container,style,{height}]} activeOpacity={0.5} onLayout={(event)=>{
            if(outData.widthMax==0){
                outData.widthMax = event.nativeEvent.layout.width
            }
            if(containerH==0){
                setContainerH(event.nativeEvent.layout.height)
            }
        }} onPress={onPress}>
            <View style={[styles.progressBar,barStyle,{height,width:progressBarW}]}></View>

            <View style={styles.touchableContainer} onTouchStart={()=>{}}/>
            <Animated.View
                style={[styles.progressBox, {
                    transform: [{ translateX: pan.x }]
                },{top:containerH/2-progressBoxH/2}]}
                {...panResponder.panHandlers}
                onLayout={(event)=>{
                    if(progressBoxH==0){
                        outData.leftOffset = event.nativeEvent.layout.width/2
                        setProgressBoxH(event.nativeEvent.layout.height)
                    }
                }}
            >
                <View style={[styles.progressBtn,barBtnStyle,isDrag?{transform:[{scale:dragToEnlarge}]}:null]} onLayout={(event)=>{
                    if(outData.progressBtnW==0){
                        outData.progressBtnW = event.nativeEvent.layout.width
                    }
                }}>
                </View>
            </Animated.View>
        </TouchableOpacity>
  );
}
export default Progress

