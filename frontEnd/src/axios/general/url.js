function createHttpUrl(axios){
  return {
    queryHomePageOverview:data=>axios({method:'post',url:'homePage/overview',data}),
    queryHomePageInfoTrend:data=>axios({method:'post',url:'homePage/trendState',data}),
    queryHomePageEmotionState:data=>axios({method:'post',url:'homePage/emotionState',data}),
    queryHomePageResourceState: data=>axios({method:'post',url:'homePage/resourceState',data}),
    queryHomePageSensitiveState:data=>axios({method:'post',url:'homePage/sensitiveState',data}),
    queryHomePageInfoMap:data=>axios({method:'post',url:'homePage/areaState',data}),
    queryHomePageHotWord:data=>axios({method:'post',url:'homePage/hotWordState',data}),
    queryHomePageWordEntity:data=>axios({method:'post',url:'homePage/wordEntityState',data}),
    queryHomePageQueryMostHotEvents:data=>axios({method:'post',url:'homePage/queryMostHotEvents',data}),
    queryHomePageHotAccount:data=>axios({method:'post',url:'homePage/queryHotAccount',data}),
    queryHomePageAccountMap:data=>axios({method:'post',url:'homePage/accountAreaState',data}),
    queryHomePageAccountEmotionState:data=>axios({method:'post',url:'homePage/accountEmotionState',data}),
    queryHomePageAccountSensitiveState:data=>axios({method:'post',url:'homePage/accountSensitiveState',data})


  }
}
export default{
  createHttpUrl:createHttpUrl
}
