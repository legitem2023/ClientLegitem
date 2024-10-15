import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { STARTCALL } from 'graphql/mutation';
import { CALL_RECIEVE } from 'graphql/subscriptions'; 

const VideoCall = () => {
    const [callActive, setCallActive] = useState(false);
    const [remoteStream, setRemoteStream] = useState(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
  
    // Mutation to start a call
    const [startCall] = useMutation(STARTCALL, {
      onCompleted: (data) => {
        console.log('Call started:', data);
        setCallActive(true);
      },
      onError: (error) => {
        console.error('Error starting call:', error);
      },
    });
  
    // Subscription for incoming calls
    useSubscription(CALL_RECIEVE, {
      onSubscriptionData: ({ subscriptionData }) => {
        const call = subscriptionData.data.callReceived;
        console.log('Incoming call from:', call.from);
        alert(`Incoming call from ${call.from.username}`);
        // Here, you can set up the WebRTC connection with the remote user
        setupWebRTC();
      },
    });
  
    const handleStartCall = () => {
      startCall({
        variables: {
          callInput: { from: '1', to: '2' }, // Replace with actual user IDs
        },
      });
    };
  
    const setupWebRTC = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
  
        localVideoRef.current.srcObject = localStream;
  
        const peerConnection = new RTCPeerConnection();
  
        // Add local stream to peer connection
        localStream.getTracks().forEach((track) =>
          peerConnection.addTrack(track, localStream)
        );
  
        // Handle remote stream
        peerConnection.ontrack = (event) => {
          const remoteStream = new MediaStream();
          remoteStream.addTrack(event.track);
          setRemoteStream(remoteStream);
          remoteVideoRef.current.srcObject = remoteStream;
        };
  
        // Create offer and set local description
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
  
        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
            // Send the candidate to the remote peer via your subscription system
          }
        };
      } catch (error) {
        console.error('Error setting up WebRTC:', error);
      }
    };
  
    return (
      <div>
        <h1>Video Call</h1>
        <button onClick={handleStartCall} disabled={callActive}>
          Start Call
        </button>
        <div>
          <video ref={localVideoRef} autoPlay muted />
          <video ref={remoteVideoRef} autoPlay />
        </div>
      </div>
    );
  };
  
  export default VideoCall;