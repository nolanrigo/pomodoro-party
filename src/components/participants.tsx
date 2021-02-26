import { useCollection } from "@nandorojo/swr-firestore";
import subMinutes from "date-fns/subMinutes";
import React, { useMemo } from "react";
import { minutes, seconds } from "../helpers/time";
import { Participant } from "../models/participant";
import { AdaptativeGrid } from "./adaptative-grid";
import { ParticipantAvatar } from "./participant-avatar";
import { useNow } from "./use-now";

interface ParticipantsProps {}

export function Participants({}: ParticipantsProps) {
  const nowShortTime = useNow(seconds(20));
  const nowLongTime = useNow(minutes(10));

  const { data: participants, loading } = useCollection<Participant>(
    "participants",
    {
      listen: true,
      where: ["lastActivityAt", ">=", subMinutes(nowLongTime, 5).getTime()],
    },
  );

  const activeParticipants = useMemo(
    function () {
      return (
        participants?.filter(function (participant) {
          return (
            participant.lastActivityAt >= subMinutes(nowShortTime, 5).getTime()
          );
        }) ?? []
      );
    },
    [participants, nowShortTime],
  );

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <AdaptativeGrid className="w-auto mb-6" itemWidth={110}>
      {activeParticipants.map(function (participant) {
        return (
          <div key={participant.id} className="h-full grid-span-1">
            <ParticipantAvatar participant={participant} />
          </div>
        );
      }) ?? []}
    </AdaptativeGrid>
  );
}
