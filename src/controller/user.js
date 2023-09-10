const { Types } = require("mongoose");
const User = require("../models/user");
const CustomError = require("../utils/custom-error");
const { signToken } = require("../utils/jwt");
const { createV, updateV, getByIdAndDeleteV, loginV } = require("../validation/user");
const bcrypt = require("bcrypt");


const create = async (req, res, next) => {
    try {
        const { fullName, parents, phoneNumber, photoUrl, derectionId, active } = req.body;
        const error = await createV({ fullName, parents, phoneNumber, photoUrl, derectionId, active });
        if (error) {
            // throw new CustomError(400, error.message);
            res.status(400).json({ error: error.message });
        }
        const findUser = await User.findOne({
            phoneNumber: phoneNumber
        });
        if (findUser) {
            // throw new CustomError(400, "Phone number already exists");
            res.status(400).json({ error: "Phone number already exists" });
        }
        const newPass = await bcrypt.hash(password, 12);
        const user = await User.create({ fullName: fullName, password: newPass, phoneNumber: phoneNumber, photoUrl: photoUrl });
        const token = signToken({ phoneNumber: phoneNumber })
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
};


const update = async (req, res, next) => {
    try {
        const { fullName, parents, phoneNumber, derectionId, active, photoUrl } = req.body;
        const { id } = req.params;
        const error = await updateV({ id, fullName, parents, phoneNumber, photoUrl, derectionId, active });
        if (error) {
            // throw new CustomError(400, error.message);
            res.status(400).json({ error: error.message });
        }
        const findUser = await User.findOne({ where: { id: id } });
        if (!findUser) {
            // throw new CustomError(404, "User not found");
            res.status(404).json({ error: "User not found" });
        }
        const newPass = await bcrypt.hash(password, 12);
        const user = await User.update({ _id: id }, { fullName: fullName, password: newPass, phoneNumber: phoneNumber, photoUrl: photoUrl });
        const token = signToken({ phoneNumber })
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
};


const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const error = await getByIdAndDeleteV({ id });
        if (error) {
            // throw new CustomError(400, error.message);
            res.status(400).json({ error: error.message });
        }
        const findUser = await User.aggregate({
            $match: { _id: new Types.ObjectId(id) },
            $project: {
                _id: 1,
                fullName: 1,
                phoneNumber: 1,
                photoUrl: 1
            }
        });
        if (!findUser) {
            // throw new CustomError(404, "User not found");
            res.status(400).json({ message: "User not found" });

        }
        res.status(201).json({ findUser });
    } catch (error) {
        next(error);
    }
};
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const error = await getByIdAndDeleteV({ id });
        if (error) {
            throw new CustomError(400, error.message);
        }
        await User.remove(id);
        if (!findUser) {
            // throw new CustomError(404, "User not found");
            res.status(400).json({
                message: "User not found"
            });

        }
        res.status(201).json({ message: "User deleted" });
    } catch (error) {
        next(error);
    }
};



const getAll = async (req, res, next) => {
    try {
        const findUser = await User.aggregate({
            $project: {
                _id: 1,
                fullName: 1,
                phoneNumber: 1,
                photoUrl: 1
            }
        });
        res.status(201).json({findUser});
    } catch (error) {
        next(error);
    }
};


module.exports = {
    create,
    update,
    getById,
    remove,
    getAll,
};