import React, { useEffect, useState } from 'react';
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "../Chat/Chat.css";
import sendLogo from "../../assets/images/sendLogo.png";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../assets/images/icons8-close-80.png"

const ENDPOINT = "http://localhost:4500/";
let socket;

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        if (message) {
            socket.emit('message', { message, id });
            document.getElementById('chatInput').value = "";
        }
    };

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            setId(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('userJoined', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('leave', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on('sendMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off();
        };
    }, []);

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className="header">
                    <h1>VROOM</h1>
                    <a href='/'><img src={closeIcon} alt='close' /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type='text' id='chatInput' />
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt='send' /></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
