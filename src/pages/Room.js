import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Hls from 'hls.js';

const socket = io(process.env.REACT_APP_SERVER);

export default function Room() {
  const { roomId } = useParams();
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    socket.emit('join-room', { roomId });

    socket.on('video-url', (url) => {
      setVideoUrl(url);
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
      } else {
        videoRef.current.src = url;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl mb-4">Room: {roomId}</h1>
      <video ref={videoRef} controls className="w-full max-w-4xl" />
    </div>
  );
}
