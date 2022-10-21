import Entity from "src/lib/elisa/entity";

export default class UserEntity extends Entity {
    public id: number
    public name: string
    public email: string
    public password: string

    constructor(r: any) {
        super()
        this.id = parseInt(r.user_id)
        this.name = r.user_name
        this.email = r.user_email
        this.password = r.user_password
    }
}