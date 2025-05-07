import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { updateWorkout , updateSharedPost } from "../util/APIUtils";

export default function WorkoutEditModal({
                                        open,
                                        setOpen,
                                        workout,
                                        refetchWorkouts,
                                        shared
                                      }) {
  const cancelButtonRef = useRef(null);
  const [message1, setMessage1] = useState(workout.message1 );
  const [message2, setMessage2] = useState(workout.message2);
  const [message3, setMessage3] = useState( workout.message3);
  const [description, setDescription] = useState(workout.description );
  const [postType, setPostType] = useState(workout.postType );
  
  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleMessage1 = event => {
    setMessage1(event.target.value);
  };

  const handleMessage2 = event => {
    setMessage2(event.target.value);
  };

  const handleMessage3 = event => {
    setMessage3(event.target.value);
  };

  const handleCategoryChange = event => {
    setPostType(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      if (shared) {
        updateShared();
        return;
      }

      const response = await updateWorkout(workout.id, { ...workout, 
        description,
         message1, 
         message2, 
         message3, 
         postType
       });

      if (response) {
        toast("Post updated successfully", { type: "success" });
        setOpen(false);
        setDescription("");
        refetchWorkouts();
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  const updateShared = async () => {
    try {
      const response = await updateSharedPost(workout.id, {
        ...workout,
        description,
        message1,
        message2,
        message3
      });

      if (response) {
        toast("Post updated successfully", { type: "success" });
        setOpen(false);
        setDescription("");
        refetchWorkouts();
      }
    } catch (error) {
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-orange-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit Post
                      </Dialog.Title>
                      {/* Dropdown for selecting category */}
                      <select
                        onChange={handleCategoryChange}
                        value={postType}
                        className="mb-4 p-2 rounded-lg bg-gray-100  border border-gray-300 outline-none"
                      >
                        <option value="">Select Category</option>
                        <option value="Workout Plan">Workout Plan</option>
                      </select>
                      <div className="mt-2">
                        <textarea
                          onChange={handleMessage1}
                          value={message1}
                          className="bg-gray-100 min-w-full rounded-lg p-3 h-60 border border-gray-300 outline-none"
                          spellCheck="false"
                        ></textarea>
                      </div>

                      <div className="mt-2">
                        <textarea
                          onChange={handleMessage2}
                          value={message2}
                          className="bg-gray-100 min-w-full rounded-lg p-3 h-60 border border-gray-300 outline-none"
                          spellCheck="false"
                        ></textarea>
                      </div>

                      <div className="mt-2">
                        <textarea
                          onChange={handleMessage3}
                          value={message3}
                          className="bg-gray-100 min-w-full rounded-lg p-3 h-60 border border-gray-300 outline-none"
                          spellCheck="false"
                        ></textarea>
                      </div>

                      <div className="mt-2">
                        <textarea
                          onChange={handleDescription}
                          value={description}
                          className="bg-gray-100 min-w-full rounded-lg p-3 h-60 border border-gray-300 outline-none"
                          spellCheck="false"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
