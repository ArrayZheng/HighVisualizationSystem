/**
 * Created by Gaoyu on 2017/8/2.
 */
import io from 'socket.io-client'
import config from '../static/config/config'
import vuex from "./vuex/store"
var socket=io(config.serverAddress);
export default{
    emit: function(type,msg) {
      socket.emit(type,msg);
    },
    on:function(type,callback) {
      socket.on(type,function (msg) {
        callback(msg);
      });
    },
  close:function () {
      try{
        socket.close();
      }
      catch (e){};
  }
}
