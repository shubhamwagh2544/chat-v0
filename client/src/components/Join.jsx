import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

export default function Join() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    return (
        <div className="join-container">
            <h2 className="join-heading">Join Chat Room</h2>
            <div className="input-group">
                <input
                    type="text"
                    className="join-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="join-input"
                    placeholder="Enter room name"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
            </div>
            <button
                className="join-button"
                onClick={() => {
                    navigate(`/chat?name=${name}&room=${room}`);
                }}
            >
                Join Chat
            </button>
        </div>
    );
}
