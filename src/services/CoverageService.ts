import requset from '../utils/request'

export class CoverageService {
  // 列出分支commit覆盖率
  static async listCoverageCommit(data: any): Promise<any> {
    return requset.get(`/api/repo/${data.id}/commit`, data)
  }


  // 以下无效
  static async listCoverageProjects(data: any): Promise<any> {
    return requset.get('/api/cov/Project/projects', data)
  }
  static async listCoverageProjectsByCommitSha(data: any): Promise<any> {
    return requset.get(`/api/cov/coverage/projects/${data.commitSha}`)
  }


  static async triggerCoverage(data: any): Promise<any> {
    return requset.post(`/api/cov/coverage/trigger`,data)
  }

  static async listCoverageByCommit(data: any): Promise<any> {
    return requset.get(`/api/cov/coverage/commit`,{params:data})
  }

  static async retrieveACoverageForAProjectService(data: any): Promise<any> {
    return requset.get('/api/coverage/retrieveACoverageForAProjectService', {params:data})
  }

  static async fileContent(data: any): Promise<any> {
    return requset.get(`/api/coverage/filecontent`,{params:data})
  }



  // 自动生成

  static async listCoverage(): Promise<any> {
    return requset.get("/api/cov/coverage")
  }
  static async retrieveACoverage({ id }: any): Promise<any> {
    return requset.get(`/api/cov/coverage/${id}`)
  }
  static async deleteACoverage({ id }: any): Promise<any> {
    return requset.delete(`/api/cov/coverage/${id}`)
  }
  static async updateACoverage(params: any): Promise<any> {
    const id = params.id
    delete params.id
    return requset.patch(`/api/cov/coverage/${id}`,params)
  }
}
