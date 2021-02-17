import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { UserId } from "./auth";
import { Clock } from "./clock";
import { Participants } from "./participants";
import { UserPreferences } from "./user-preferences";

export function App() {
  const id = useContext(UserId);

  return (
    <div className="px-6 pt-12 md:px-0">
      <Helmet bodyAttributes={{ class: "bg-gray-100" }} />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-light leading-10">
          Together we
        </h2>
        <Clock />
        {id ? <UserPreferences id={id} /> : null}
      </div>
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-8 text-2xl font-extrabold text-gray-800 tracking-light leading-8">
          You're not alone
        </h2>
      </div>
      <Participants />
    </div>
  );
}
