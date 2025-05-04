// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"
import Job from "../../model/Job"
const key = process.env.MONGO_URI

export default async function handler(req, res) {
  if (req.method !== 'GET'){
    return res.status(405).end()
  }

  await mongoose.connect(key).then(()=> console.log('DB connected'))

  try {
    const jobs = await Job.find().sort({ createdAt: 'desc'});    
    res.status(200).json(jobs)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch'})
  }
}
