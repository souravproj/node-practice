import { usersMoodel } from "../../models/auth.model.js";
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import bcrypt from 'bcrypt'


env.config()



const createToken = (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

const encryptPassword = async (password) => {
    try {
        const salt = 10;
        const BcryptPass = await bcrypt.hash(password, salt);
        return BcryptPass
    } catch (error) {
        console.log(error)
    }
}


const bcryptPass = async (Currentpassword, storePassword) => {
    try {

    } catch (error) {
        console.log(error)
    }

}


export const userRegister = async (req, res, next) => {
    try {

        //receive all data from body

        const { name, email, password } = req.body;
        const isRegistered = await usersMoodel.findOne({ email });
        //check exist email or not
        if (isRegistered) {
            return res.status(404).json({ status: "fail", message: "user already registered" });
        }
        //encrypt password
        const encryptedPass = await encryptPassword(password)
        console.log("BcryptPass", encryptedPass)

        //create user

        const newUser = await usersMoodel.create({
            name, email, password: encryptedPass
        })
        const token = createToken(newUser.id)

        newUser.password = undefined;

        return res.status(200).json({ status: "successs", message: "user registered successfully", token, newUser })

    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const isValidEmail = await usersMoodel.findOne({ email }).select("+password");

        if (!isValidEmail) {
            return res.status(404).json({ message: "enter a registered email id" })
        }

        console.log("isValidEmail", isValidEmail)
        const isPasswordMatch = await bcrypt.compare(password, isValidEmail.password);

        if (!isPasswordMatch) {
            return res.status(500).json({ message: "invalid password" })
        }
        const token = createToken(isValidEmail._id);
        return res.status(200).json({ message: "loggedin successfull", token })

    } catch (error) {
        console.log(error)
    }
}

export const Protect = async (req, res, next) => {
    try {
        // 1) check if the token is there

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            return res.status(401).json({ message: "you are not logged in!, please login to continue" })
        }
        // 2) Verify token

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);

        // 3) check if the user is exist (not deleted)

        const User = await usersMoodel.findById(decode.id);
        console.log("user", User)
        if (!User) {
            return res.status(401).json({ message: "you are not logged in, please log in to continue!" })
        }

        req.User = User;
        next();
    } catch (error) {
        console.log(error)
    }
}