import { Button, Card, Input } from "@nextui-org/react"
import useAuth from "../../hooks/useAuth"

const Signup = () => {
    const { sign_up, setEmail, setPassword, setUsername } = useAuth();
    return (
        <main>
            <section className="w-full flex justify-center pt-[15rem]">
                <div className="w-[29rem]">
                    <Card className="px-4">
                        <div>
                            <p>Sign up</p>
                        </div>
                        <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        <Input type="text" placeholder="Email" className="my-2" onChange={(e) => setEmail(e.target.value)}/>
                        <Input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <div className="flex justify-center py-4">
                            <Button className="bg-[#2667ff] text-white px-[7rem]" onClick={sign_up}>Sign Up</Button>
                        </div>
                    </Card>
                </div>
            </section>
        </main>
    )
}

export default Signup