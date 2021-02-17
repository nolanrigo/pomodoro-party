import React, { useContext } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { Participant } from "../models/participant";
import { AdaptativeGrid } from "./adaptative-grid";
import { FirebaseContext } from "./firebase";
import { ParticipantAvatar } from "./participant-avatar";

interface ParticipantsProps {}

export function Participants({}: ParticipantsProps) {
  const firebase = useContext(FirebaseContext);
  const [participants, loading] = useListVals<Participant>(
    firebase.database().ref("participants"),
  );

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <AdaptativeGrid className="w-auto mb-6" itemWidth={110}>
      {participants?.map(function (participant) {
        return (
          <div key={participant.id} className="h-full grid-span-1">
            <ParticipantAvatar participant={participant} />
          </div>
        );
      }) ?? []}
    </AdaptativeGrid>
  );
}
