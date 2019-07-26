import * as firebase from "firebase";
import "firebase/database";

const config = {
  apiKey: "AIzaSyD7tbtpZ06BRN4IL78FeZMrDiVIUD7ABHU",
  authDomain: "vuetesting-9a923.firebaseapp.com",
  databaseURL: "https://vuetesting-9a923.firebaseio.com/",
  storageBucket: "vuetesting-9a923.appspot.com"
};
const app = firebase.initializeApp(config);
export const db = app.database();
export const eventlist = db.ref("events");
