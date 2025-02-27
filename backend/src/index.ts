import express, { Response, Request } from "express";
import cors from "cors";

const PORT = 3000;

type Users = {
  id: string;
  username: string;
  password: string;
};
type Accounts = {
  id: string;
  userId: string;
  balance: number;
};
type Sessions = {
  userId: string;
  token: string;
};

const users: Users[] = [];
let accounts: Accounts[] = [];
const sessions: Sessions[] = [];

const app = express();
app.use(express.json());
app.use(cors());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

app.post("/users", (req: Request, res: Response) => {
  try {
    // Take username, password from frontent
    const { username, password } = req.body;

    // Save new user
    const newUser: Users = {
      id: generateOTP(),
      username,
      password,
    };

    users.push(newUser);

    const newAccount: Accounts = {
      id: generateOTP(),
      userId: newUser.id,
      balance: 100,
    };

    accounts.push(newAccount);

    res.status(200).json({ user: newUser, account: newAccount });
  } catch (error) {
    res.status(500).send(`Error creating user profile`);
  }
});

app.post("/sessions", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = users.find((user) => user.username === username);

    console.log("USERS", users);

    if (existingUser) {
      if (existingUser.password !== password) {
        throw new Error(`Wrong password!`);
      }

      const newSession: Sessions = {
        userId: existingUser.id,
        token: generateOTP(),
      };

      sessions.push(newSession);
      console.log(sessions);
      res.status(200).json({ newSession });
    } else {
      throw new Error(`User not found.`);
    }
  } catch (error) {
    res.status(500).send(`${error}`);
  }
});

app.post("/me/account", (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const session = sessions.find((t) => t.token === token);
    const accountUser = accounts.find((id) => id.userId === session?.userId);

    if (session) {
      if (session.userId !== accountUser?.userId) {
        throw new Error(`Session ID invalid.`);
      }
    }
    res.status(200).json({ balance: accountUser?.balance });
  } catch (error) {
    res.status(500).send(`Error ${error}`);
  }
});

app.post("/me/account/transaction", (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const session = sessions.find((t) => t.token === token);
    console.log("SESSION", session);

    const accountUser = accounts.find((id) => id.userId === session?.userId);
    console.log("ACCOUNTS", accounts);
    console.log("accountUser", accountUser);

    const { amount } = req.body;

    const newBalance = accountUser?.balance + amount;

    accounts = accounts.map((account) =>
      account.userId === accountUser?.userId
        ? { ...account, balance: newBalance }
        : account
    );

    console.log("RESULT", accounts);

    res.status(200).json({ message: newBalance });
  } catch (error) {
    res.status(500).send(`Error`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
