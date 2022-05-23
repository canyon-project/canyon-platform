import requset from '../utils/request'

export class RepoService {
  static async repoList(): Promise<any> {
    return requset.get('/api/repo')
  }
}
