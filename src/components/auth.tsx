import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { generateAvatar } from "../helpers/avatar";
import { FirebaseContext } from "./firebase";

export interface AuthProps {
  children: ReactNode;
}

export const UserId = createContext<string | undefined>(undefined);

export function Auth({ children }: AuthProps) {
  const [id, setId] = useState<string | undefined>(undefined);
  const firebase = useContext(FirebaseContext);

  useEffect(
    function () {
      (async function authenticate() {
        const auth = firebase.auth();
        const db = firebase.database();

        const { user } = await auth.signInAnonymously();

        if (user) {
          const ref = db.ref(`participants/${user.uid}`);

          // Create Default data if it doesn't exist
          await ref.transaction(function (data) {
            if (data) {
              return {
                ...data,
                active: true,
              };
            }

            return {
              id: user.uid,
              active: true,
              name: "Minion",
              avatar: generateAvatar(),
            };
          });

          setId(user.uid);
        }
      })();
    },
    [firebase],
  );

  return <UserId.Provider value={id}>{children}</UserId.Provider>;
}
