const { Types } = require("mongoose");
const Teachers = require("../models/teacher");
const CustomError = require("../utils/custom-error");
const { createV, updateV, getByIdAndDeleteV, loginV } = require("../validation/teacher");


const create = async (req, res, next) => {
    try {
        const { fullName, phoneNumber, photoUrl, derectionId } = req.body;
        const error = await createV({ fullName, phoneNumber, photoUrl, derectionId });
        if (error) {
            // throw new CustomError(400, error.message);
            res.status(400).json({ error: error.message });
        }
        const findTeacher = await Teachers.findOne({ phoneNumber: phoneNumber });
        if (findTeacher) {
            // throw new CustomError(400, "Phone number already exists");
            res.status(400).json({ error: "Phone number already exists" });
        }
        const teacher = await Teachers.create({ fullName: fullName, phoneNumber: phoneNumber, photoUrl: photoUrl, derectionId: derectionId });
        res.status(201).json({ teacher });
    } catch (error) {
        next(error);
    }
};


const update = async (req, res, next) => {
    try {
        const { fullName, phoneNumber, photoUrl, derectionId } = req.body;
        const { id } = req.params;
        const error = await updateV({ id, fullName, phoneNumber, photoUrl, derectionId });
        if (error) {
            // throw new CustomError(400, error.message);
            res.status(400).json({ error: error.message });
        }
        const findTeacher = await Teachers.findOne({ _id: id });
        if (!findTeacher) {
            // throw new CustomError(404, "Teacher not found");
            res.status(404).json({ error: "Teacher not found" });
        }
        const teacher = await Teachers.update({ _id: id }, { fullName: fullName, phoneNumber: phoneNumber, photoUrl: photoUrl, derectionId: derectionId });
        res.status(201).json(teacher);
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
        const findTeacher = await Teachers.aggregate(
            [
                {
                    $match: { _id: new Types.ObjectId(id) },
                    $lookup: {
                        from: "Direction",
                        localField: "derectionId",
                        foreignField: "id",
                        as: "derection"
                    },
                    $project: {
                        _id: 1,
                        fullName: 1,
                        phoneNumber: 1,
                        photoUrl: 1,
                        derection: 1
                    }
                }
            ]
        );
        if (!findTeacher) {
            // throw new CustomError(404, "Teacher not found");
            res.status(404).json({ error: "Teacher not found" });
        }
        res.status(201).json({findTeacher});
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
            res.status(400).json({ error: error.message });
        }
        await Teachers.deleteOne({ _id: id });
        if (!findTeacher) {
            // throw new CustomError(404, "Teacher not found");
            res.status(404).json({ error: "Teacher not found" });
        }
        res.status(201).json({ message: "Teacher deleted" });
    } catch (error) {
        next(error);
    }
};



const getAll = async (req, res, next) => {
    try {
        const findTeacher = await Teachers.aggregate(
            [
                {
                    $lookup: {
                        from: "Direction",
                        localField: "derectionId",
                        foreignField: "id",
                        as: "derection"
                    },
                    $project: {
                        _id: 1,
                        fullName: 1,
                        phoneNumber: 1,
                        photoUrl: 1,
                        derection: 1
                    }
                }
            ]
        );
        res.status(201).json({findTeacher});
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