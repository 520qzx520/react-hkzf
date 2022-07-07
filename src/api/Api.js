import requests from './requests';

const api = {
  //登录
  goLogin(params) {
    return requests.post(`/user/login`, params);
  },
  // 退出登录
  loginOut(data1, params) {
    return requests.post(`/user/logout`, data1, params);
  },
  // 得到用户信息
  getUSerData(params) {
    return requests.get(`/user`, params);
  },
  // 注册
  goRegister(params) {
    return requests.post(`/user/registered`, params);
  },
  //发送请求获取轮播图片
  getSwiper() {
    return requests.get('/home/swiper');
  },
  //获取 租房数据
  getGroups() {
    return requests.get('/home/groups', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      },
    });
  },
  // 获取咨询数据
  getConsult() {
    return requests.get('/home/news', {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0',
      },
    });
  },
  //获取城市房数信息
  getCityRooms(params) {
    return requests.get(`/area/map`, params);
  },
  //获取小区房源信息
  getHouseList(params) {
    return requests.get(`/houses`, params);
  },

  // 获取房屋查询条件
  getFilterData(params) {
    return requests.get(`/houses/condition`, params);
  },
  // 根据条件查询房屋所需要的各种数据
  getRoomsToSomeData(params) {
    return requests.get(`/houses`, params);
  },

  // 房屋详情信息
  getHouseDetail(id) {
    return requests.get(`/houses/${id}`);
  },
  // 一开始就检查是否收藏
  getFavorites(id, params) {
    return requests.get(`/user/favorites/${id}`, params);
  },
  // 添加收藏
  addFavorites(id) {
    return requests.post(`/user/favorites/${id}`);
  },
  // 删除收藏
  deleteFavorites(id) {
    return requests.delete(`/user/favorites/${id}`);
  },
  // 查看收藏列表
  getFavoritesList() {
    return requests.get(`/user/favorites`);
  },

  // 上传图片
  addImgToInt(form, headers) {
    return requests.post(`/houses/image`, form, headers);
  },

  // 搜索获取小区
  getForSearchHouse(name, id) {
    return requests.get(`/area/community`, name, id);
  },
  // 发布房源
  publishHouse(params) {
    return requests.post( `/user/houses`,params );
  },
  // 获取发布房源列表
  getPublishHouseList(){
    return requests.get(`/user/houses`)
  }
};

export default api;
