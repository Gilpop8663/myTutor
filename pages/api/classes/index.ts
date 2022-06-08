import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const saltRounds = 10;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.body, req.session.user);

  if (req.method === "GET") {
    const tutorClasses = await client?.tutorClass.findMany({});
    res.json({
      ok: true,
      tutorClasses,
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, price, summary, tag1, tag2, tag3 },
      session: { user },
    } = req;

    const tags = {
      tag1,
      tag2,
      tag3,
    };

    const tutorClass = await client?.tutorClass.create({
      data: {
        name,
        price: +price,
        summary,
        tag1,
        tag2,
        tag3,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      tutorClass,
    });
  }
  return res.status(200).end();
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
    isPrivate: true,
  })
);
