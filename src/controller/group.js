const { Types } = require("mongoose");
const Group = require("../models/group");
const CustomError = require("../utils/custom-error");
const { createV, updateV, getByIdAndDeleteV, loginV } = require("../validation/group");


const create = async (req, res, next) => {
    try {
        const { derectionId, teacherId, lessonDay, lessonDate } = req.body;
        const error = await createV({ derectionId, teacherId, lessonDay, lessonDate });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ error: error.message });
        }
        const group = await Group.create({ derectionId: derectionId, teacherId: teacherId, lessonDay: lessonDay, lessonDate: lessonDate });
        res.status(201).json({ group });
    } catch (error) {
        next(error);
    }
};


const update = async (req, res, next) => {
    try {
        const { derectionId, teacherId, lessonDay, lessonDate } = req.body;
        const { id } = req.params;
        const error = await updateV({ id, derectionId, teacherId, lessonDay, lessonDate });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ error: error.message });
        }
        const findGroup = await Group.findOne({ _id: id });
        if (!findGroup) {
            // throw new CustomError(404, "Group not found");
            return res.status(404).json({ error: "Group not found" });
        }
        const group = await Group.update({ _id: id }, { derectionId: derectionId, teacherId: teacherId, lessonDay: lessonDay, lessonDate: lessonDate });
        res.status(201).json({group});
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
            return res.status(400).json({ error: error.message });
        }
        const findGroup = await Group.aggregate(
            [
                {
                    $match: { _id: new Types.ObjectId(id) },
                    $lookup: {
                        from: "Direction",
                        localField: "derectionId",
                        foreignField: "id",
                        as: "derection"
                    },
                    $lookup: {
                        from: "Teacher",
                        localField: "teacherId",
                        foreignField: "id",
                        as: "derection"
                    },
                    $project: {
                        _id: 1,
                        direction: 1,
                        teacher: 1,
                        lessonDay: 1,
                        lessonDate: 1
                    }
                }
            ]
        );
        if (!findGroup) {
            // throw new CustomError(404, "Group not found");
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(201).json({findGroup});
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
            return res.status(400).json({ error: error.message });
        }
        await Group.deleteOne({ _id: id });
        if (!findGroup) {
            // throw new CustomError(404, "Group not found");
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(201).json({ message: "Group deleted" });
    } catch (error) {
        next(error);
    }
};



const getAll = async (req, res, next) => {
    try {
        const findGroup = awaitGroup.aggregate(
            [
                {
                    $lookup: {
                        from: "Direction",
                        localField: "derectionId",
                        foreignField: "id",
                        as: "derection"
                    },
                    $lookup: {
                        from: "Teacher",
                        localField: "teacherId",
                        foreignField: "id",
                        as: "derection"
                    },
                    $project: {
                        _id: 1,
                        direction: 1,
                        teacher: 1,
                        lessonDay: 1,
                        lessonDate: 1
                    }
                }
            ]
        );
        res.status(201).json({findGroup});
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