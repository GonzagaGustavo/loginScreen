import EntityFacade from '../../../lib/elisa/facade/entity';
import UserEntity from './entity';
import UserService from './service';

export default class UserFacade extends EntityFacade<UserEntity> {
  protected service(): UserService {
    return this._service as UserService;
  }
}
