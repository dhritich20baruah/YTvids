import {MongoClient} from "mongodb"
async function handler(req, res){
    if(req.method !== 'POST') return
    const {title, note} = req.body
    const done = "false"
    if(!title || !note) return

    const client = await MongoClient.connect('mongodb://localhost/nextJSCRUD')
    const db = client.db()
    const collection = db.collection('todo')
    const result = await collection.insertOne({title, note, done})
    client.close()
    res.status(201).json({
        todo: result,
        message: "To do created"
    })
}

export default handler