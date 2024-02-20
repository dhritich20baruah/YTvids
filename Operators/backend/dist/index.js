"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
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
app.listen(port, () => { console.log(`[server]: Server is running at port ${port}`); });
