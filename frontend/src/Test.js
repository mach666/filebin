import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import axios from 'axios'


const firebaseConfig = {
    apiKey: "AIzaSyCOkD1kEn3lsUSQVg_eRu0P2w8V8pJwNy8",
    authDomain: "file-upload-86a10.firebaseapp.com",
    projectId: "file-upload-86a10",
    storageBucket: "file-upload-86a10.appspot.com",
    messagingSenderId: "27501461586",
    appId: "1:27501461586:web:2a3710e16830247d1ddf8b",
    measurementId: "G-THLCP4DVGN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log("firebase connected");

 
  class ProfilePage extends Component {
    state = {

      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: ""
    };
   
  
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => 
         { axios.post('http://localhost:8000/newurl',{firebaseurl:url,headers:{"Content-type":"application/json"}})
           .then(Res=>{console.log(Res)}).catch(Err=>{console.log(Err)})
           this.setState({ avatarURL: url })});
    };
   
    render() {
      return (
        <div>
         
            <label>Avatar:</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        
            { console.log( this.state.avatarURL)}
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />

        </div>
      );
    }
  }
   
  export default ProfilePage;