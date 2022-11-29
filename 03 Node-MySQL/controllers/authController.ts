import { NextFunction, Request, RequestHandler, Response } from "express";
import mysql from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { promisify } from "util";

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

interface CustomRequest extends Request {
  user: any;
}

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide an email and password",
      });
    }

    await db.query("SELECT * FROM users WHERE email = ?", [email], async (error, results: mysql.RowDataPacket[]) => {
      if (error) {
        console.log({ error });
      }
      console.log({ results });
      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        res.status(401).render("login", {
          message: "Email or Password is incorrect",
        });
      } else {
        const id = results[0].id;

        const token = await jwt.sign({ id }, process.env.JWT_SECRET as string, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        console.log("The token is: " + { token });

        const cookieOptions = {
          expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        res.cookie("jwt", token, cookieOptions);
        res.status(200).redirect("/");
      }
    });
  } catch (error) {
    console.log({ error });
  }
};

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  await db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results: mysql.RowDataPacket[]) => {
    if (error) {
      console.log({ error });
    }

    if (results.length > 0) {
      return res.render("register", {
        message: "That email is already in use",
      });
    } else if (password !== passwordConfirm) {
      return res.render("register", {
        message: "Passwords do not match",
      });
    }

    let hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    await db.query("INSERT INTO users SET ?", { name: name, email: email, password: hashedPassword }, (error, results) => {
      if (error) {
        console.log({ error });
      } else {
        console.log({ results });
        return res.render("register", {
          message: "User registered",
        });
      }
    });
  });
};

export const isLoggedIn = async (req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
  // console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //* 1) Verify the token
      // const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
      const decoded = await promisify(jwt.verify(req.cookies.jwt, process.env.JWT_SECRET as jwt.Secret) as Function);

      console.log({ decoded });

      //* 2) Check if the user still exists
      // @ts-ignore
      db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, result: mysql.RowDataPacket[]) => {
        if (error) {
          console.log({ error });
        }
        console.log({ result });

        if (!result) {
          return next();
        }

        req.user = result[0];
        console.log("user is");
        console.log(req.user);
        return next();
      });
    } catch (error) {
      console.log({ error });
      return next();
    }
  } else {
    next();
  }
};

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  await res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  res.status(200).redirect("/");
};
