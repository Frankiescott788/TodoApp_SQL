import { Button, Card, Image } from "@nextui-org/react";

export default function Navbar () {
    return (
        <nav className="fixed top-0 right-0 left-0 ">
            <div className="mx-[4rem] my-2 flex justify-between">
                <div className="flex">
                    <Image src="https://i.pinimg.com/736x/ff/5a/b7/ff5ab7e4a8b0fd79fbff7094a674b97a.jpg" className="h-[4rem]"/>
                    <p className="text-3xl mt-4 absolute z-10 ms-[5.5rem]">TodoList</p>
                </div>
                <div>
                    <Button>Create New</Button>
                </div>
            </div>
        </nav>
    )
}