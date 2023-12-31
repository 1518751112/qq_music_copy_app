import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./styles";
import StatusBarDiy from "componests/statusBarDiy";
import {Button, Carousel, Flex, WhiteSpace} from "@ant-design/react-native";
import Ionicons from "react-native-vector-icons/Feather";
import KingKong, {KingKongData} from "componests/kingKong";
import CarouselNew from "react-native-snap-carousel-new";
import {effect} from "utils/dva16";
import {EGet, NHome} from "common/constant";

const banners = [
    "https://xf-1322333971.cos.ap-shanghai.myqcloud.com/sf/upload/gxb/%E8%92%99%E7%89%88%E7%BB%84%2028.png",
    "https://xf-1322333971.cos.ap-shanghai.myqcloud.com/sf/upload/LDr/%E8%92%99%E7%89%88%E7%BB%84%2046.png",
    "https://xf-1322333971.cos.ap-shanghai.myqcloud.com/sf/upload/Vs6/%E8%92%99%E7%89%88%E7%BB%84%2047.png",
    "https://xf-1322333971.cos.ap-shanghai.myqcloud.com/sf/upload/XUN/%E8%92%99%E7%89%88%E7%BB%84%2048.png",
    "https://xf-1322333971.cos.ap-shanghai.myqcloud.com/sf/upload/PA3/%E8%92%99%E7%89%88%E7%BB%84%2051.png",
]
//推荐歌单
const oldSongList = [
    {
        title:'乘风破浪会有时，唱歌是一种怎么的情感',
        source:require('assets/home/u183.png')
    },
    {
        title:'中国偶像黄金年代，记忆是花香',
        source:require('assets/home/u186.png')
    },
    {
        title:'谁能凭爱意私有富赏之上的心愿',
        source:require('assets/home/u192.png')
    },
    {
        title:'谁能凭爱意私有富赏之上的心愿',
        source:require('assets/home/u195.png')
    },
    {
        title:'乘风破浪会有时，唱歌是一种怎么...',
        source:require('assets/home/u183.png')
    },
]

export default ({navigation}: any) => {
    const [songList,setSongList] = useState(oldSongList)

    useEffect(() => {
        //获取首页信息
        setTimeout(init,1000)
    }, []);

    const init = async ()=>{
        const result = await effect(NHome,EGet)
        if(result.code==200&&result.data){
            const {blocks} = result.data
            //获取推荐歌单
            const song = blocks.find((v:any)=>v.blockCode==='HOMEPAGE_BLOCK_PLAYLIST_RCMD')
            console.log(song.creatives)
            //循环出歌曲id与歌曲名称
            const songList = song.creatives.map((v:any)=>{
                return {
                    id:v.resources[0].resourceId,
                    title:v.resources[0].uiElement.mainTitle.title,
                    source:{uri:v.resources[0].uiElement.image.imageUrl+'?param=150y150'},
                    playCount:v.resources[0].resourceExtInfo.playCount,
                    labelTexts:v.resources[0].uiElement.labelTexts,
                }
            })
            setSongList(songList)
            // console.log("songList",songList)
        }
    }
    const kingKongData = (size:number):KingKongData[]=>{
        const data = [
            {
                title:'每日推荐',
                icoName:'calendar',
                diyLogo:<></>
            },
            {
                title:'歌单',
                icoName:'music',
            },
            {
                title:'排行榜',
                icoName:'trello',
            },
            {
                title:'电台',
                icoName:'monitor',
            },
            {
                title:'直播',
                icoName:'video',
            },
            {
                title:'数字专辑',
                icoName:'layers',
            },
            {
                title:'关注新歌',
                icoName:'headphones',
            },
            {
                title:'关注新歌',
                icoName:'headphones',
            },
            {
                title:'关注新歌',
                icoName:'headphones',
            }
        ]
        data.forEach(v=>{
            v.diyLogo = <View style={{
                width: size,
                height: size,
                borderRadius: size/2,
                alignItems: 'center',
                justifyContent:'center',
                backgroundColor:'#FF2721'
            }}>
                <Ionicons name={v.icoName} size={20} color={'#ffffff'}/>
            </View>
        })
        return data
    }

    return (
        <View style={styles.home}>
            <StatusBarDiy barStyle='dark-content'/>

            <Flex wrap="nowrap" align="center" justify='between' style={styles.header}>
                <Ionicons name='mic' size={20} color={'#9d9d9d'}/>
                <Flex wrap="nowrap" align="center" justify='center' style={styles.headerSearch} onPress={() => {
                    console.log("跳转搜索界面")
                }}>
                    <Ionicons name='search' size={20} color={'rgba(157,157,157,0.35)'}/>
                    <Text style={styles.headerTxt}>阳光开朗大男孩</Text>
                </Flex>
                <TouchableOpacity>
                    <Image source={require('assets/home/u105.png')}/>
                </TouchableOpacity>
            </Flex>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.outWrapper}>
                    <Carousel
                        style={styles.wrapper}
                        dotStyle={{
                            backgroundColor: 'rgba(255,255,255,0.5)',
                        }}
                        dotActiveStyle={{
                            backgroundColor: '#5086fa',
                        }}
                        autoplay
                        infinite
                    >
                        {banners.map((v: string, index: number) => (
                            <Image source={{uri: v}} style={styles.wrapperImage} key={index}/>))}
                    </Carousel>
                </View>
                <WhiteSpace size="lg" />
                <KingKong interval={30} size={50} data={kingKongData(50)} />
                <WhiteSpace size="lg" />
                <Flex wrap="nowrap" align="center" justify='between' style={styles.zt}>
                    <Text style={styles.ztTxt}>推荐</Text>
                    <Button style={styles.ztButton} size='small'>查看更多</Button>
                </Flex>
                <KingKong interval={15} sourceStyle={{borderRadius:10}} size={110} numberOfLines={2} data={songList} />
                <WhiteSpace size="lg" />
                <Flex wrap="nowrap" align="center" justify='between' style={styles.zt}>
                    <Text style={styles.ztTxt}>排行榜</Text>
                    <Button style={styles.ztButton} size='small'>进入榜单</Button>
                </Flex>
                <WhiteSpace size="lg" />
                <CarouselNew
                    data={banners}
                    sliderWidth={400}
                    itemWidth={330}
                    renderItem={ ({item, index}) => {
                        return (
                            <View style={styles.ranking} key={index}>
                                <Flex wrap="nowrap" align="center" justify='between' style={styles.zt}>
                                    <Text style={styles.ztTxt}>排行榜</Text>
                                    <Text style={{color:'#b4b4b4'}}>云村用户都在听</Text>
                                </Flex>
                                {[1,1,1].map((value,i)=>{
                                    return (<Flex wrap="nowrap" align="center" justify='between' key={i} style={styles.rBox}>
                                        <Image source={{uri:item}} style={styles.rBoxImage} />
                                        <Text style={{
                                            fontSize:23,
                                            color:['#ffa900','#dedede','#794d00'][i]
                                        }}>
                                            {i+1}
                                        </Text>
                                        <View style={styles.rPlaylists}>
                                            <View>
                                                <Text style={styles.rPlaylistsTxtTitle}>我想念</Text>
                                                <Text style={styles.rPlaylistsTxtAuthor}>汪苏泷</Text>
                                            </View>
                                            <Text style={styles.rPlaylistsTxt1}>霸榜</Text>
                                        </View>
                                    </Flex>)
                                })}
                            </View>
                        )
                    }} />
                <WhiteSpace size="lg" />

            </ScrollView>

        </View>
    )
}

