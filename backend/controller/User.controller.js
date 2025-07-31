import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Something required",
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

     const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

   
     return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User Created Successfull",
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Something required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not exist",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

   
     return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "login Successfull",
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req,res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success:true,
      message:"User logged Out successfully"
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success:false,
      message:error.message
    })
    
  }
}
