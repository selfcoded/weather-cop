import axios from 'axios'
import config from '@/staticConfig'
import cookies from 'js-cookie'

const state = {
      list: null,
      cityData: '',
      cityName: '',
      LoadingCityData: false,
      error: ''
  }
const actions = {
    async searchCity({ commit }, payload) {
        commit('ERROR', '')
        if( payload.refresh === true ) commit('GET_LOADING_DATA_STATUS', true);
        if(typeof payload.city !== 'undefined') {
            await axios.get(`${config.Base_URL}weather?q=${payload.city}&appid=${config.API_KEY}`).then(response => {
                commit('GET_CITY_DATA', { data:response.data, cityName:payload.city })
                if( payload.refresh === true ) commit('GET_LOADING_DATA_STATUS', false);
            }).catch(error => {
                commit('ERROR',error)
            })
        }else{
            commit('GET_CITY_DATA', { data:undefined, cityName:undefined })
            if( payload.refresh === true ) commit('GET_LOADING_DATA_STATUS', false);
        }
    }

  }
  const mutations = {
        GET_CITY_DATA: (state, {data, cityName}) => { 
            state.cityData = data; 
            state.cityName = cityName; 
            const tempList = typeof cityName !== 'undefined' && Boolean(cookies.get('cities')) && JSON.parse(cookies.get('cities')) !== null
            && Object.keys(JSON.parse(cookies.get('cities'))).length > 0 ? Object.values(JSON.parse(cookies.get('cities'))) : state.list;
            if (typeof cityName !== 'undefined' ) {
                const tempObject = { city: cityName, temp:(data.main.temp - 273.15).toFixed(2) }
                if(tempList === null) {
                    state.list = { tempObject };
                }else{
                    state.list = Object.values(tempList).filter(list => list.city !== cityName ) < Object.values(tempList)
                    ? tempList : { tempObject, ...tempList };
                }
            }else{
                state.list = null
            }
          },
        GET_LOADING_DATA_STATUS: (state, loading) => {
            state.LoadingCityData = loading;
        },
        ERROR: (state, data) => {
            state.error = data
        }

  }
  const getters = {
      getCityData: state => state.cityData,
      getCityName: state => state.cityName,
      getList: state => state.list,
      getLoadingDataStatus: state => state.LoadingCityData,
      getError: state => state.error

  }

  export default {
      state,
      actions,
      mutations,
      getters
  }