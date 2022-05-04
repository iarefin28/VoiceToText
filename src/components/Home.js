//Made by Ishan Arefin

import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom" 
import { Card, Button } from 'react-bootstrap'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { auth } from '../firebase';


export default function Home() {
  	const {currentUser, logout} = useAuth()
	const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
	const navigate = useNavigate()
	const [sessionStore, setsessionStore] = useState([]);
	
	function handleSave(){
		firebase.firestore().collection('recordings').add({
			createdBy: currentUser.email,
			text: transcript 
		})	

		storeNote();
		resetTranscript();
	}

	async function handleLogout(){
		try{
			await logout()
			navigate('./login')
		} catch{
			console.log("Failed to logout")
		}
	}

	const storeNote = () => {
		setsessionStore([...sessionStore, transcript]);
		resetTranscript();
	};

  	return (
    <Card>
		<Card.Body>
			<div className="wellog">
				<h2 >Welcome user with email {currentUser.email}</h2>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
        	
    		<h2>Record Voice Notes</h2>
        	<div>
    			<div className="noteContainer">
					<p>Microphone: {listening ? 'on' : 'off'}</p>
            		<h2>Record voice note here</h2>
          			<Button className="button" onClick={handleSave} disabled={!transcript}>Save</Button>
              		<Button onClick={SpeechRecognition.startListening}>Start</Button>
					<Button onClick={SpeechRecognition.stopListening}>Stop</Button>
              		<p>{transcript}</p>
            	</div>
          	</div>
			<div className="noteContainer">
          		<h2>Text added to database this session:</h2>
          		{sessionStore.map((transcript) => (
            	<p key={transcript}>{transcript}</p>
          		))}
        	</div> 
		</Card.Body> 
    </Card>
  	)
}
