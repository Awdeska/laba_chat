import React, { useState, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Получение сообщений из сервера
        fetch('/api/messages', {
            headers: {
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => setMessages(data))
            .catch((error) => console.error(error));
    }, []);


    const handleSendMessage = (event) => {
        event.preventDefault();
        if (!newMessage) {
            return;
        }
        // Отправка нового сообщения на сервер
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author: 'User', text: newMessage }),
        })
            .then((response) => response.json())
            .then((data) => setMessages([...messages, data]))
            .catch((error) => console.error(error));
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <div className="chat-message-author">{message.author}</div>
                        <div className="chat-message-text">{message.text}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Введите сообщение"
                />
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default Chat;
