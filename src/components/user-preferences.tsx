import React, { useCallback, useState } from "react";
import { Participant } from "../models/participant";
import { ProfileUpdate } from "./profile-update";
import { Background, WormHole } from "./worm-hole";

interface UserPreferencesProps {
  me: Participant;
}

export function UserPreferences({ me }: UserPreferencesProps) {
  const [puOpen, setPuOpen] = useState<boolean>(false);

  const togglePu = useCallback(function () {
    setPuOpen((b) => !b);
  }, []);

  return (
    <div className="flex flex-col items-center my-12">
      <span className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 leading-6 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
          onClick={togglePu}
        >
          Edit my profile
        </button>
      </span>
      {puOpen ? (
        <WormHole>
          <Background onClick={togglePu}>
            <ProfileUpdate me={me} onClose={togglePu} />
          </Background>
        </WormHole>
      ) : null}
    </div>
  );
}
