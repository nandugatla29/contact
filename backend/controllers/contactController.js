const jwt = require('jsonwebtoken');
const Contacts = require('../models/Contacts');

exports.addContact = async (req, res) => {
    try {
        const { name, email, phonenumber } = req.body;
        const contact = await Contacts.create({ 
            userId: req.user.id,name, email, phonenumber });
        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            contact
        });
    } catch (error) {

    console.log(error);

    if(error.code === 11000){

        return res.status(400).json({
            success:false,
            message:"Email or phone already exists"
        });
    }

    res.status(500).json({
        success:false,
        message:error.message
    });
}
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find({ userId: req.user.id });
        res.status(200).json({
            success: true,
            message: "Contacts retrieved successfully",
            contacts
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contacts.findByIdAndDelete({ _id: id, userId: req.user.id });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
