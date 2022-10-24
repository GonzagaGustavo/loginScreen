import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
  const json = {
    user: {
      email: req.query.email,
    },
  };
  const resultToken = await axios.post(
    `http://localhost:3001/auth/login/`,
    json
  );
  res.json(resultToken.data);
}
