import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nickname } = req.body;

  //   console.log(nickname);

  const exist = await client.tutorUser.findUnique({
    // 닉네임 중복 확인
    where: { nickname },
  });

  if (exist) {
    res.json({
      ok: false,
      message: "이미 사용중인 닉네임이 있습니다",
    });

    return res.status(200).end();
  }

  res.json({
    ok: true,
    message: "사용 가능한 닉네임 입니다",
  });

  return res.status(200).end();
}

export default withHandler({ method: "POST", handler, isPrivate: false });
