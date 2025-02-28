"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./src/config/db")); 
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./src/routers/app")); 
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, app_1.default)(app);
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
