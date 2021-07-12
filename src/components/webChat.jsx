import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"


// const socket = io.connect('http://localhost:3001')
const WebChat = ({socket}) => {
    const [ currentUserId, setCurrentUserId ] = useState("")
	
    const [ stream, setStream ] = useState()

	const [ isReceivingCall, setIsReceivingCall ] = useState(false)
	
    const [ caller, setCaller ] = useState("")
	const [ callSignal, setCallSignal ] = useState()
	const [ isCallAccepted, setIsCallAccepted ] = useState(false)
	const [ targetCallId, setTargetCallId ] = useState("")
	const [ hasCallEnded, setHasCallEnded] = useState(false)
	const [ currentUserName, setCurrentUserName ] = useState("")
	
    const currentUserVideo = useRef()
	const targetUserVideo = useRef()
	
    const connectionRef= useRef()

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				currentUserVideo.current.srcObject = stream
		})

	socket.on("me", (id) => {
			setCurrentUserId(id)
		})

		socket.on("callUser", (data) => {
			setIsReceivingCall(true)
			setCaller(data.from)
			setCurrentUserName(data.name)
			setCallSignal(data.signal)
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: currentUserId,
				name: currentUserName
			})
		})
		peer.on("stream", (stream) => {
			
				targetUserVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setIsCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setIsCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			targetUserVideo.current.srcObject = stream
		})

		peer.signal(callSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setHasCallEnded(true)
		connectionRef.current.destroy()
	}

	return (
		<>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={currentUserVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{isCallAccepted && !hasCallEnded ?
					<video playsInline ref={targetUserVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				<TextField
					id="filled-basic"
					label="Name"
					variant="filled"
					value={currentUserName}
					onChange={(e) => setCurrentUserName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<CopyToClipboard text={currentUserId} style={{ marginBottom: "2rem" }}>
					<Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						Copy ID
					</Button>
				</CopyToClipboard>

				<TextField
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={targetCallId}
					onChange={(e) => setTargetCallId(e.target.value)}
				/>
				<div className="call-button">
					{isCallAccepted && !hasCallEnded ? (
						<Button variant="contained" color="secondary" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<IconButton color="primary" aria-label="call" onClick={() => callUser(targetCallId)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
					{targetCallId}
				</div>
			</div>
			<div>
				{isReceivingCall && !isCallAccepted ? (
						<div className="caller">
						<h1 >{currentUserName} is calling...</h1>
						<Button variant="contained" color="primary" onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</>
	)
}
 
export default WebChat;