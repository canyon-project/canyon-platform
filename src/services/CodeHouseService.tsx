import requset from '../utils/request'

export class CodeHouseService {
  static async listCodeHouse(): Promise<any> {
    return requset.get('/api/cov/code-house')
  }
  static async retrieveACodeHouse({ id }: any): Promise<any> {
    return requset.get(`/api/cov/code-house/${id}`)
  }
  static async deleteACodeHouse({ id }: any): Promise<any> {
    return requset.delete(`/api/cov/code-house/${id}`)
  }
  static async updateACodeHouse(params: any): Promise<any> {
    const id = params.id
    delete params.id
    return requset.patch(`/api/cov/code-house/${id}`, params)
  }
  static async createACodeHouse(params: any): Promise<any> {
    return requset.post(`/api/cov/code-house`, params)
  }
}
