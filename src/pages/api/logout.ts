import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

// Get our environment variables
const { COOKIE_NAME } = process.env;

export default async (_: NextApiRequest, res: NextApiResponse) => {
	// remove cookie from request header
	res.setHeader("Set-Cookie", [
		serialize(COOKIE_NAME, "", {
			maxAge: -1,
			path: "/",
		}),
	]);

	res.writeHead(302, { Location: "/" });
	res.end();
};