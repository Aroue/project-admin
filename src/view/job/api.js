import {zrServer} from '@/tools/servers';

export class jobApi {

  // 获取职位列表
  static getJobList(data = {}) {
    return zrServer.connection('GET', '/job/A01', data)
  }

  // 添加职位
  static addJob(data = {}) {
    return zrServer.connection('POST', '/job/A02', data)
  }

  // 获取职位信息
  static getJob(data = {}) {
    return zrServer.connection('POST', '/job/A04', data)
  }

  // 修改职位
  static editJob(data = {}) {
    return zrServer.connection('POST', '/job/A03', data)
  }

  // 删除职位
  static deleteJob(data = {}) {
    return zrServer.connection('POST', '/job/A05', data)
  }

}
