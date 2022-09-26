import axios from "axios";
import express, { Request, Response, NextFunction, response } from "express";
import { isVariableDeclaration } from "typescript";
import getUsers from "../middleware/phone-number-validate";
// import { getAllJSDocTags } from "typescript";
// import axios, { AxiosResponse } from "axios";
// import jQueryStatic from "jquery";
// import { userInfo } from "os";
import User from "../Models/User";

interface Post {
  id: number;
  name: string;
  phoneNumber: number;
}

// getting all posts

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  // get some posts
  // let result: AxiosResponse = await axios.get(
  //   `https://jsonplaceholder.typicode.com/posts`
  // );

  // let posts: [Post] = result.data;
  // return res.status(200).json({
  //   message: posts,
  // });
  var users = await User.find({});

  res.status(200).json({
    message: "get all users successfully",
    data: users,
  });
};
// type ValidateNumber = {
//   name: string;
//   Address: string;
//   phoneNumber: number;
//   id: string;
//   createdAt: string;
// };

// async function getPosts() {
//   try {
//     // 👇️ const data: CreateUserResponse
//     const { data } = await axios.post<ValidateNumber>(
//       "https://reqres.in/api/users",
//       { name: "John Smith", job: "manager", phoneNumber: "+961728733" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );

//     // console.log(JSON.stringify(data, null, 4));

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("error message: ", error.message);
//       // 👇️ error: AxiosError<any, any>
//       return error.message;
//     } else {
//       console.log("unexpected error: ", error);
//       return "An unexpected error occurred";
//     }
//   }
// }
// getPosts();
/////////////////////////////////////////

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
    let body: string = req.body;

    const newUser = await User.create(body);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// type CreateUserResponse = {
//   name: string;
//   address: string;
//   phoneNumber: number;
//   id: string;
//   createdAt: string;
// };

// async function addPost() {
//   try {
//     // 👇️ const data: CreateUserResponse
//     const { data } = await axios.post<CreateUserResponse>(
//       "https://reqres.in/api/users",
//       { name: "John Smith", job: "manager", phoneNumber: 71728733 },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     );

//     // console.log(JSON.stringify(data, null, 4));

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("error message: ", error.message);
//       // 👇️ error: AxiosError<any, any>
//       return error.message;
//     } else {
//       console.log("unexpected error: ", error);
//       return "An unexpected error occurred";
//     }
//   }
// }
// addPost();

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // // get the post id from the req.params
  // let id: string = req.params.id;
  // get the data from req.body
  // let title: string = req.body.title ?? null;
  // let name: string = req.body.name ?? null;
  // let address: string = req.body.address ?? null;
  // let phoneNumber: string = req.body.phoneNumber ?? null;
  // // update the post
  // let response: AxiosResponse = await axios.put(
  //   `https://jsonplaceholder.typicode.com/posts/${id}`,
  // {
  //   ...(title && { title }),
  //   ...(body && { body }),
  //   ...(address && { address }),
  //   ...(phoneNumber && { phoneNumber }),
  // }
  // );
  // // return response
  // return res.status(200).json({
  //   message: response.data,
  // });
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
