import React, { useRef, useEffect } from 'react';

const Video = ({ peerId, debug }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Aquí puedes implementar la lógica para obtener y mostrar el stream de video
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error al obtener el stream de video:', error);
      }
    };

    getVideoStream();

    // Si deseas detener el stream cuando el componente se desmonte, puedes hacerlo aquí
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {debug && <p>Peer ID: {peerId}</p>}
      <video ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

export default Video;
