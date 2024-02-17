import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from "@/lib/sequelize";
import { DataTypes } from "sequelize";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = require("@/models/User");

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

      profile: (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
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
            user.method = "credentials";

            return user;
          } else {
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
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          accessId: token.accessId,
          email: token.email,
          username: token.user.username,
          bio: token.user.bio,
          address: token.user.address,
        },
      };
    },
  },
  jwt: {
    encode: async ({ secret, token }) => {
      // Fetch user data from the database using Sequelize
      const user = await User.findOne({ where: { email: token.email } });

      console.log("-------------------- token --------------------");
      console.log(token);

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

      // Fetch user data from the database using Sequelize
      const user = await User.findOne({ where: { id: decodedToken.userId } });

      // Include additional user data in the session object
      const session = {
        ...decodedToken,
        user: {
          ...decodedToken.user,
          ...user.toJSON(),
          // Include any other user data you want in the session object
        },
      };
      //console.log(session)
      return session;
    },
  },
  // pages: {
  //   signIn: "/signin",
  //   signUp: "/signup",
  // },
};
// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-config
export default NextAuth(authOptions);

// export { handler as GET, handler as POST, authOptions };
