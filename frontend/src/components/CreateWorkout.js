import React, { useReducer } from "react";
import { toast } from "react-toastify";
import { createWorkout } from "../util/APIUtils";
// import ImageUploader from './ImageUploader';

const CreateWorkout = ({ currentUser, refetchWorkouts }) => {
  const initialState = {
    description: "",
    message1: "",
    message2: "",
    message3: "",
    postType: "",
    fileUrl_WO: [], // Updated to handle multiple files
    userId: currentUser.id
  };

  const [workout, setWorkout] = useReducer((prevState, newState) => {
    return { ...prevState, ...newState };
  }, initialState);

  const handleDescription = event => {
    setWorkout({ description: event.target.value });
  };

  const handleMessage1 = event => {
    setWorkout({ message1: event.target.value });
  };

  const handleMessage2 = event => {
    setWorkout({ message2: event.target.value });
  };

  const handleMessage3 = event => {
    setWorkout({ message3: event.target.value });
  };
  const handleCategoryChange = event => {
    setWorkout({ postType: event.target.value });
  };

  const submitPost = async () => {
    if (!workout.description) {
      toast("Post description is mandatory", { type: "error" });
      return;
    }
    if (!workout.postType) {
      toast("Post Type is mandatory", { type: "error" });
      return;
    }
    if (workout.fileUrl_WO.length === 0) {
      toast("Please attach atleast 1 image", { type: "error" });
      return;
    }

    try {
      const response = await createWorkout(workout);
      if (response) {
        toast("Post successfully created!", { type: "success" });
        setWorkout({ ...initialState });
        refetchWorkouts();
      }
    } catch (error) {
      console.log(error);
      toast("Oops! Something went wrong.", { type: "error" });
    }
  };

  const handleImageChangeW = event => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    if (files.length > 4) {
      alert("Please select up to 4 images");
      return;
    }

    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then(base64Images => {
        setWorkout({ fileUrl_WO: base64Images });
      })
      .catch(error => {
        toast("Error converting images to base64:", { type: "error" });
      });
  };

  return (
    <>
      <div
        className="mt-10 mb-10 editor mx-auto w-10/12 flex flex-col text-gray-800 border rounded-lg border-black p-4 shadow-lg max-w-2xl">
        {/* Dropdown for selecting category */}
        <select
          onChange={handleCategoryChange}
          className="mb-4 p-2 rounded-lg bg-gray-200 text-black border border-gray-200 outline-none"
        >
          <option value="">Select Category</option>
          <option value="Workout Plan">Workout Plan</option>
        </select>
        <div className="flex flex-col gap-10">
          <textarea
            onChange={handleDescription}
            value={workout.description}
            className="description bg-gray-200 rounded-lg sec p-3 h-50 border text-black border-black outline-none"
            spellCheck="false"
            placeholder="Describe everything about here"
          ></textarea>

          <textarea
            onChange={handleMessage1}
            value={workout.message1}
            className="description bg-gray-200 rounded-lg sec p-3 h-50 border text-black border-black outline-none"
            spellCheck="false"
            placeholder="workout name"
          ></textarea>

          <textarea
            onChange={handleMessage2}
            value={workout.message2}
            className="description bg-gray-200 rounded-lg sec p-3 h-50 border text-black border-black outline-none"
            spellCheck="false"
            placeholder="workout sets"
          ></textarea>

          <textarea
            onChange={handleMessage3}
            value={workout.message3}
            className="description bg-gray-200 rounded-lg sec p-3 h-50 border text-black border-black outline-none"
            spellCheck="false"
            placeholder="workout reps"
          ></textarea>

        </div>
        <input
          id="attachments"
          value=""
          type="file"
          accept="image/*,video/*"
          onChange={handleImageChangeW}
          multiple
          className="hidden"
        />
        <div className="flex">
          {workout.fileUrl_WO.map((fileUrl_WO, index) => {
            // Check if the URL is for an image or video
            const isImage = fileUrl_WO.startsWith('data:image');
            const isVideo = fileUrl_WO.startsWith('data:video');

            return (
              <div key={index} className="w-40 p-2">
                {isImage ? (
                  <img
                    src={fileUrl_WO}
                    className="w-full h-auto"
                    alt={`Selected image ${index + 1}`}
                  />
                ) : isVideo ? (
                  <video
                    controls
                    autoPlay
                    muted
                    className="w-full h-auto"
                    loop
                  >
                    <source src={fileUrl_WO} type="video/mp4" />
                    {/* Assuming MP4 format */}
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="icons flex text-black 0 m-2">
          <label htmlFor="attachments">
            <div
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer
               hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none"
                stroke="#fc5858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>

              <span className="sr-only">Upload Files</span>
            </div>
          </label>
          <div className="count ml-auto">
            <div className="buttons flex">
              <div
                onClick={submitPost}
                className="rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto"
              >
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWorkout;
