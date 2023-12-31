import { useHuddle01 } from '@huddle01/react';
import { useLobby, useAudio, useVideo, useRoom, usePeers } from '@huddle01/react/hooks';
import React from 'react';
import Video from './Video';
import Audio from './Audio';
import camStream from './camStream';
import micStream from './micStream';

const App = () => {
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const { 
    fetchAudioStream, stopAudioStream, error: micError, 
    produceAudio, stopProducingAudio 
  } = useAudio();

  const { 
    fetchVideoStream, stopVideoStream, error: camError, 
    produceVideo, stopProducingVideo 
  } = useVideo(); 
  const { joinRoom, leaveRoom } = useRoom();

  const { peerIds } = usePeers();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize('YOUR_PROJECT_ID');
  }, []);

  return (
    <div>{isInitialized ? 'Hello World!' : 'Please initialize'}

      <div className="grid grid-cols-4">
        {peerIds.map((peerId, index) => (
          <div key={index}>
            <Video peerId={peerId} debug={true} />
          </div>
        ))}

        {peerIds.map((peerId, index) => (
          <div key={index}>
            <Audio peerId={peerId} debug={true} />
          </div>
        ))}
      </div>

      <button 
        disabled={joinLobby.isCallable} 
        onClick={() => joinLobby('YOUR_ROOM_ID')
      }>
        Join Lobby
      </button>

      {/* Mic */} 
      <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
        FETCH_AUDIO_STREAM
      </button>

      {/* Webcam */} 
      <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
        FETCH_VIDEO_STREAM
      </button>

      <button disabled={!joinRoom.isCallable} onClick={joinRoom}>
        JOIN_ROOM 
      </button>

      <button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
        LEAVE_ROOM 
      </button>

      <button disabled={!produceVideo.isCallable} onClick={() => produceVideo(camStream)}>
        Produce Cam  
      </button>

      <button disabled={!produceAudio.isCallable} onClick={() => produceAudio(micStream)}>
        Produce Mic  
      </button>

      <button disabled={!stopProducingVideo.isCallable} onClick={stopProducingVideo}>
        Stop Producing Cam  
      </button>

      <button disabled={!stopProducingAudio.isCallable} onClick={stopProducingAudio}>
        Stop Producing Mic  
      </button>

    </div>
  );
};
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

