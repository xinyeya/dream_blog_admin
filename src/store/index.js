import Vue from 'vue'
import Vuex from 'vuex'
import {getStorage, saveStorage} from "../utils/storge";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //  这里相当于Vue实例中的data，用于存放数据
    avatar: getStorage('avatar'),
    user: getStorage('user')
  },
  // 这里相当于Vue实例中的methods，用于定义方法 所有的方法都过来拿
  mutations: {
    // state是个形参 是state对象里面的数据都可以拿到 不通过this来拿
    setAvatar (state, avatar) {
      state.avatar = avatar
    },

    // 登录成功调用mutations更新容器中的user的状态
    setUser (state, data) {
      //   将数据
      state.user = data
      // 将数据放到本地存储
      saveStorage(state.user)
    }
  },
  actions: {
    // 这里可以监听state的值 直接返回出去 只读取值 如果需要修改值 找mutations  需要return出去
    readAvatar(state) {
      console.log(111111111111)
      return state.avatar
    }
  },
  modules: {
  }
})
