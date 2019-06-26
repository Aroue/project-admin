import {zrServer} from '@/tools/servers';

export class noticeApi {

  // 获取公告列表
  static getNoticeList(data = {}) {
    return zrServer.connection('GET', '/notice/A01', data)
  }

  // 添加公告
  static addNotice(data = {}) {
    return zrServer.connection('POST', '/notice/A02', data)
  }

  // 获取公告信息
  static getNotice(data = {}) {
    return zrServer.connection('POST', '/notice/A03', data)
  }


  // 修改公告
  static editNotice(data = {}) {
    return zrServer.connection('POST', '/notice/A04', data)
  }

  // 删除公告
  static deleteNotice(data = {}) {
    return zrServer.connection('POST', '/notice/A05', data)
  }


}
