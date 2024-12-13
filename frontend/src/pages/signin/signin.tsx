import { Button, Card, Input } from "@nextui-org/react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Signup = () => {
  const { sign_up, setEmail, setPassword, setUsername, errors } = useAuth();
  return (
    <main>
      <section className="w-full flex justify-center pt-[15rem]">
        <div className="w-[29rem]">
          <Card className="px-4 py-2">
            <div className="my-2">
              <p className="text-xl">Sign up</p>
              <p className="text-tiny text-default-400">Create a new Account</p>
            </div>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={errors.username.length > 0 ? true : false}
              errorMessage={errors.username.length > 0 && errors.username}
            />
            <Input
              type="text"
              placeholder="Email"
              className="my-2"
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={errors.email.length > 0 ? true : false}
              errorMessage={errors.email.length > 0 && errors.email}
            />
            <Input
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={errors.password.length > 0 ? true : false}
              errorMessage={errors.password.length > 0 && errors.password}
            />
            <div className="flex justify-center py-4">
              <Button
                className="bg-[#2667ff] text-white px-[7rem]"
                onClick={sign_up}
              >
                Sign Up
              </Button>
            </div>
            <p className="text-center text-sm text-default-400">Already have an account? <Link to={'/signin'} className="text-[#2667ff]">Sign in</Link></p>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Signup;
