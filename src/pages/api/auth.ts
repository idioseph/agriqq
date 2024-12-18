import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import { generateToken, hashPassword, comparePassword } from "../../lib/auth";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "POST":
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        role,
        farmName,
        farmerContact,
        farmAddress,
      } = req.body;
      try {
        if (
          !firstname ||
          !lastname ||
          !email ||
          !password ||
          !confirmPassword ||
          !role
        ) {
          return res
            .status(400)
            .json({ message: "All required fields must be provided" });
        }

        if (password !== confirmPassword) {
          return res.status(400).json({ message: "Passwords do not match" });
        }

        if (role === "farmer" && !farmName || !farmAddress || !farmerContact) {
          return res
            .status(400)
            .json({ message: "Farmer details are required for farmers" });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          res.status(400).json({ message: "User already exists" });
          throw Error("User with email already exists");
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          role,
          farmName: role === "farmer" ? farmName : undefined,
          farmAddress: role === "farmer" ? farmAddress : undefined,
          farmerContact: role === "farmer" ? farmerContact : undefined,
        });
        await newUser.save();

        const token = generateToken(newUser);

        res.status(201).json({ token, user: newUser });

        break;
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message, error });
        }
        break;
      }

    case "PUT":
      const { email: loginEmail, password: loginPassword } = req.body;

      try {
        if (
          !loginEmail ||
          !loginPassword
        ) {
          return res
            .status(400)
            .json({ message: "All required fields must be provided" });
        }

        const loginUser = await User.findOne({ email: loginEmail });

        if (!loginUser) {
          res.status(400).json({ message: "User does not exist" });
          throw Error("User does not exist");
        }

        const isPasswordMatch = await comparePassword(
          loginPassword,
          loginUser.password
        );

        if (!isPasswordMatch) {
          res.status(400).json({ message: "Invalid credentials" });
          throw Error("Invalid credentials");
        }

        const loginToken = generateToken(loginUser);
        res.status(200).json({ token: loginToken, user: loginUser });
        break;
      } catch (error) {
        res.status(400).json({ message: "Error siging into account", error });
        break;
      }

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
