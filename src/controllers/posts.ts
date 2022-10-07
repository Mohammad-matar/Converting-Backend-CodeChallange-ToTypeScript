import axios, { AxiosResponse } from "axios";
import express, { Request, Response, NextFunction, response } from "express";
import { isVariableDeclaration } from "typescript";
import getUsers from "../middleware/phone-number-validate";

import User from "../Models/User";

interface Post {
  id: number;
  name: string;
  phoneNumber: number;
}

// getting all posts

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  var users = await User.find({});
  res.status(200).json({
    message: "get all users successfully",
    data: users,
  });
};

// getting a single post by id
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  let id: string = req.params.id;

  var users = await User.findOne({ id });

  res.status(200).json({
    message: "get one users successfully",
    data: users,
  });
};

// adding a post

const addPost = async (req: Request, res: Response) => {
  try {
    let body: any = req.body;

    // get the post
    let result: AxiosResponse = await axios.get(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&phone=+${body?.phoneNumber}`
    );

    console.log(result.data.valid);

    if (result.data.valid) {
      const newUser = await User.create(body);
      var response = res.status(200).json({
        message: "the user is added sucessfully",
        data: newUser,
      });
      return response;
    } else {
      var response = res.status(400).json({
        message: "the number is unvalid",
      });
      return response;
    }
  } catch (error) {
    // res.status(500).send(error);
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id);
  try {
    const UpdateUser: string = req.body;

    const newUser = await User.create(UpdateUser);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e);
  }
};

// deleting a post
const deletePost = async (req: Request, res: Response) => {
  let { id } = req.params;
  User.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
    var response = res.status(200).json({
      message: "deleted successfully",
    });
    return response;
  });
};
export default { getPosts, getPost, updatePost, deletePost, addPost };
