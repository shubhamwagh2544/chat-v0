import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import io from 'socket.io-client'

let socket;

export default function Chat() {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")
    const room = searchParams.get("room")
    const ENDPOINT = 'http://localhost:3000'

    useEffect(() => {
        socket = io(ENDPOINT);
        //console.log(socket)

        socket.emit('join', { name, room }, () => {
            // callback
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    // sending message
    function sendMessage(e) {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage("")
            })
        }
    }

    console.log(message, messages)

    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? sendMessage(e) : null}
            />
        </div>
    )
}