import axios from "axios";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function useCrud () {

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [todos, setTodos] = useState<any>([]);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<any>(new Set([]));

    const add_todos = async () : Promise<void> => {
        setIsLoading(true);
        try {
            const { data, status } = await axios.post('http://localhost:8080/api/todos', { title, description, priority : Array.from(priority).at(0)?.toString(), completed : "false", createdAt : new Date().toISOString() }, { withCredentials : true }); 
            if(status === 201) {
                setTodos([...todos, data]);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const get_todos = async () : Promise<void> => {
        setIsLoading(true);
        try {
            const { data, status } = await axios.get('http://localhost:8080/api/todos', { withCredentials : true }); 
            if(status === 200) {
                setTodos(data);
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const delete_todo = async (id : string) : Promise<void> => {
        setIsLoading(true);
        try {
            const { data, status } = await axios.delete(`http://localhost:8080/api/todos/${id}`, { withCredentials : true }); 
            if(status === 200) {
                console.log("deleted");
                setTodos([...todos.filter((todo : any) => todo._id !== id)]);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const edit_todo = async (id : string) : Promise<void> => {
        try {
            await axios.patch(
              `http://localhost:8080/api/todos/${id}`,
              {
                title: title,
                description: description,
                priority: priority,
                completed: "false",
              },
              { withCredentials: true }
            );
            setTodos(todos.map((todo : any) => (todo._id === id ? { ...todo, title, description, priority } : todo)));
          } catch (error) {
            console.log(error);
          }
    }

    return { setTitle, setDescription, setPriority, add_todos, isLoading, todos, get_todos, setTodos, delete_todo , edit_todo}
}