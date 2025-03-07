import { Request, Response } from "express";
import { query } from "../helpers/query";
import { User } from "../interfaces";
import { generateOTP } from "../helpers/generate_otp";

export async function createSession(req: Request, res: Response) {
  const { username, password } = req.body;
  const token = generateOTP();
  try {
    const [user] = await query<User[]>(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    // if [user] than user without [0], OR if 'user' than user[0]

    if (!user) {
      res.status(404).json({ message: `User not found` });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: `Invalid username or password.` });
      return;
    }

    await query(`INSERT INTO sessions (userId, token) VALUES (?, ?)`, [
      user.id,
      token,
    ]);

    const newSession = { token };

    res
      .status(200)
      .json({ message: `Session created successfully!`, newSession });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
}

// app.post("/sessions", (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = users.find((user) => user.username === username);

//     console.log("USERS", users);

//     if (existingUser) {
//       if (existingUser.password !== password) {
//         throw new Error(`Wrong password!`);
//       }

//       const newSession: Session = {
//         userId: existingUser.id,
//         token: generateOTP(),
//       };

//       sessions.push(newSession);
//       console.log(sessions);
//       res.status(200).json({ newSession });
//     } else {
//       throw new Error(`User not found.`);
//     }
//   } catch (error) {
//     res.status(500).send(`${error}`);
//   }
// });
