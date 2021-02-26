import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export { FuegoProvider } from "@nandorojo/swr-firestore";

type Config = Parameters<typeof firebase.initializeApp>[0];

export class Fuego {
  public db: ReturnType<firebase.app.App["firestore"]>;
  public auth: typeof firebase.auth;
  public functions: typeof firebase.functions;
  public storage: typeof firebase.storage;
  constructor(config: Config) {
    this.db = !firebase.apps.length
      ? firebase.initializeApp(config).firestore()
      : firebase.app().firestore();
    this.auth = firebase.auth;
    this.functions = firebase.functions;
    this.storage = firebase.storage;
  }
}

export const fuego = new Fuego({
  apiKey: "AIzaSyCggMG2YSSLH3hzDCMEVXqElZ_507Je8dI",
  authDomain: "pomodoro-party.firebaseapp.com",
  databaseURL:
    "https://pomodoro-party-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pomodoro-party",
  storageBucket: "pomodoro-party.appspot.com",
  messagingSenderId: "52233868972",
  appId: "1:52233868972:web:a92ee339bcd86a72087109",
  measurementId: "G-VYD3693DZJ",
});
