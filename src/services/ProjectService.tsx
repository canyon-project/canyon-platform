import requset from '../utils/request'

export class ProjectService {
  static async listProject(): Promise<any> {
    return requset.get('/api/cov/project')
  }
  static async retrieveAProject({ id }: any): Promise<any> {
    return requset.get(`/api/cov/project/${id}`)
  }
  static async deleteAProject({ id }: any): Promise<any> {
    return requset.delete(`/api/cov/project/${id}`)
  }
  static async updateAProject(params: any): Promise<any> {
    const id = params.id
    delete params.id
    return requset.patch(`/api/cov/project/${id}`, params)
  }
  static async createAProject(params: any): Promise<any> {
    return requset.post(`/api/cov/project`, params)
  }
}
