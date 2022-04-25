//Made by Ishan Arefin

import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom" 
import { Card, Button } from 'react-bootstrap'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Home() {
  	const {currentUser} = useAuth()
  	const [isRecording, setisRecording] = useState(false); //State variable to determine the recording state of the microphone (on/off)
  	const [note, setNote] = useState(null); //State variable to display the current voice note
  	const [notesStore, setnotesStore] = useState([]); //This array holds the notes that we have saved

	//This code below is in charge of initializing a microphone
  	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  	const microphone = new SpeechRecognition();

	//Properties of the microphone
  	microphone.continuous = true; 
  	microphone.interimResults = true; 
  	microphone.lang = "en-US"; //Language that the microphone can understand

	//This use effect is here so that mounting is controlled by isRecording button.
	useEffect(() => {
		startRecordController();
	}, [isRecording]);

	//This function is in charge of (1) listening to speech (2) converting result to text (3) sets the ntoe state to display in the screen
	const startRecordController = () => {
		if(isRecording){
			microphone.start(); //start the mic 
			microphone.onend = () => {
				console.log("Started microphone")
			}
		}
		else{
			microphone.stop();
			console.log("stopped")
			microphone.onend = () => {
				console.log("Stopped microphone");
			}
		}

		microphone.onresult = (event) => {
			const recordingResult = Array.from(event.results)
			  .map((result) => result[0])
			  .map((result) => result.transcript)
			  .join("");
			
			console.log(recordingResult);
			setNote(recordingResult);
		}

	};
  
	//Storing a note in the front end 
	const storeNote = () => {
		setnotesStore([...notesStore, note]);
		setNote("");
  	};

  return (
        	<div className="functionality">
        		<h2 className="text-center mb-4">Welcome user with email {currentUser.email}</h2>
    			<h2>Record Voice Notes</h2>
        		<div>
        			<div className="noteContainer">
              			{isRecording ? <span>Recording... </span> : <span>Stopped </span>}
              			<h2>Record Note Here</h2>
              			<Button className="button" onClick={storeNote} disabled={!note}>Save</Button>
              			<Button onClick={() => setisRecording((prevState) => !prevState)}>Start/Stop</Button>
              			<p>{note}</p>
            		</div>
            		<div className="noteContainer">
              			<h2>Notes Store</h2>
              			{notesStore.map((note) => (
                		<p key={note}>{note}</p>
              			))}
            		</div>
          		</div>
        	</div>
  )
}
