import { db } from "../../../utils/firebaseConfig";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export default async function handle(req, res){
    if(req.method !== 'PUT'){
        return res.status(405).json({message: 'Method not allowed'})
    }

    const { id, note } = req.body;

    try {
        const noteRef = doc(db, 'notes', id);
        await updateDoc(noteRef, {
            note: note.trim(),
            updatedAt: Timestamp.now()
        });
        res.status(200).json({message: 'Note updated successfully'});
    } catch (error) {
        console.error("Error updating note", error);
        res.status(500).json({message: "Internal Server error"});
    }
}