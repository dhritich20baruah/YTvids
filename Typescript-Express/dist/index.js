"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Notes_1 = __importDefault(require("./models/Notes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://0.0.0.0:27017/typeExpress')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
app.get('/', (req, res) => {
    res.send('Express and Typescript server and will use mongodb');
});
app.post('/newNote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, note } = req.body;
        const newNote = new Notes_1.default({
            title, note
        });
        yield newNote.save();
        res.status(200).json({ status: 'OK Note saved' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Note not saved" });
    }
}));
app.get('/getNotes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Notes_1.default.find({});
        res.status(200).json({ notes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Notes not found" });
    }
}));
app.listen(port, () => { console.log(`[server]: Server is running at port ${port}`); });
