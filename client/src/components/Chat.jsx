import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import io from 'socket.io-client'


export default function Chat() {

    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")
    const room = searchParams.get("room")
    const ENDPOINT = 'http://localhost:3000'
    let socket;

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

    return (
        <div>
            Chat
        </div>
    )
}