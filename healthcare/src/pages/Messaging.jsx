import React, { useState } from 'react';
import "./Messaging.css";

const MessagingApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sunil Rajput',
      message: 'Test, which is a new approach to have all solutions astrology under one roof.',
      date: 'Dec 25',
      type: 'incoming',
    },
    {
      id: 2,
      sender: 'Sunil Rajput',
      message: 'Test, which is a new approach to have all solutions astrology under one roof.',
      date: 'Dec 25',
      type: 'outgoing',
    },
    {
      id: 3,
      sender: 'Sunil Rajput',
      message: 'Test, which is a new approach to have all solutions astrology under one roof.',
      date: 'Dec 25',
      type: 'incoming',
    },
    {
      id: 4,
      sender: 'Sunil Rajput',
      message: 'Test, which is a new approach to have all solutions astrology under one roof.',
      date: 'Dec 25',
      type: 'outgoing',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage,
        date: new Date().toLocaleString(),
        type: 'outgoing',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">Messaging</h3>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                  />
                  <span className="input-group-addon">
                    <button type="button">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="inbox_chat">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat_list ${msg.type === 'outgoing' ? 'active_chat' : ''}`}>
                  <div className="chat_people">
                    <div className="chat_img">
                      <img src="https://ptetutorials.com/images/user-profile.png" alt="user" />
                    </div>
                    <div className="chat_ib">
                      <h5>{msg.sender} <span className="chat_date">{msg.date}</span></h5>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.type === 'incoming' ? 'incoming_msg' : 'outgoing_msg'}>
                  {msg.type === 'incoming' ? <div className="incoming_msg_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="user" />
                  </div> : ''}
                  
                  <div className={msg.type === 'incoming' ? 'received_msg' : 'sent_msg'}>
                    <div className={msg.type === 'incoming' ? 'received_withd_msg' : 'sent_msg'}>
                      <p>{msg.message}</p>
                      <span className="time_date">
                        {msg.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="msg_send_btn" type="button" onClick={handleSendMessage}>
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center top_spac">
        Design by <a target="_blank" href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/">Sunil Rajput</a>
      </p>
    </div>
  );
};

export default MessagingApp;
