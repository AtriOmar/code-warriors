import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from "@/lib/sequelize";
import { DataTypes } from "sequelize";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

const fse = require("fs-extra");
const uuidv4 = require("uuid").v4;

const User = require("@/models/User");

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with Email")
      name: "Credentials",
      // Function that verifies credentials and returns a user object
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Here you would implement your own logic to check if the credentials are valid

        const { email, password } = credentials;

        try {
          const result = await User.findOne({
            where: {
              email,
            },
          });
          const user = await result?.toJSON();

          console.log("from login", user);

          if (!user) {
            // res.status(400).send("user not found");
            throw "user not found";
          }

          const match = await bcrypt.compare(password, user.password);
          console.log("-------------------- match --------------------");
          console.log(match);
          if (match) {
            if (!user.active) {
              // res.status(400).send("suspended");
              throw "suspended";
            }
            delete user.password;

            const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

            user.token = token;

            console.log("success from login", user);

            // res.send(user);

            return user;
          } else {
            if (user.password === "OAUTH") throw "signed in with oauth";
            // res.status(400).send("incorrect password");
            throw "incorrect password";
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  // adapter: SequelizeAdapter(sequelize),
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log("-------------------- session,token from session  --------------------");
      console.log(session, token);

      return {
        ...session,
        user: {
          ...session.user,
          id: token.user.id,
          accessId: token.accessId,
          email: token.email,
          username: token.user.username,
          bio: token.user.bio,
          address: token.user.address,
          picture: token.user.picture,
          cover: token.user.cover,
        },
      };
    },
  },
  jwt: {
    encode: async ({ secret, token }) => {
      console.log("-------------------- token from jwt encode --------------------");
      console.log(token);

      if (token?.user?.method !== "credentials") {
        console.log("-------------------- creating user credentials --------------------");

        const userData = {
          username: token.name,
          email: token.email || token.sub,
          password: "OAUTH",
          accessId: 1,
          active: 2,
        };

        console.log(userData);
        var [user, created] = await User.findOrCreate({
          where: {
            email: token.email || token.sub,
          },
          defaults: userData,
        });

        if (created && token.picture) {
          const response = await axios.get(token.picture, { responseType: "arraybuffer" });

          var newName = uuidv4().replaceAll("-", "").toString() + ".jpg";
          const newPath = "./public/uploads/profile-pictures/" + newName;

          console.log("-------------------- newPath --------------------");
          console.log(newPath);

          await fse.writeFile(newPath, Buffer.from(response.data, "binary"));

          await User.update(
            {
              picture: newName,
            },
            {
              where: {
                id: user.id,
              },
            }
          );
        }
      } else {
        // Fetch user data from the database using Sequelize
        var user = await User.findOne({ where: { email: token.email || token.sub } });
      }

      // Include additional user data in the token
      const payload = {
        ...token,
        userId: user.id,
        accessId: user.accessId,
        // Include any other user data you want in the token
      };
      //console.log(payload)

      // Encode the token using your custom encode function
      const encodedToken = jwt.sign(payload, secret);
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      // Decode the token using your custom decode function
      const decodedToken = jwt.verify(token, secret);

      console.log("-------------------- decoded token --------------------");
      console.log(decodedToken);

      // Fetch user data from the database using Sequelize
      const user = await User.findOne({ where: { id: decodedToken.userId } });

      // Include additional user data in the session object
      const session = {
        ...decodedToken,
        user: {
          ...decodedToken.user,
          ...user.toJSON(),
          method: "credentials",
          // Include any other user data you want in the session object
        },
      };
      //console.log(session)
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
};
// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-config
export default NextAuth(authOptions);

// export { handler as GET, handler as POST, authOptions };
