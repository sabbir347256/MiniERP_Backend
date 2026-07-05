import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import bcryptjs from "bcryptjs";
import { User } from "../modules/users/user.model";

passport.use(
  "user-local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const isUserExists = await User.findOne({ email }).select('+password');

        if (!isUserExists) {
          return done(null, false, { message: "User Does not Exist" });
        }

        const isPasswordMatch = await bcryptjs.compare(
          password,
          isUserExists?.password as string,
        );

        if (!isPasswordMatch) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, isUserExists);
      } catch (error) {
        return done(error);
      }
    },
  ),
);



passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});