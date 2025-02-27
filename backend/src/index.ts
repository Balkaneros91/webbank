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
  userId: number;
  token: string;
};

const users: Users[] = [];
const accounts: Accounts[] = [];
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
      balance: 0,
    };

    accounts.push(newAccount);

    res.status(200).json({ user: newUser, account: newAccount });
  } catch (error) {
    res.status(500).send(`Error creating user profile`);
  }
});

app.post("/sessions", (req: Request, res: Response) => {
  res.status(200).json({ messsage: "OK" });
});

app.post("/me/accounts", (req: Request, res: Response) => {
  res.status(200).json({ messsage: "OK" });
});

app.post("/me/accounts/transactions", (req: Request, res: Response) => {
  res.status(200).json({ messsage: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
