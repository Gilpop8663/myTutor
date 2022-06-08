import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone } = req.body;

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const exist = await client.tutorUser.findUnique({
    where: { phone: phone.toString() },
  });

  if (exist) {
    // 번호가 이미 있을 경우
    res.json({
      ok: false,
      message: "이미 회원가입 한 번호가 있습니다",
    });

    return res.status(200).end();
  }

  //   console.log(exist);

  if (!exist) {
    // DB에 회원 번호가 없을 경우
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: "82" + phone,
      body: `[Web발신][마이튜터] 인증번호[${payload}]를 입력해주세요.`,
    });

    const token = await client.tutorToken.create({
      data: {
        payload,
        phone,
      },
    });

    console.log(message, token);
  }

  res.json({
    ok: true,
    message: "인증번호를 정상적으로 보냈습니다",
  });
  return res.status(200).end();
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
