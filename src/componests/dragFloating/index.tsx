import React, {ReactElement, useEffect, useRef, useState} from 'react';
import styles from "./styles";
import {
    Animated,
    BackHandler,
    ColorValue,
    Dimensions,
    Modal,
    PanResponder,
    PanResponderInstance,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import {setStatusBarHeight} from "utils/util";

const DragFloating = (props:{
    style?:StyleProp<ViewStyle>
    children?: ReactElement<any, any>[]|ReactElement<any, any>;
    onRequestClose?:()=>void;
    visible:boolean,
    dragEnabled?:boolean,
    height?:number,
    goInTime?:number,
    maskingColor?:ColorValue,
}) => {
    const {onRequestClose,visible,height,goInTime,maskingColor="rgba(0,0,0,0.44)",dragEnabled=true} = props
    const [heightMax] = useState(Dimensions.get('window').height+setStatusBarHeight());
    const [animated2,setAnimated] = useState(height||0);
    const animated = useRef(height||0);
    const position = useRef(new Animated.ValueXY({ x: 0, y: heightMax })).current;
    const outData = useRef({time:0,visible}).current;
    const [panResponder,setPanResponder] = useState<PanResponderInstance>();

    useEffect(()=>{
        if(visible&&animated2){
            // 初始化值
            Animated.timing(position, {
                // @ts-ignore
                toValue: { x: 0, y: heightMax-animated2 },
                useNativeDriver:false,
                duration: goInTime||300, // 动画持续时间
            }).start();
        }
        outData.visible = visible
    },[visible,animated2])

    //监听返回键
    useEffect(()=>{

        BackHandler.addEventListener('hardwareBackPress',onBackPress)
        return ()=>{
            BackHandler.removeEventListener('hardwareBackPress',onBackPress)
        }
    },[])

    useEffect(() => {
        setPanResponder(PanResponder.create({
            onStartShouldSetPanResponder: () => dragEnabled,
            onMoveShouldSetPanResponder: () => dragEnabled,
            onPanResponderTerminationRequest: () => false, // 不允许终止事件
            onPanResponderGrant: () => {
                // 开始手势操作，初始化值
                outData.time = Date.now();
                /*position.setOffset({
                    // @ts-ignore
                    x: position.x._value,
                    // @ts-ignore
                    y: position.y._value,
                });
                position.setValue({ x: 0, y: 0 }); // reset to 0*/
            },
            onPanResponderMove: (event, gestureState) => {
                // @ts-ignore
                let newY = position.y._offset + gestureState.dy;
                newY = Math.min(heightMax, newY);
                newY = Math.max(heightMax-animated.current, newY);
                // @ts-ignore
                gestureState.dy=newY-position.y._offset;
                // 处理手势移动事件
                Animated.event([
                    null,
                    // { dx: position.x, dy: position.y },
                    //只允许在Y轴上拖动
                    { dy: position.y },
                ],{
                    useNativeDriver:false
                })(event, gestureState);
            },
            onPanResponderRelease: () => {
                position.flattenOffset();
                // 可在此处添加边界检查等逻辑
                // 在释放手势后自动弹回
                // 滑动距离小于最高度的2/5时，自动弹回,大于2/5时，关闭
                const num = heightMax - animated.current
                //获取滑动距离
                // @ts-ignore
                const distance = position.y._value-num
                //快速下滑关闭
                if ( Date.now()-outData.time<300&&distance > animated.current /  10) {
                    out()
                    return
                }
                if (distance < animated.current /  3.5) {
                    Animated.timing(position, {
                        // @ts-ignore
                        toValue: { x: 0, y: num },
                        useNativeDriver:false,
                        duration: 200, // 动画持续时间
                    }).start();
                }else{
                    out()
                }


            },
        }))
    }, [dragEnabled]);

    const onBackPress = () => {
        if(outData.visible){
            out()
            return true
        }
        return false

    }

    const out = ()=>{
        Animated.timing(position, {
            // @ts-ignore
            toValue: { x: 0, y: heightMax },
            useNativeDriver:false,
            duration: 200, // 动画持续时间
        }).start(()=>{
            onRequestClose&&onRequestClose()
        });
    }
    return (
        <Modal
            visible={visible}
            animationType='fade'
            style={{flex:1}}
            transparent={true}
            onRequestClose={out}
            statusBarTranslucent
            hardwareAccelerated
        >
            <View style={[styles.box,{backgroundColor:maskingColor,display:visible?undefined:"none",zIndex: -10}]}>
                <TouchableOpacity activeOpacity={1} style={styles.box} onPress={out}>
                </TouchableOpacity>
                <Animated.View
                    {...panResponder?.panHandlers}
                    style={[{...styles.bottomSheet,height:animated2||null}, position.getLayout(),props?.style||null]}
                    onLayout={(e:any) => {
                        if(!animated.current){
                            animated.current=e.nativeEvent.layout.height
                            setAnimated(e.nativeEvent.layout.height)
                            // console.log('animated.current',animated.current)
                        }
                    }}
                >
                    {props.children}
                </Animated.View>
            </View>


        </Modal>

    );
};

export default DragFloating;
