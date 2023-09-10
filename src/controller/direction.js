const { Types } = require("mongoose");
const Direction = require("../models/direction");
const CustomError = require("../utils/custom-error");
const { createV, updateV, getByIdAndDeleteV, loginV } = require("../validation/direction");


const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const error = await createV({ name });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ error: error.message });
        }
        const direction = await Direction.create({ name: name });
        res.status(201).json({ direction });
    } catch (error) {
        next(error);
    }
};


const update = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const error = await updateV({ id, name });
        if (error) {
            // throw new CustomError(400, error.message);
            return res.status(400).json({ error: error.message });
        }
        const findDirection = await Direction.findOne({ _id: id });
        if (!findDirection) {
            // throw new CustomError(404, "Direction not found");
            return res.status(404).json({ message: "Direction not found" });
        }
        const direction = await Direction.update({ _id: id }, { name: name });
        res.status(201).json({ direction });
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
        const findDirection = await Direction.aggregate(
            [
                {
                    $match: { _id: new Types.ObjectId(id) },
                    $project: {
                        _id: 1,
                        name: 1,
                    }
                }
            ]
        );
        if (!findDirection) {
            // throw new CustomError(404, "Direction not found");
            return res.status(404).json({ message: "Direction not found" });
        }
        res.status(201).json({ findDirection });
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
        await Direction.deleteOne({ _id: id });
        if (!findDirection) {
            // throw new CustomError(404, "Direction not found");
            return res.status(404).json({ message: "Direction not found" });
        }
        res.status(201).json({ message: "Direction deleted" });
    } catch (error) {
        next(error);
    }
};



const getAll = async (req, res, next) => {
    try {
        const findDirection = awaitDirection.aggregate(
            [
                {
                    $project: {
                        _id: 1,
                        name: 1
                    }
                }
            ]
        );
        res.status(201).json({ findDirection });
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