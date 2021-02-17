import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { createContext, ReactNode } from "react";

const fbapp = firebase.initializeApp({
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

fbapp.analytics();

export const FirebaseContext = createContext<
  ReturnType<typeof firebase.initializeApp>
>(undefined!);

interface FirebaseProps {
  children: ReactNode;
}

export function Firebase({ children }: FirebaseProps) {
  return (
    <FirebaseContext.Provider value={fbapp}>
      {children}
    </FirebaseContext.Provider>
  );
}
