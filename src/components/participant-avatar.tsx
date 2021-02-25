import Avatar from "avataaars";
import React, { useContext } from "react";
import { Participant } from "../models/participant";
import { UserId } from "./auth";

interface ParticipantAvatarProps {
  participant: Participant;
}

export function ParticipantAvatar({ participant }: ParticipantAvatarProps) {
  const { name, avatar, id } = participant;
  const userId = useContext(UserId);

  return (
    <div className="flex flex-col items-center block w-full rounded-md">
      <Avatar
        pieceSize="1050px"
        style={{ width: "100%", height: "auto" }}
        avatarStyle={avatar.style}
        topType={avatar.top}
        accessoriesType={avatar.accessories}
        hairColor={avatar.hairColor}
        facialHairType={avatar.facialHair}
        facialHairColor={avatar.facialHairColor}
        clotheType={avatar.clothe}
        clotheColor={avatar.clotheColor}
        graphicType={avatar.graphic}
        eyeType={avatar.eye}
        eyebrowType={avatar.eyebrow}
        mouthType={avatar.mouth}
        skinColor={avatar.skinColor}
      />
      <h4 className="mt-2 text-sm tracking-tight text-900-100">
        <span className="font-extrabold">{name}</span>{" "}
        {userId && id === userId ? "(you)" : null}
      </h4>
    </div>
  );
}
