import {useState, useRef, useEffect} from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');
const SquidVoiceChat = ({socket}) => {
    
    const [currentUserid, setCurrentUserId] = useState('');

    // references to the video stream of the own camera
    const currentUserVideo = useRef();
    //reference to the stream of the camera of the other user
    const targetUserVideo  = useRef();
    
    const connectionRef = useRef();
    const [currentUserName, setCurrentUserName] = useState('');

    const [stream, setStream] = useState();

    const [callSource, setCallSource] = useState('');
    const [callSignal, setCallSignal] = useState('');
    const [callName, setCallName] = useState('');
    const [targetCallId, setTargetCallId] = useState('');

    const [isReceivingCall, setIsReceivingCall] = useState(false);
    const [isCallAccepted, setIsCallAccepted] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);

    useEffect(() => {
        //get video of the current video from the webcam
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(stream => {
                setStream(stream);
                currentUserVideo.current.srcObject = stream;
            });

        //get current id from server
        socket.on('me', id => {
            setCurrentUserId(id);
        });

        //runs if a user is calling
        socket.on('callUser', (data) => {
            setIsReceivingCall(true);
            setCallSource(data.from);
            setCallName(data.name);
            setCallSignal(data.signal);
        })
    }, []);

    /**
     * Used to call a user by an id
     * @param {*} id the id of the user that should be called
     */
    const handleCallUser = (id) => {
        //establish a peer to peer connection
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on('signal', data => {
            socket.emit('callUser',  {
                userToCall: id,
                signalData: data,
                from: currentUserid,
                name: currentUserName
            })
        })

        peer.on('stream', stream => {
            targetUserVideo.current.srcObject = stream;
        })

        socket.on('callAccepted', signal => {
            setIsCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    const answerCall = () => {
        setIsCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', data => {
            socket.emit('answerCall', {signal: data, to: callSource})
        });

        peer.on('stream', stream => {
            targetUserVideo.current.srcObject = stream;
        })

        peer.signal(callSignal);
        connectionRef.current = peer;
    }


    const cancelCall = () => {
        setIsCallEnded(true);
        connectionRef.current.destroy();
    }

    return ( 
        <div className="voiceChat">
            <div className="header">
                <span className="title">Sprachchat</span>
            </div>
            <div className="body">
                <div className="wrapperVideos">
                    {stream && <video playsInline muted ref = {currentUserVideo} autoPlay />}
                    {isCallAccepted && !isCallEnded && <video playsInline red={targetUserVideo} autoPlay/>}
                </div>
            <div className="callControl">
                <span>Dein Name</span>
                <input type="text" value={currentUserName} onChange={(e) => {setCurrentUserName(e.target.value)}}/>
                <label>Deine Call-Id</label>
                <input type="text" value={currentUserid} readOnly/>
                <label>Zielbenutzer</label>
                <input type="text" value={targetCallId} onChange={(e) => {setTargetCallId(e.target.value)}} />

                <div className="buttons">
                    {isCallAccepted && !isCallEnded &&
                        <button className="endCallButton" onCLick={cancelCall}>Anruf beenden</button>
                    }

                    {(!isCallAccepted || isCallEnded) &&
                        <button className="startCallButton" onClick={handleCallUser(targetCallId)}>Anrufen</button>
                    }
                </div>

                {isReceivingCall && !isCallAccepted &&
                    <div>
                        <span>Eingehender Anruf von {callName}</span>
                        <button onClick={answerCall}>Annehmen</button>
                    </div>
                }
                
                


            </div>
            </div>
        </div>
     );
}
 
export default SquidVoiceChat;