import NextAuth from "next-auth/next";
import { authOptions } from "@/app/authOptions";

const handler = (req, res) => NextAuth(req, res, authOptions)

module.exports = {
    GET:handler,
    POST:handler
}