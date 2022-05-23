import requset from '../utils/request'
export class UserService {
  static async login(data: any): Promise<any> {
    return requset.post('/api/cov/auth/login', data)
  }
  static async getuserinfo(): Promise<any> {
    return requset.get('/api/user')
  }
  static async checkEmailType(params: any): Promise<any> {
    return requset.post('/api/cov/user/checkEmailType', params)
  }

  static async sendTemporaryPassword(params: any): Promise<any> {
    return requset.post('/api/cov/user/sendTemporaryPassword', params)
  }

  static async getActivatedAccountPassword(params: any): Promise<any> {
    return requset.post('/api/cov/user/getActivatedAccountPassword', params)
  }

  static async changePassword(params: any): Promise<any> {
    return requset.post('/api/cov/user/changePassword', params)
  }
}
