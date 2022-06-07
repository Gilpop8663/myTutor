import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);

  const profile = await client.tutorUser.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  //   console.log(profile);

  res.json({
    ok: true,
    profile,
  });

  return res.status(200).end();
}

export default withApiSession(withHandler("POST", handler));
