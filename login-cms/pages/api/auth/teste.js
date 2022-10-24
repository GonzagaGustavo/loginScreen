import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req, res) {
    const json = {
        email: req.query.email
    }
    const resultToken = await axios.get(`http://localhost:3001/user/user/email/${json.email}`)
    res.json(resultToken.data)
}