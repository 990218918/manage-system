/**
 * 整个项目api管理
 */
import request from "./request";

export default {
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true,
        })
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true,
        })
    },
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
            mock: true,
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUser',
            method: 'get',
            mock: false,
            data: params,
        })
    },
    addUser(params) {
        return request({
            url: '/user/addUser',
            method: 'post',
            mock: false,
            data: params,
        })
    },
    editUser(params) {
        return request({
            url: '/user/editUser',
            method: 'post',
            mock: false,
            data: params,
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/deleteUser',
            method: 'get',
            mock: false,
            data: params,
        })
    },
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            mock: false,
            data: params,
        })
    }
}