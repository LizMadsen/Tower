import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async updateProfile(update){
    try {
      const res = await api.put('/account', update)
      AppState.account = res.data 
      this.getAccount()
    } catch (error) {
      logger.error('Cannot update profile', 'error')
    }
  }
}

export const accountService = new AccountService()
