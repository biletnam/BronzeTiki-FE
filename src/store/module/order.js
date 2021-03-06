import axios from 'axios'

export default {
  state: {
    orderInfo: {}
  },
  mutations: {
    SET_ORDER (state, order) {
      state.orderInfo = order
    }
  },
  actions: {
    GET_ORDERLIST ({ commit }) {
      // return axios.get('/static/mock/order-list.json').then(res => {
      return axios.get('/api/orders').then(res => {
        if (res.status === 200) {
          return res.data
        }
      })
    },
    GET_ORDER ({ commit }, orderId) {
      // return axios.get('/static/mock/order.json').then(res => {
      return axios.get('/api/orders/' + orderId).then(res => {
        if (res.status === 200) {
          commit('SET_ORDER', res.data)
        } else {
          commit('SET_ORDER', {})
        }
      })
    },
    CREATE_ORDER ({ commit }, payload) {
      return axios.post('/api/orders', payload).then(res => {
        if (res.status === 200) {
          commit('SET_ORDER', res.data)
        }
      })
    },
    PAY_ORDER ({ commit }, payload) {
      // return axios.get('/static/mock/pay-result.json').then(res => {
      return axios.patch('/api/orders/' + payload.orderId, payload.payInfo).then(res => {
        if (res.status === 200) {
          return res.data
        }
      })
    }
  }
}
