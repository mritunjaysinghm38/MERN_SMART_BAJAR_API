import { Address } from "../Models/address.js";


export const addAddress = async (req, res) => {
    let { fullName, address, city, state, country, pincode, phoneNumber } = req.body
    let userId = req.user
    let useraddress = await Address.create(
        {
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber,
        });
    res.json({ message: "Address Added", useraddress, success: true });
};





export const getAddress = async (req, res) => {
    let address = await Address.find({ userId: req.user }).sort({ createdAt: -1 })
    res.json({ message: 'address', userAddress: address[0] })
    
}






















