import { Button, Card, Input } from "@nextui-org/react"
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const Signin = () => {
    const { sign_up, setEmail, setPassword, sign_in, isLoading, errors } = useAuth();
    return (
        <main >
            <section className="w-full flex justify-center pt-[15rem]">
                <div className="w-[29rem]">
                    <Card className="px-4 py-5">
                        <div>
                            <p className="text-xl">Welcome back</p>
                            <p className="text-tiny text-default-400">Sign in to your account</p>
                        </div>
                        <Input type="text" placeholder="Email" className="my-2" onChange={(e) => setEmail(e.target.value)}
                            isInvalid={errors.email.length > 0}
                            errorMessage={errors.email.length > 0 && errors.email}
                        />
                        <Input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                            isInvalid={errors.password.length > 0 ? true : false}
                            errorMessage={errors.password.length > 0 && errors.password}
                        />
                        <div className="flex justify-center py-4">
                            <Button className="bg-[#9b5de5] text-white px-[7rem]" disabled={isLoading} onClick={sign_in} isLoading={isLoading}>{isLoading ? "Loading..." : "Sign up"}</Button>
                        </div>
                        <p className="text-center text-sm text-default-400">Don't have an Account? <Link to={'/signup'} className="text-[#9b5de5]">Sign up</Link></p>
                    </Card>
                </div>
            </section>
        </main>
    )
}

export default Signin