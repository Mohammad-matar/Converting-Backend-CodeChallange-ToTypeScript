"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { getAllJSDocTags } from "typescript";
// import axios, { AxiosResponse } from "axios";
// import jQueryStatic from "jquery";
// import { userInfo } from "os";
const User_1 = __importDefault(require("../Models/User"));
// getting all posts
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get some posts
    // let result: AxiosResponse = await axios.get(
    //   `https://jsonplaceholder.typicode.com/posts`
    // );
    // let posts: [Post] = result.data;
    // return res.status(200).json({
    //   message: posts,
    // });
    var users = yield User_1.default.find({});
    res.status(200).json({
        message: "get all users successfully",
        data: users,
    });
});
// getting a single post by id
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // // get the post id from the req
    let id = req.params.id;
    // // get the post
    // let result: AxiosResponse = await axios.get(
    //   `https://jsonplaceholder.typicode.com/posts/${id}`
    // );
    // let post: Post = result.data;
    // return res.status(200).json({
    //   message: post,
    // });
    var users = yield User_1.default.findOne({ id });
    res.status(200).json({
        message: "get one users successfully",
        data: users,
    });
});
// adding a post
// const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     try {
//         let body = req.body;
//         const newUser = yield User_1.default.create(body);
//         res.status(201).json(newUser);

//     }
//     catch (error) {
//         res.status(500).send(error);
//     }
// });
const addUser = async (req, res, next) => {
    let body = req.body;
    try {
        const response = await validations.validateNumber(body.phone_number);
        if (response.status === 200) {
            let doc = new User(body);
            doc.save((err, response) => {
                if (err) return next(err);
                if (response === null) {
                    res
                        .status(404)
                        .send({ success: false, message: "User is not found" });
                }
                res
                    .status(200)
                    .send({ success: true, message: "Get User Successfully", response });
            });
        } else if (response.status === 400) {
            res
                .status(400)
                .send({ success: false, message: "phone number is invalid" });
            console.log(response)
        }
    }

    catch (err) {
        res
            .status(401)
            .send({ success: false, error: err });
    }
}

validate(req, res, next) {
    let { number } = req.params;
    const response = validations.validateNumber(number);
    console.log(response);
    res.send(response);
};


// updating a post
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const id = parseInt(req.params.id);
    try {
        const UpdateUser = req.body;
        const newUser = yield User_1.default.create(UpdateUser);
        res.status(201).json(newUser);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
// deleting a post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    User_1.default.deleteOne({ _id: id }, function (err) {
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
});
exports.default = { getPosts, getPost, updatePost, deletePost, addPost };
