import requset from '../utils/request'

export class TemplateService {
  static async listTemplate(): Promise<any> {
    return requset.get('/api/cov/code-house')
  }
  static async retrieveATemplate({ id }: any): Promise<any> {
    return requset.get(`/api/cov/code-house/${id}`)
  }
  static async deleteATemplate({ id }: any): Promise<any> {
    return requset.delete(`/api/cov/code-house/${id}`)
  }
  static async updateATemplate(params: any): Promise<any> {
    const id = params.id
    delete params.id
    return requset.patch(`/api/cov/code-house/${id}`, params)
  }
}
