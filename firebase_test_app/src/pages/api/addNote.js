import { db } from "../../../utils/firebaseConfig";
import { collection, addDoc, query, where, getDoc } from "firebase/firestore";

export default async function handler(req, res){
    if(req.method !== 'POST'){
        return res.status(405).json({message: "Method Not Allowed"})
    }

    const {note, uid} = req.body;

    try {
        await addDoc(collection(db, 'notes'), {
            note: note,
            uid: uid,
            createdAt: new Date()
        })
        res.status(200).json({ message: "Note Added"})
    } catch (error) {
        res.status(500).json({ message: "Error adding note"})
    }
}