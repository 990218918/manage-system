/**
 * 环境配置文件
 * 开发环境
 * 测试环境
 * 线上环境
 */
// 当前环境（默认线上）
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    // 开发环境
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/ca06999c99d302b7dc04e1b72f7fccba/api',
    },
    // 测试环境
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/ca06999c99d302b7dc04e1b72f7fccba/api',
    },
    // 开发环境
    pro: {
        baseApi: '//pro.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/ca06999c99d302b7dc04e1b72f7fccba/api',
    },
}

export default {
    env,
    // mock的总开关
    mock: true,
    ...EnvConfig[env]
}