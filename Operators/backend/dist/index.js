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
const Users_1 = __importDefault(require("./models/Users"));
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
app.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, country, city, age, email, phone, company, height } = req.body;
        const newUser = new Users_1.default({
            name, country, city, age, email, phone, company, height
        });
        yield newUser.save();
        res.status(200).json({ status: 'OK User saved' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "User not saved" });
    }
}));
app.listen(port, () => { console.log(`[server]: Server is running at port ${port}`); });
