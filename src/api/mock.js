import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'

Mock.mock('/home/getData', homeApi.getHomeData)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)
Mock.mock(/user\/deleteUser/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
