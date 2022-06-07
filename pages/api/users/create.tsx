import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

const saltRounds = 10;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { nickname, phone, email, password, avatar, token } = req.body;

  const foundToken = await client.tutorToken.findFirst({
    // 인증번호 토큰 확인
    where: {
      phone,
      payload: token.toString(),
    },
  });

  if (!foundToken) {
    res.json({
      ok: false,
      message: "인증번호가 잘못되었습니다",
    });

    return res.status(200).end();
  }

  const salt = await bcrypt.genSalt(saltRounds); // salt 생성

  const hashedPW = await bcrypt.hash(password, salt);

  const user = await client.tutorUser.create({
    data: {
      nickname,
      phone,
      email,
      password: hashedPW,
      avatar,
    },
  });

  console.log(user);

  await client.tutorToken.delete({
    where: {
      phone: phone,
    },
  });

  res.json({
    ok: true,
    message: "회원가입이 완료되었습니다",
  });
  return res.status(200).end();
}

export default withHandler("POST", handler);
