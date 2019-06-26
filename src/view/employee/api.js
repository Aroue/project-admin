import {zrServer} from '@/tools/servers';

export class employeeApi {

  // 获取员工列表
  static getEmployeeList(data = {}) {
    return zrServer.connection('POST', '/employee/A01', data)
  }

  // 添加员工
  static addEmployee(data = {}) {
    return zrServer.connection('POST', '/employee/A02', data)
  }

  // 获取员工信息
  static getEmployee(data = {}) {
    return zrServer.connection('POST', '/employee/A03', data)
  }


  // 修改员工
  static editEmployee(data = {}) {
    return zrServer.connection('POST', '/employee/A04', data)
  }

  // 删除员工
  static deleteEmployee(data = {}) {
    return zrServer.connection('POST', '/employee/A05', data)
  }

}
