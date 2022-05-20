import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

export const listOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate({path: 'postId', select: 'title'})
        res.json({ data: orders});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        res.status(200).json({data: order});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addOrder = async (req, res) => {
    const order = req.body;
    const newOrder = new Order({ ...order })
    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const editOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, offerBanque, postId } = req.body;
        const editOrder = { name, phone, offerBanque, postId, _id: id };
        await Order.findByIdAndUpdate(id, editOrder, { new: true });
        res.json(editOrder);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }   
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: "Order Deleted"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }   
}

