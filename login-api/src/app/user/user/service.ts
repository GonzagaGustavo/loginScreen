import axios from 'axios';
import SQL, { SQLStatement } from 'sql-template-strings';
import database from 'src/lib/elisa/database';
import EntityService, {
  Config,
  EntityFilter,
} from 'src/lib/elisa/service/entity';
import UserEntity from './entity';

export default class UserService extends EntityService<UserEntity> {
  protected lineToObject(r: any): UserEntity {
    return new UserEntity(r);
  }

  async save(
    db: database,
    dto: UserEntity,
    filter: EntityFilter,
  ): Promise<number> {
    console.log('UserService.save()', dto);

    let query: SQLStatement;
    if (!dto.id) {
      query = SQL`INSERT INTO user (name, email, password) VALUES ('${dto.name}', '${dto.email}', '${dto.password}')`;
    } else {
      const obj = this.findOne(db, filter);
      if (!obj) throw 'Update not allowed';

      query = SQL`UPDATE user SET name = '${dto.name}', email = '${dto.email}' WHERE id=${dto.id}`;
    }
    console.log(query.text, query.values);

    const { insertId, err } = await db.execute(query);

    if (err) throw err;

    return dto.id ? dto.id : insertId;
  }

  config(suffix = ''): Config {
    const table = 'user';
    const alias = 'user';

    const columns = [
      `${alias}${suffix}.id       AS ${alias}_id${suffix}`,
      `${alias}${suffix}.name       AS ${alias}_name${suffix}`,
      `${alias}${suffix}.email       AS ${alias}_email${suffix}`,
    ];

    const searchColumns = [`${alias}.id`, `${alias}.name`];
    const joins = [];
    const order = {
      id: `${alias}.id`,
      name: `${alias}.name`,
    };

    const extraColumns = [];

    // extra join
    const extraJoins = [];

    // config
    return {
      table,
      alias,
      columns,
      searchColumns,
      joins,
      order,
      extra: {
        columns: extraColumns,
        joins: extraJoins,
      },
    };
  }
}
