import { db } from "../../../utils/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export default async function handler (req, res){
      if(req.method !== 'DELETE'){
        return res.status(405).json({message: 'Method not allowed'})
    }

    const {id} = req.query;
    try {
        const noteRef = doc(db, 'notes', id);
        await deleteDoc(noteRef);
        res.status(200).json({message: "note deleted successfully"});
    } catch (error) {
        console.error("Error deleting note: ", error);
        res.status(500).json({message: "error in deletion"})
    }
}