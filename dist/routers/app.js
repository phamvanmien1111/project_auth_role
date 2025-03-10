"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupRoutes;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
function setupRoutes(app) {
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json());
    app.use("/api/auth", auth_routes_1.default);
}
