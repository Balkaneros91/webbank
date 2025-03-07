import { Request, Response } from "express";
import { query } from "../helpers/query";
import { User } from "../interfaces";

export async function createUser(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    // create user
    await query(`INSERT INTO users (username, password) VALUES (?, ?)`, [
      username,
      password,
    ]);

    // fetch user
    const user = await query<User[]>(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);

    // create account
    await query(`INSERT INTO accounts (userId, balance) VALUES (?, ?)`, [
      user[0].id,
      350,
    ]);

    res.status(200).json({ message: `User created successfully!` });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
}

// app.post("/users", (req: Request, res: Response) => {
//   try {
//     // Take username, password from frontend
//     const { username, password } = req.body;

//     // Save new user
//     const newUser: User = {
//       id: generateOTP(),
//       username,
//       password,
//     };

//     users.push(newUser);

//     const newAccount: Account = {
//       id: generateOTP(),
//       userId: newUser.id,
//       balance: 100,
//     };

//     accounts.push(newAccount);

//     res.status(200).json({ user: newUser, account: newAccount });
//   } catch (error) {
//     res.status(500).send(`Error creating user profile`);
//   }
// });
