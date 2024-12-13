import Layout from "@/components/Layout/Layout";
import { setUser } from "@/utils/Redux/UserSlice";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Document() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passalert, setpassalert] = useState(false);
  const [usernamealert, setusernamealert] = useState(false);
  const [emptyalert, setemptyalert] = useState(false);
  const [emailalert, setemailalert] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const signIn = () => {
    window.open(
      "https://fipr-backend.onrender.com/auth/google/callback",
      "_self"
    );
  };

  const login = async () => {
    if (!validateEmail(name)) {
      setemailalert(true);
      return;
    }
    else if (!password) {
      setemptyalert(true);
      return;
    }
    else {
      const user = {
        email: name,
        password: password,
      };
      const { data } = await axios.post(
        `https://fipr-backend.onrender.com/login-user`,
        user,
        { withCredentials: true }
      );
      if (data.message == "password incorrect") {
        setpassalert(true);
        return;
      }
      if (data.message == "sign-up first") {
        setusernamealert(true);
        return;
      }
      if (data.user) {
        dispatch(setUser(data.user));
        window.open("https://flipr-hackathon-project.vercel.app/", "_self");
      }
    }
  };
  return (
    <Layout>
      <div className=" flex justify-center ">
        <Card color="transparent" shadow={false} className="my-10">
          <Typography variant="h4" className="text-blue-500">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome Back
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-4">
              <div>
                {usernamealert && (
                  <p className="mb-2 text-red-700">Sign-Up First*</p>
                )}
                {emailalert && (
                  <p className="mb-2 text-red-700">Invalid Email*</p>
                )}
                <Input
                  value={name}
                  onClick={() => { setusernamealert(false); setemailalert(false) }}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  label="Email"
                />
              </div>
              <div>
                {passalert && (
                  <p className="mb-2 text-red-700">Incorrect Password*</p>
                )}
                {emptyalert && (
                  <p className="mb-2 text-red-700">Enter Password*</p>
                )}
                <Input
                  value={password}
                  onClick={() => { setpassalert(false); setemptyalert(false) }}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  size="lg"
                  label="Password"
                />
              </div>
            </div>
            <Button className="my-3" fullWidth onClick={login}>
              Sign-in
            </Button>
            <div className="text-center text-white">OR</div>
            <Button
              className="my-3"
              variant="outlined"
              fullWidth
              onClick={signIn}
            >
              Sign-in with Google
            </Button>
            <Typography color="white" className="mt-4 text-center font-normal">
              Don&lsquo;t have an Account?{" "}
              <Link href="/sign-up">
                <button className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                  Create a new one
                </button>
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
