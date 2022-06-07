import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

const saltRounds = 10;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.json({
    ok: true,
  });

  return res.status(200).end();
}

export default withHandler({
  method: "POST",
  handler,
  isPrivate: true,
});
