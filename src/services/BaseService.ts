import requset from '../utils/request'

export class BaseService {
    static async getBaseInfo(): Promise<any> {
        return requset.get('/api/base')
    }
}
