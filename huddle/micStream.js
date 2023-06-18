import React, { useRef, useEffect } from 'react';

const Audio = ({ peerId, debug }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Aquí puedes implementar la lógica para obtener y mostrar el stream de audio
    const getAudioStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error al obtener el stream de audio:', error);
      }
    };

    getAudioStream();

    // Si deseas detener el stream cuando el componente se desmonte, puedes hacerlo aquí
    return () => {
      if (audioRef.current && audioRef.current.srcObject) {
        const stream = audioRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {debug && <p>Peer ID: {peerId}</p>}
      <audio ref={audioRef} autoPlay playsInline muted />
    </div>
  );
};

export default Audio;
