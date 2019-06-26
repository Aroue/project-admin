import {zrServer} from '@/tools/servers';

export class deptApi {

  // 获取部门列表
  static getDeptList(data = {}) {
    return zrServer.connection('GET', '/dept/A01', data)
  }

  // 添加部门
  static addDept(data = {}) {
    return zrServer.connection('POST', '/dept/A02', data)
  }

  // 获取部门信息
  static getDept(data = {}) {
    return zrServer.connection('POST', '/dept/A04', data)
  }


  // 修改部门
  static editDept(data = {}) {
    return zrServer.connection('POST', '/dept/A03', data)
  }

  // 删除部门
  static deleteDept(data = {}) {
    return zrServer.connection('POST', '/dept/A05', data)
  }


}
