import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Join() {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    const navigate = useNavigate()

    return (
        <div>
            <div>Join</div>
            <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="room" onChange={(e) => setRoom(e.target.value)} />
            <button type="submit" onClick={(e) => {
                navigate(`/chat?name=${name}&room=${room}`)
            }}>Sign In</button>
        </div>
    )
}