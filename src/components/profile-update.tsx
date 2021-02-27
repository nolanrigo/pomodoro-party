import { update } from "@nandorojo/swr-firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Participant } from "../models/participant";

export interface ProfileUpdateProps {
  me: Participant;
  onClose: () => void;
}

interface Form {
  name: string;
  soundMuted: boolean;
}

export function ProfileUpdate({ me, onClose }: ProfileUpdateProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: { name: me.name, soundMuted: me.soundMuted },
  });

  return (
    <div
      className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <form
        onSubmit={handleSubmit(async function ({ name, soundMuted }) {
          if (loading) {
            return;
          }

          setLoading(true);
          await update(`participants/${me.id}`, {
            name,
            soundMuted,
          });
          setLoading(false);
          onClose();
        })}
      >
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="mb-2 text-lg font-medium text-gray-900 leading-6">
              Update profile
            </h3>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 leading-5"
              >
                Name
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  ref={register({ required: true })}
                  className="block w-full form-input sm:text-sm sm:leading-5"
                  placeholder="your name"
                />
              </div>
            </div>
            <div className="w-full my-5" />
            <div className="flex items-center mb-2">
              <input
                id="soundMuted"
                name="soundMuted"
                type="checkbox"
                className="w-4 h-4 text-blue-600 form-checkbox transition duration-150 ease-in-out"
                ref={register}
              />
              <label
                htmlFor="soundMuted"
                className="block ml-2 text-sm text-gray-900 leading-5"
              >
                Sound muted
              </label>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            disabled={loading}
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            save
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-4 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
