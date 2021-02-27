import {
  Document,
  getDocument,
  set,
  update,
  useDocument,
} from "@nandorojo/swr-firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fuego } from "../fuego";
import { generateAvatar } from "../helpers/avatar";
import { minutes } from "../helpers/time";
import { Participant } from "../models/participant";
import { useNow } from "./use-now";

export interface MeProviderProps {
  children: ReactNode;
}

export const MeContext = createContext<
  Document<Participant> | undefined | null
>(undefined);

export function MeProvider({ children }: MeProviderProps) {
  const now = useNow(minutes(5));
  const [id, setId] = useState<string | undefined>(undefined);
  const { data } = useDocument<Participant>(id ? `participants/${id}` : null);

  useEffect(
    function () {
      if (id) {
        update<Participant>(`participants/${id}`, {
          lastActivityAt: Date.now(),
        });
      }
    },
    [id, now],
  );

  useEffect(function () {
    auth();

    async function auth() {
      const { user } = await fuego.auth().signInAnonymously();

      if (user) {
        const { uid: id } = user;
        const participant = await getDocument<Document<Participant>>(
          `participants/${id}`,
        );

        if (!participant.exists) {
          await set<Participant>(`participants/${id}`, {
            name: "Minion",
            avatar: generateAvatar(),
            soundMuted: false,
          });
        }

        setId(id);
      }
    }
  }, []);

  return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
}

export function useMe(): Document<Participant> | undefined {
  const me = useContext(MeContext);
  return me ?? undefined;
}
