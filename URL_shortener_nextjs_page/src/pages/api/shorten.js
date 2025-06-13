import dbConnect from "../../../lib/mongodb";
import Url from "../../../model/Url";
import { nanoid } from "nanoid";


export default async function handler(req, res) {
    dbConnect()
    if (req.method !== 'POST') return res.status(405).end();

    const { longUrl } = req.body;

    if (!longUrl) return res.status(400).json({ error: 'Missing longUrl' });

    const shortCode = nanoid(6);
    var shortUrl = new Url({ shortCode, longUrl })

    await shortUrl.save()

    res.status(200).json({ shortCode });
}