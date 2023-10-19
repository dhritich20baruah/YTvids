import mongoose, {Schema, Document, Model} from "mongoose";

type NotesType = Document & {
    title: string;
    note: string
}

const notesSchema: Schema<NotesType> = new Schema({
    title: String,
    note: String
})

const Note: Model<NotesType> = mongoose.model<NotesType>('Note', notesSchema);

export default Note