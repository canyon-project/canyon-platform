import requset from '../utils/request'

export class CoverageService {
  // 列出分支commit覆盖率
  static async repoCoverage(data: any): Promise<any> {
    return requset.get(`/api/repo/${data.id}/coverage`, data)
  }

  static async retrieveACoverageForAProjectService(data: any): Promise<any> {
    return requset.get('/api/coverage/retrieveACoverageForAProjectService', {params:data})
  }

  static async repoSummary(data: any): Promise<any> {
    return requset.get(`/api/repo/${data.id}/summary`)
  }
  static async fileContent(data: any): Promise<any> {
    return requset.get(`/api/coverage/filecontent`, { params: data })
  }
  static async deleteACoverage({ id }: any): Promise<any> {
    return requset.delete(`/api/cov/coverage/${id}`)
  }
  static async updateACoverage(params: any): Promise<any> {
    const id = params.id
    delete params.id
    return requset.patch(`/api/cov/coverage/${id}`, params)
  }
}
