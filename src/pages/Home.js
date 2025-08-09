import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const joinRoom = () => {
    if (roomId) navigate(`/room/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-4">DreamZone</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        className="p-2 text-black mb-4"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={joinRoom}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
      >
        Join Room
      </button>
    </div>
  );
}
