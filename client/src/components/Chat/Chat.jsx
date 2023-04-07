import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import Linkify from 'react-linkify';
import './Chat.css'

const Chat = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const serverUrl = 'http://localhost:5000';
        const socket = io.connect(serverUrl);

        socket.on('connect', () => {
            console.log('Connected to server!');
        });

        socket.on('chat-message', (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socket.on('all-messages', (messages) => {
            setMessages(messages);
        });
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (currentMessage.trim() === '') return;
        const message = {
            username,
            message: currentMessage.trim(),
            timestamp: new Date(),
        };
        socket.emit('chat-message', message);
        console.log(socket)
        setCurrentMessage('');
    };

    const formatDate = (date) => {
        return moment(date).format('HH:mm:ss, MMMM Do YYYY');
    };

    return (
        <div className="chat">
            <div className="chat-messages">
                {messages.map((message, index) => {
                    console.log(message.username)
                    const isCurrentUser = message.username === username;
                    const messageClass = isCurrentUser
                        ? 'chat-message chat-message-current-user'
                        : 'chat-message';
                    const messageStyle = isCurrentUser ? { textAlign: 'right' } : {};
                    return (
                        <div className={messageClass} key={index}>
                            <p className="chat-message-username">{message.username}</p>
                            <p className="chat-message-timestamp">{formatDate(message.timestamp)}</p>
                            <div className="chat-message-content" style={messageStyle}>
                                <Linkify>{message.message}</Linkify>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef}></div>
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
                <input
                    className="chat-input"
                    type="text"
                    placeholder="Type a message"
                    value={currentMessage}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                />
                <button className="chat-send-button" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
