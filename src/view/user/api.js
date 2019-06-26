import {zrServer} from '@/tools/servers';

export class userApi {

  // 获取用户列表
  static getUserList(data = {}) {
    return zrServer.connection('POST', '/user/A01', data)
  }

  // 添加用户
  static addUser(data = {}) {
    return zrServer.connection('POST', '/user/A02', data)
  }

  // 获取用户信息
  static getUser(data = {}) {
    return zrServer.connection('POST', '/user/A03', data)
  }


  // 修改用户
  static editUser(data = {}) {
    return zrServer.connection('POST', '/user/A04', data)
  }

  // 删除用户
  static deleteUser(data = {}) {
    return zrServer.connection('POST', '/user/A05', data)
  }

  // 登陆
  static login(data = {}) {
    return zrServer.connection('POST', '/user/A06', data)
  }

  // 登陆
  static userExist(data = {}) {
    return zrServer.connection('POST', '/user/A07', data)
  }


}
