import Database from "src/lib/elisa/database";

export default class Db extends Database {
    protected getConfig() {
        return {
            host: 'localhost',
            user: 'root',
            port: 8889,
            password: 'root',
            database: 'nest_login'
        }
    }
}