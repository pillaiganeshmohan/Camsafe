import React, { useEffect, useState } from 'react';
import { IoWarning } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const AlertComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/test/');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const notificationData = JSON.parse(event.data);
      setNotifications(prevNotifications => [...prevNotifications, notificationData]);
      console.log('Received message:', notificationData);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  const handleClose = (index) => {
    setNotifications(prevNotifications => prevNotifications.filter((_, i) => i !== index));
  };

  return (
    <div className='z-40 w-2/5 sm:w-full sm:z-50 h-fit absolute top-10 sm:top-16 right-[3%] text-2xl font-bold text-red-500'>
      <ul className='flex flex-col gap-5  items-end'>
        {notifications.map((notification, index) => (
          <li key={index} className='bg-red-100 opacity-90 px-10 py-5 flex w-[70%] items-center gap-6 rounded-xl'>
            <IoWarning className='w-1/5 size-7'/>
            <div className='w-3/5'>
              {notification.current_notification}
            </div>
            <IoClose className='w-1/5 size-8 hover:cursor-pointer' onClick={() => handleClose(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertComponent;
