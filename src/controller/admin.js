const { Types } = require("mongoose");
const Admins = require("../models/admin");
const CustomError = require("../utils/custom-error");
const { signToken } = require("../utils/jwt");
const { createV, updateV, getByIdAndDeleteV, loginV } = require("../validation/admin");
const bcrypt = require("bcrypt");


const
    create = async (req, res, next) => {
        try {
            const { fullName, password, phoneNumber, photoUrl } = req.body;
            const error = await createV({ fullName, password, phoneNumber });
            if (error) {
                // throw new CustomError(400, error.message);
                return res.status(400).json({ message: error.message });
            }
            const findAdmin = await Admins.findOne({
                phoneNumber: phoneNumber
            });
            if (findAdmin) {
                // throw new CustomError(400, "Phone number already exists");
                return res.status(400).json({ message: "Phone number already exists" });
            }
            const newPass = await bcrypt.hash(password, 12);
            const admin = await Admins.create({ fullName: fullName, password: newPass, phoneNumber: phoneNumber, photoUrl: photoUrl });
            const token = signToken({ phoneNumber: phoneNumber })
            res.status(201).json({ admin, token });
        } catch (error) {
            console.log(error);
            next(error.message);
        }
    };


const update = async (req, res, next) => {
    try {
        const { fullName, password, phoneNumber, photoUrl } = req.body;
        const { id } = req.params;
        const error = await updateV({ id, fullName, password, phoneNumber });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ message: error.message });
        }
        const findAdmin = await Admins.findOne({ _id: id });
        if (!findAdmin) {
            // throw new CustomError(404, "Admin not found");
            return res.status(404).json({ message: "Admin not found" });
        }
        const newPass = await bcrypt.hash(password, 12);
        await Admins.updateOne({ _id: id }, { fullName: fullName, password: newPass, phoneNumber: phoneNumber, photoUrl: photoUrl });
        const token = signToken({ phoneNumber })
        res.status(201).json({ token });
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
            return res.status(400).json({ message: error.message });
        }
        const findAdmin = await Admins.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    phoneNumber: 1,
                    photoUrl: 1
                }
            }
        ]);
        if (!findAdmin[0]) {
            // throw new CustomError(404, "Admin not found");
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(201).json(findAdmin);
    } catch (error) {
        next(error);
    }
};
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const error = await getByIdAndDeleteV({ id });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ message: error.message });
        }
        await Admins.deleteOne({ _id: id });
        res.status(201).json({ message: "Admin deleted" });
    } catch (error) {
        next(error);
    }
};



const getAll = async (req, res, next) => {
    try {
        const findAdmin = await Admins.aggregate([
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    phoneNumber: 1,
                    photoUrl: 1
                }
            }
        ]);
        res.status(201).json(findAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const { password, phoneNumber } = req.body;
        const error = await loginV({ password, phoneNumber });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ message: error.message });
        }
        const findAdmin = await Admins.findOne({ phoneNumber: phoneNumber });
        console.log(findAdmin);
        if (!findAdmin) {
            // throw new CustomError(404, "Invalid phone number");
            return res.status(404).json({ message: "Invalid phone number" });
        }
        const compare = await bcrypt.compare(password, findAdmin.password);
        if (!compare) {
            // throw new CustomError(400, "Invalid password");
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = signToken({ phoneNumber });
        res.status(201).json({ token });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};


module.exports = {
    create,
    update,
    getById,
    remove,
    getAll,
    login,
};