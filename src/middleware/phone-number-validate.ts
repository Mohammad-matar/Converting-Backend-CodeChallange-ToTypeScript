import { Request, Response, NextFunction, response } from "express";
import axios, { AxiosResponse } from "axios";

type User = {
  id: number;
  name: string;
  phoneNumber: number;
};
type ValidateNumber = {
  data: User[];
};
async function getUsers() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<ValidateNumber>(
      "https://reqres.in/api/users",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(JSON.stringify(data, null, 4));

    // 👇️ "response status is: 200"
    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

getUsers();
export default getUsers;
