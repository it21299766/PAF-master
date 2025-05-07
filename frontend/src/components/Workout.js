/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import { toast } from "react-toastify";
import { deleteWorkout } from "../util/APIUtils";
import WorkoutEditModal from "./WorkoutEditModal";
import CommentBoxWO from "./CommentBoxWO";
import CommentWO from "./CommentWO";

const Workout = props => {
  const [workout, setWorkout] = useState(props);
  const [open, setOpen] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false); // State for tracking whether details are expanded
  const { shared } = props;

  const updateComment = comment => {
    setWorkout({ ...workout, comments: [comment, ...workout.comments] });
  };

  const updateDeletedComment = id => {
    setWorkout({
      ...workout,
      comments: workout.comments.filter(comment => comment.id !== id)
    });
  };

  const handleDeleteWorkout = async () => {
    try {
      const response = await deleteWorkout(workout.id);
      if (response) {
        toast("Post deleted successfully", { type: "success" });
        props.refetchWorkouts();
      }
    } catch (error) {
      toast("Oops, Something went wrong", { type: "error" });
    }
  };

  const handleEditWorkout = () => {
    // edit post
    setOpen(true);
  };

  const isOwner = workout.userId === props.currentUser.id;

  return (
    <div className="editor mx-auto my-6 w-10/12 flex flex-col border border-black max-w-2xl">
      <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0"></div>
          {!shared && isOwner && (
            <div className="inline-flex items-right text-base font-semibold text-black">
              <div
                type="button"
                onClick={handleDeleteWorkout}
                className="inline-flex justify-center p-2 text-black rounded-lg cursor-pointer hover:text-gray-700 hover:bg-white dark:text-black dark:hover:text-black dark:hover:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <div
                type="button"
                onClick={handleEditWorkout}
                className="inline-flex justify-center p-2 text-black rounded-lg cursor-pointer hover:text-gray-700 hover:bg-white dark:text-black dark:hover:text-black dark:hover:bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-200 p-4 sm:p-6">
          <p className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black bg-gray-200 ml-auto">
            {props.postType}</p>

        </div>
        <div className="container mx-auto">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {workout.fileUrl_WO?.length > 0 &&
              workout.fileUrl_WO.map((fileUrl, i) => {
                const isImage = fileUrl.startsWith("data:image");
                const isVideo = fileUrl.startsWith("data:video");

                return (
                  <div key={i} className="flex w-1/2 flex-wrap">
                    <div className="w-full p-1 md:p-2">
                      {isImage ? (
                        <img
                          alt={workout.title}
                          src={fileUrl}
                          className="block h-full w-full rounded-lg object-cover object-center"
                        />
                      ) : isVideo ? (
                        <video
                          controls
                          autoPlay
                          muted
                          alt={workout.title}
                          src={fileUrl}
                          className="block h-full w-full rounded-lg object-cover object-center"
                        />
                      ) : null}


                    </div>
                  </div>
                );
              })}
          </div>
        </div>


        <div className="bg-white p-4 sm:p-6">

          <time
            dateTime="2022-10-10"
            className=" text-start block text-xs text-black "
          >
            {new Date(props.postedTime).toISOString().split("T")[0]}
          </time>
          <p className="mt-2 text-start text-sm/relaxed text-black">
            {props.postType}</p>
        </div>


        <div className="bg-white p-4 sm:p-6 ">
          <button
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-t-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => setDetailsExpanded(!detailsExpanded)} // Toggle details expansion
          >
            {detailsExpanded ? "Details" : "Show Details"}
          </button>
          <hr style={{ display: detailsExpanded ? "block" : "none" }} />

          {/* Details section */}
          {detailsExpanded && (
            <>
              <p className="mt-2 text-start text-sm/relaxed text-black">
                Description: {props.description}
              </p>
              <p className="mt-2 text-start text-sm/relaxed text-black">
                Name: {props.message1}
              </p>
              <p className="mt-2 text-start text-sm/relaxed text-black">
                Sets: {props.message2}
              </p>
              <p className="mt-2 text-start text-sm/relaxed text-black">
                Reps: {props.message3}
              </p>
            </>
          )}
        </div>

        <div className="bg-white border-t text-black ">
          <CommentBoxWO {...props} shared={shared} updateComment={updateComment} />
        </div>
        <div className="bg-white border-t text-black ">
          {workout.comments.length > 0 &&
            workout.comments.map(comment => (
              <CommentWO
                key={comment.id}
                comment={comment}
                updateComment={updateDeletedComment}
                {...props}
              />
            ))}
        </div>
      </article>

      {open && (
        <WorkoutEditModal
          open={open}
          setOpen={setOpen}
          workout={workout}
          refetchWorkouts={props.refetchWorkouts}
        />
      )}
    </div>
  );
};

export default Workout;
