"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../helpers/constants");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"],
    },
    role: {
        type: String,
        enum: Object.values(constants_1.ROLES),
        default: constants_1.ROLES.user,
    },
    code: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id, code } = _a, user = __rest(_a, ["__v", "password", "_id", "code"]);
    return Object.assign({ id: _id }, user);
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
