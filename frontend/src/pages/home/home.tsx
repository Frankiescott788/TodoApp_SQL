import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
  User,
} from "@nextui-org/react";
import useCrud from "../../hooks/usecrud";
import { useContext, useEffect, useState } from "react";
import { formatDistanceToNow, set } from "date-fns";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import notodos from "../../assets/notodos.svg";
import arrow from "../../assets/arrow.png";
import { motion } from "framer-motion";

const Home = () => {
  const {
    setDescription,
    setPriority,
    setTitle,
    add_todos,
    isLoading,
    todos,
    setTodos,
    get_todos,
    delete_todo,
    edit_todo,
  } = useCrud();

  const { currentuser, setIsAuthenticated } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});

  const naviagate = useNavigate();

  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
  console.log("rendered");
  useEffect(() => {
    get_todos();
  }, []);

  return (
    <>
      <main className="lg:mt-[5rem]">
        <section className="flex justify-center">
          <div className="w-[50rem]  p-[4rem]">
            <div className="absolute top-[9rem] mt-1 ms-5 right-[28rem] z-10 flex gap-2">
              <Button
                className="bg-danger-400 text-white text-tiny mt-1 rounded-full"
                size="sm"
                onClick={async () => {
                  try {
                    await axios.get("http://localhost:8080/api/logout", {
                      withCredentials: true,
                    });
                    setIsAuthenticated(false);
                    naviagate("/signin");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Log out
              </Button>
              <User
                name={currentuser.username}
                description={currentuser.email}
              />
            </div>
            {todos.length === 0 && (
              <div className="absolute right-[29rem] z-20 top-[15rem] flex ">
                <p className="text-tiny text-[#9b5de5] mt-[36px] absolute w-[5rem] me-[4rem]">
                  Create one
                </p>

                <Image src={arrow} className="h-[3rem] object-cover" />
              </div>
            )}

            <div className=" mx-[10rem] lg:mx-0 mockup-window bg-base-300 border ">
              <div className="bg-gray-50 px-4 h-[25rem] ">
                <div className="flex justify-between pt-3">
                  <Input
                    type="search"
                    className="w-[20rem]"
                    classNames={{
                      innerWrapper: "bg-white",
                      input: "bg-white",
                      inputWrapper: "bg-white",
                    }}
                    placeholder="Search..."
                  />
                  <Button
                    size="sm"
                    className="bg-[#9b5de5] text-white mt-1"
                    onClick={onOpen}
                  >
                    New
                  </Button>
                </div>
                <div>
                  <p className="text-center text-tiny text-[#9b5de5] pt-5 pb-3 font-semibold">
                    Todos
                  </p>
                </div>
                {isLoading && <div className="flex justify-center"></div>}
                {!isLoading && (
                  <div className="overflow-y-scroll h-[18rem]">
                    <div className="grid grid-cols-12 gap-5 ">
                      {todos.length === 0 ? (
                        <div className="col-span-12 pt-[3rem] flex justify-center">
                          <div>
                            <Image
                              src={notodos}
                              className="h-[10rem] object-cover"
                            />
                            <p className="text-center py-2 text-default-400">
                              No <span className="text-[#9b5de5]">todos</span>{" "}
                              yet, create one.
                            </p>
                          </div>
                        </div>
                      ) : (
                        todos.map((todo: any) => (
                          <Card className="col-span-12 border-none shadow-none px-3">
                            <div className="py-2">
                              <div className="flex justify-between">
                                <p>{todo.title}</p>
                                <Select
                                  size="sm"
                                  className="w-[8rem]"
                                  placeholder={
                                    todo.completed === "true"
                                      ? "Completed"
                                      : "Pending"
                                  }
                                  onChange={async (e) => {
                                    try {
                                      await axios.patch(
                                        `http://localhost:8080/api/todos/${todo._id}`,
                                        {
                                          title: todo.title,
                                          description: todo.description,
                                          completed: e.target.value,
                                          priority: todo.priority,
                                        },
                                        { withCredentials: true }
                                      );
                                      get_todos();
                                      onClose();
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  }}
                                >
                                  <SelectItem key={"true"}>
                                    completed
                                  </SelectItem>
                                  <SelectItem key={"false"}>pending</SelectItem>
                                </Select>
                              </div>
                              <p className="text-tiny text-default-400">
                                {todo.description}
                              </p>
                              <div className="flex gap-2 py-2">
                                <p
                                  className={`px-2 rounded-full ${
                                    todo.completed === "true"
                                      ? "bg-green-300 text-white"
                                      : "bg-yellow-200 text-black"
                                  } w-[5rem] text-tiny`}
                                >
                                  {todo.completed === "true"
                                    ? "Completed"
                                    : "Pending"}
                                </p>
                                <div className="flex gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="injected-svg mt-1"
                                    data-src="https://cdn.hugeicons.com/icons/time-quarter-02-bulk-rounded.svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    role="img"
                                    color="#9b9b9b"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M12 5C12.5523 5 13 5.44772 13 6L13 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H12C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12L11 6C11 5.44772 11.4477 5 12 5Z"
                                      fill="#9b9b9b"
                                    />
                                    <path
                                      opacity="0.4"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M1.25 12C1.25 6.06294 6.06282 1.25 11.9997 1.25C12.5395 1.25 12.977 1.68754 12.977 2.22727C12.977 2.76701 12.5395 3.20455 11.9997 3.20455C7.14226 3.20455 3.2045 7.1424 3.2045 12C3.2045 16.8576 7.14226 20.7955 11.9997 20.7955C16.8572 20.7955 20.795 16.8576 20.795 12C20.795 11.4603 21.2325 11.0227 21.7722 11.0227C22.312 11.0227 22.7495 11.4603 22.7495 12C22.7495 17.9371 17.9367 22.75 11.9997 22.75C6.06282 22.75 1.25 17.9371 1.25 12Z"
                                      fill="#9b9b9b"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M13.9954 1.95044C14.1485 1.43286 14.6921 1.13733 15.2097 1.29036C15.7332 1.44515 16.2439 1.64397 16.737 1.88085C17.2235 2.11457 17.4284 2.69842 17.1947 3.18493C16.961 3.67143 16.3771 3.87636 15.8907 3.64264C15.4875 3.44894 15.0743 3.28851 14.6555 3.1647C14.1379 3.01166 13.8424 2.46802 13.9954 1.95044ZM17.9601 3.70172C18.3173 3.29716 18.9349 3.25882 19.3394 3.61608C19.5249 3.77985 19.7053 3.94948 19.8802 4.12453C20.0552 4.29958 20.2247 4.4801 20.3883 4.66565C20.7453 5.07044 20.7066 5.688 20.3018 6.04502C19.8971 6.40203 19.2795 6.36331 18.9225 5.95852C18.7858 5.80348 18.6441 5.65256 18.4978 5.50617C18.3515 5.35978 18.2006 5.21797 18.0457 5.08114C17.6411 4.72387 17.6028 4.10628 17.9601 3.70172ZM20.7972 6.77652C21.2829 6.54102 21.8675 6.74379 22.103 7.22944C22.3472 7.7331 22.5518 8.25534 22.7104 8.79099C22.8636 9.30852 22.5683 9.85227 22.0508 10.0055C21.5333 10.1587 20.9895 9.86341 20.8363 9.34588C20.7094 8.91722 20.5442 8.49443 20.3443 8.08227C20.1088 7.59663 20.3116 7.01202 20.7972 6.77652Z"
                                      fill="#9b9b9b"
                                    />
                                  </svg>

                                  <p className="text-tiny mt-1 text-default-400">
                                    {formatDistanceToNow(
                                      new Date(todo.createdAt),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </p>
                                </div>
                                <div
                                  className={`px-2 absolute right-3 pb-1 bottom-3 text-tiny rounded-full text-white ${
                                    todo.priority === "high"
                                      ? "bg-red-400"
                                      : todo.priority === "medium"
                                      ? "bg-yellow-200"
                                      : "bg-green-300"
                                  }`}
                                >
                                  {todo.priority}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-1">
                                <button
                                  className="text-tiny flex gap-1"
                                  onClick={() => delete_todo(todo._id)}
                                >
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="none"
                                      className="injected-svg"
                                      color="#9b9b9b"
                                      data-src="https://cdn.hugeicons.com/icons/delete-02-bulk-rounded.svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="#9b9b9b"
                                        d="M19.583 15.656c-.077 1.254-.138 2.248-.263 3.042-.128.815-.333 1.494-.742 2.087a4.7 4.7 0 0 1-1.417 1.345c-.612.377-1.295.541-2.108.62H8.927c-.813-.079-1.497-.244-2.11-.621A4.7 4.7 0 0 1 5.4 20.781c-.41-.594-.613-1.273-.74-2.09-.124-.795-.184-1.79-.259-3.046L3.75 4.75h16.5z"
                                        opacity="0.4"
                                      ></path>
                                      <path
                                        fill="#9b9b9b"
                                        fillRule="evenodd"
                                        d="M9.5 17.965a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 1.5 0v6a.75.75 0 0 1-.75.75M14.5 10.465a.75.75 0 0 1 .75.75v6a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 .75-.75M13.347 1.283c.565.05 1.097.223 1.553.563.337.251.571.56.771.893.186.309.373.694.585 1.131l.426.88H21a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4.41l.356-.78c.206-.453.388-.852.57-1.172.198-.346.431-.666.773-.928.461-.354 1.003-.533 1.58-.586.436-.04.874-.034 1.311-.033.51 0 .97-.002 1.347.032M9.607 4.75h4.853a14 14 0 0 0-.503-.983c-.193-.32-.423-.46-.788-.493-.26-.023-.597-.024-1.135-.024-.55 0-.897 0-1.163.025-.374.034-.607.18-.797.513-.125.218-.26.51-.466.962"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </div>
                                  <p className="text-default-400">Delete</p>
                                </button>
                                <Divider orientation="vertical" />
                                <button className="flex gap-1 text-tiny">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    className="injected-svg"
                                    color="#9b9b9b"
                                    data-src="https://cdn.hugeicons.com/icons/pencil-edit-02-bulk-rounded.svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="#9b9b9b"
                                      d="m19.395 8.636-4.03-4.03-6.13 6.128a4.7 4.7 0 0 0-1.239 2.188l-.724 2.896a.75.75 0 0 0 .91.91l2.896-.724a4.7 4.7 0 0 0 2.188-1.24z"
                                      opacity="0.4"
                                    ></path>
                                    <path
                                      fill="#9b9b9b"
                                      fillRule="evenodd"
                                      d="M10.452 4.25h.062a.972.972 0 0 1 0 1.944c-1.622 0-2.753.002-3.616.104-.842.1-1.301.283-1.637.558a3 3 0 0 0-.405.405c-.275.336-.459.795-.558 1.637-.102.863-.104 1.994-.104 3.616V13c0 1.86.002 3.159.134 4.138.128.95.362 1.454.72 1.813.36.36.863.593 1.814.72.98.133 2.277.135 4.138.135h.486c1.622 0 2.753-.002 3.616-.104.842-.1 1.301-.283 1.637-.559q.222-.181.404-.404c.276-.336.46-.795.559-1.637.102-.863.103-1.994.103-3.616a.972.972 0 0 1 1.945 0v.062c0 1.546 0 2.792-.117 3.782-.121 1.026-.38 1.903-.986 2.643a5 5 0 0 1-.674.674c-.74.607-1.617.865-2.643.986-.99.117-2.237.117-3.782.117h-.62c-1.772 0-3.201 0-4.325-.151-1.167-.157-2.149-.492-2.93-1.273-.78-.78-1.115-1.762-1.272-2.93-.151-1.123-.151-2.552-.151-4.325v-.619c0-1.546 0-2.792.117-3.782.121-1.026.38-1.903.986-2.643q.304-.37.674-.674c.74-.607 1.617-.865 2.643-.986.99-.117 2.236-.117 3.782-.117"
                                      clipRule="evenodd"
                                    ></path>
                                    <path
                                      fill="#9b9b9b"
                                      d="M20.915 3.085a2.85 2.85 0 0 0-4.03 0l-.46.46 4.03 4.03.46-.46a2.85 2.85 0 0 0 0-4.03"
                                    ></path>
                                  </svg>
                                  <p
                                    className="text-default-400"
                                    onClick={() => {
                                      setData(todo);
                                      setEdit(true);
                                      onOpen();
                                    }}
                                  >
                                    Edit
                                  </p>
                                </button>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                )}
                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  backdrop="blur"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          {edit ? "Edit Todo" : "Add Todo"}
                        </ModalHeader>
                        <ModalBody>
                          <div>
                            <div>
                              <Input
                                placeholder="Title"
                                onChange={(e) => setTitle(e.target.value)}
                              />
                              <Textarea
                                placeholder="Description"
                                className="my-3"
                                onChange={(e) => setDescription(e.target.value)}
                              />
                              <Select
                                placeholder="Priority"
                                onChange={(e) =>
                                  setPriority(
                                    new Set([e.target.value.split(",")])
                                  )
                                }
                              >
                                <SelectItem key="high">High</SelectItem>
                                <SelectItem key="medium">Medium</SelectItem>
                                <SelectItem key="low">Low</SelectItem>
                              </Select>
                            </div>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light">
                            Close
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => {
                              add_todos();
                              onClose();
                            }}
                          >
                            Submit
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
            
          </div>
        </section>
        
          <div className="drawer z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="absolute bottom-[5rem] z-50 left-[40rem] top-[-3rem] text-sm text-400-default"
              >
                Copy right @ 2024, Terms and conditions
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="w-80 bg-white h-[100%] p-3">
                <div>
                  <p className="text-2xl">Terms and Conditions</p>
                  
                </div>
                <p className="text-sm text-default-400 my-2">
                  These Terms and Conditions (“Terms”) govern your use of the
                  App, provided by our App (“we,” “our,” or “us”). By accessing
                  or using the App, you agree to comply with these Terms. If you
                  do not agree, you must not use the App.
                </p>
                <ul className="text-sm text-default-400">
                  <li>- To use the App, you must be at least 13 years old.</li>
                  <li>
                    - You are responsible for maintaining the confidentiality of
                    your account and password.
                  </li>
                </ul>
                <div className="flex gap-2 my-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    className="injected-svg"
                    color="#9b9b9b"
                    data-src="https://cdn.hugeicons.com/icons/shield-user-bulk-rounded.svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#9b9b9b"
                      d="M10.915 1.498c.368-.14.73-.248 1.085-.248s.717.109 1.085.248c.373.14.839.347 1.42.605.853.379 1.98.814 3.188 1.157.882.251 1.595.454 2.135.663.543.21 1.035.472 1.367.91.32.425.444.921.5 1.456.055.517.055 1.165.055 1.95v2.944c0 3.056-1.38 5.48-3.047 7.286-1.662 1.8-3.642 3.025-4.947 3.714l-.063.033c-.556.294-1.01.534-1.693.534s-1.137-.24-1.693-.534l-.063-.033c-1.305-.69-3.285-1.914-4.947-3.714-1.667-1.807-3.047-4.23-3.047-7.286V8.24c0-.785 0-1.433.055-1.95.056-.535.18-1.031.5-1.456.332-.438.824-.7 1.367-.91.54-.21 1.253-.412 2.135-.663a25 25 0 0 0 3.189-1.157 30 30 0 0 1 1.419-.605"
                      opacity="0.4"
                    ></path>
                    <path
                      fill="#9b9b9b"
                      d="M14.498 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M9.211 13.001a5.55 5.55 0 0 1 5.579 0c.31.171 1.016.563 1.39.924.233.224.51.57.562 1.035.057.513-.18.955-.545 1.298-.56.525-1.282.992-2.237.992h-3.92c-.955 0-1.676-.467-2.236-.992-.365-.342-.602-.785-.545-1.297.051-.465.33-.812.562-1.036.374-.36 1.08-.753 1.39-.924"
                    ></path>
                  </svg>
                  <p className="text-2xl">User <span className="text-[#9b5de5]">Accounts</span></p>

                </div>
                <p className="text-sm text-default-400">
                You are responsible for maintaining the confidentiality of your account credentials and are fully accountable for all activities that occur under your account. If you suspect any unauthorized access to your account, you must notify us immediately. We are not liable for any loss or damage arising from your failure to secure your account. Additionally, we reserve the right to suspend or terminate your account at our discretion if you violate these Terms or engage in prohibited activities.
                </p>
              </div>
            </div>
          </div>
        
      </main>
    </>
  );
};

export default Home;
