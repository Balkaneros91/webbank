import { Request, Response } from "express";
import { query } from "../helpers/query";
import { Session, Account } from "../interfaces";

export async function getBalance(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    // Session
    const [session] = await query<Session[]>(
      `SELECT * FROM  sessions WHERE token = ?`,
      [token]
    );

    // Account with Balance
    const [accountUser] = await query<Account[]>(
      `SELECT * FROM accounts WHERE userId = ?`,
      [session.userId]
    );

    res.status(200).json({ balance: accountUser.balance });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
}

export async function sendTransaction(req: Request, res: Response) {
  try {
    // Authorization token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    // Session
    const [session] = await query<Session[]>(
      `SELECT * FROM sessions WHERE token = ?`,
      [token]
    );
    // Account with Balance
    const [accountUser] = await query<Account[]>(
      `SELECT * FROM accounts WHERE userId = ?`,
      [session.userId]
    );

    // Amount
    const { amount } = req.body;

    const newBalance = accountUser.balance + amount;

    console.log(newBalance);
    res.status(200).json({ message: newBalance });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error` });
  }
}

// app.post("/me/account", (req: Request, res: Response) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization?.replace("Bearer ", "");

//     const session = sessions.find((t) => t.token === token);
//     const accountUser = accounts.find((id) => id.userId === session?.userId);

//     if (session) {
//       if (session.userId !== accountUser?.userId) {
//         throw new Error(`Session ID invalid.`);
//       }
//     }
//     res.status(200).json({ balance: accountUser?.balance });
//   } catch (error) {
//     res.status(500).send(`Error ${error}`);
//   }
// });

// app.post("/me/account/transaction", (req: Request, res: Response) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization?.replace("Bearer ", "");

//     const session = sessions.find((t) => t.token === token);
//     console.log("SESSION", session);

//     const accountUser = accounts.find((id) => id.userId === session?.userId);
//     console.log("ACCOUNTS", accounts);
//     console.log("accountUser", accountUser);

//     const { amount } = req.body;

//     const newBalance = accountUser?.balance + amount;

//     accounts = accounts.map((account) =>
//       account.userId === accountUser?.userId
//         ? { ...account, balance: newBalance }
//         : account
//     );

//     console.log("RESULT", accounts);

//     res.status(200).json({ message: newBalance });
//   } catch (error) {
//     res.status(500).send(`Error`);
//   }
// });
