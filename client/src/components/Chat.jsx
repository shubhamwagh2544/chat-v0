import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import io from 'socket.io-client'
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import TextContainer from "./TextContainer";

let socket;

export default function Chat() {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('');
    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")
    const room = searchParams.get("room")
    const ENDPOINT = 'http://localhost:3000'

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    function sendMessage(event) {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    );
}