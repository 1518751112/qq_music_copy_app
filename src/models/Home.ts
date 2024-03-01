import {EGet, EGetBanner, ESongSheet, NHome, RSetState} from "common/constant";
import {requestGet} from 'utils/dva16'

export default {
  namespace: NHome,
  state: {
    name:"测试昵称",
    playerHeight:0,
    playerIsShow:true,
    currentListIsShow:false,
    lyricIsShow:false,
  },
  reducers: {
    [RSetState](state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    async [EGet](payload: any, { call, reducer, select, effect }: any) {
      const res = await requestGet('homepage/block/page', payload)
      return res
    },
    async [ESongSheet](payload: {id:string,s?:number}, { call, reducer, select, effect }: any) {
      const res = await requestGet('playlist/detail', payload)
      return res
    },
    async [EGetBanner](payload: any, { call, reducer, select, effect }: any) {
      const res = await requestGet('banner', payload)
      return res
    },
  },
}
