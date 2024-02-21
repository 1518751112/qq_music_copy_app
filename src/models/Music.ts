import {ESongDetail, ESongInfo, NMusic, RSetState} from "common/constant";
import {requestGet} from 'utils/dva16'

export default {
  namespace: NMusic,
  state: {
    currentInfo:null,
    time:0,
    state:false,
    history:[]
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
    async [ESongDetail](payload: {ids:string[]}, { call, reducer, select, effect }: any) {
      const res = await requestGet('song/detail', {ids:payload.ids.join(',')})
      return res
    },
    async [ESongInfo](payload: {ids:string[]}, { call, reducer, select, effect }: any) {
      const res = await requestGet('song/url', {id:payload.ids.join(',')})
      return res
    },
  },
}
