const {initializeApp}= require("firebase/app")
const{getStorage}= require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyAo2w8uvo3f6zdgSOjunCl2Z2nH5vj59vY",
    projectId: "store-b05f3",
    storageBucket: "store-b05f3.appspot.com",
    appId: "1:500805242211:web:e3ce79240eb37d8d0cd756"
  };

const firebaseApp=initializeApp(firebaseConfig)
const storage=getStorage(firebaseApp)

module.exports={storage}