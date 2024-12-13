import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [selectvalue, setSelectValue] = useState<any>(new Set([]));
  const [todo, setTodo] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleAdd () {
    setIsLoading(true);
    if(!name || items.length === 0) {
      console.log("hey you ");
      return ;
    }
    try {
      const newTodo = {
        title: name,
        todos : JSON.stringify(items),
        createdAt: new Date().toISOString()
      }
      const { data, status } = await axios.post('http://localhost:8080/api/todos', newTodo, { withCredentials : true });
      if(status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="py-[2rem]">
      <section className="grid grid-cols-12">
        <div className="col-span-12 ">
          <div className="mockup-window bg-base-300 border mx-[4rem] ">
            <div className="bg-base-200 px-4 ">
              <div className="grid grid-cols-12 gap-3 ps-[10rem] py-[5rem]">
                <div className="col-span-12">cf</div>
                <div className="col-span-5">
                  <Card>
                    <CardBody>
                      <Input
                        type="text"
                        placeholder="Enter title"
                        label="Title"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <div className="mt-10">
                        <Input
                          type="text"
                          placeholder="Enter Item"
                          label="Todo Item"
                          className="my-2"
                          onChange={(e) => {
                            setTodo(e.target.value);
                          }}
                        />
                        <Select
                          onChange={(e) => {
                            setSelectValue(new Set(e.target.value.split(",")));
                          }}
                          aria-label="Select Priority"
                          label="Select Priority"
                        >
                          <SelectItem key="high">High</SelectItem>
                          <SelectItem key="medium">Medium</SelectItem>
                          <SelectItem key="low">Low</SelectItem>
                        </Select>
                        <div className="my-3 flex justify-center">
                          <Button
                            className="bg-[#2667ff] text-white px-[7rem]"
                            variant="shadow"
                            onClick={() => {
                              setItems([
                                ...items,
                                {
                                  name: todo,
                                  priority: Array.from(selectvalue).at(0),
                                  completed : false
                                },
                              ]);
                            }}

                          >
                            Add to Items
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-span-6 ">
                  <Card className="h-[19.5rem]">
                    <Table shadow="none" className="overflow-y-scroll">
                      <TableHeader>
                        <TableColumn key="id">No</TableColumn>
                        <TableColumn key={"name"}>Name</TableColumn>
                        <TableColumn key={"priority"}>Priority</TableColumn>
                        <TableColumn key={"action"}>Action</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, i) => (
                          <TableRow key={item.name}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell><span className={`text-tiny text-center px-3 rounded-full ${item.priority === "high" ? "text-red-500 bg-red-200" : item.priority === "medium" ? "text-yellow-500 bg-yellow-200" : "text-green-500 bg-green-200"}`}>{item.priority}</span></TableCell>
                            <TableCell>
                              <Tooltip content="Delete" color="primary" showArrow>
                              <button onClick={() => setItems(items.filter((todo, index) => index !== i))} >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width={24}
                                  height={24}
                                  color={"#9b9b9b"}
                                  fill={"none"}
                                >
                                  <path
                                    d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M9.5 16.5L9.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M14.5 16.5L14.5 10.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
                <div className="col-span-12">
                    <div className="flex justify-center">
                      <Button className="bg-[#2667ff] text-white px-[7rem] me-[8rem] my-2" onClick={handleAdd}>Submit</Button>
                      {isLoading && <Button className="bg-[#2667ff] text-white px-[7rem] my-2 me-[8rem]" isLoading>Loading</Button>}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
