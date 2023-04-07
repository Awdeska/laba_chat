import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import "./Chat.css"

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');

    const socketRef = useRef();

    useEffect(() => {
        // Подключаемся к серверу по websocket
        socketRef.current = socketIOClient('http://localhost:3000');

        // Получаем все сообщения при подключении
        socketRef.current.on('all-messages', (data) => {
            setMessages(data);
        });

        // Получаем новое сообщение
        socketRef.current.on('chat-message', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            // Отключаемся от сервера при размонтировании компонента
            socketRef.current.disconnect();
        };
    }, [messages]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Отправляем сообщение на сервер
        socketRef.current.emit('chat-message', { username, message: newMessage });
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message) => (
                    <div key={message._id} className={message.username === username ? 'message right' : 'message left'}>
                        <div className="message-text">{message.message}</div>
                        <div className="message-date">{new Date(message.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Enter your message" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
