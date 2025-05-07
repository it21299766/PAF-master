import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../../components/Post";
import Workout from "../../components/Workout";
import Mealplan from "../../components/Mealplan";
import { getAllWorkout, getAllMealplan, getAllPost } from "../../util/APIUtils";
import { toast } from "react-toastify";
import CreatePost from "../../components/CreatePost";
import PostLoader from "../../components/PostLoader";
import CreateWorkout from "../../components/CreateWorkout";
//-------------------------
//import CreatePostModal from '../PostCard/CreatePostModal';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

//-------------------------
const Home = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [mealplans, setMealplans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllPost = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPost();
      setPosts(response.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const fetchAllWorkout = async () => {
    setIsLoading(true);
    try {
      const response = await getAllWorkout();
      setWorkouts(response.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const fetchAllMealplan = async () => {
    setIsLoading(true);
    try {
      const response = await getAllMealplan();
      setMealplans(response.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  useEffect(() => {
    fetchAllPost();
    fetchAllWorkout(); // Fetch both posts and workouts separately
    fetchAllMealplan();
  }, []);

  // const fetchAllPost = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await getAllPost();
  //     setPosts(response.reverse());
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast("Oops something went wrong!", { type: "error" });
  //   }
  // };

  const WorkoutPlan = (title) => {
    navigate("/WorkoutPlan");
  };

  const MealPlan = (title) => {
    navigate("/MealPlan");
  };

  const PostsUp = (title) => {
    navigate("/PostsUp");
  };

  const navigate = useNavigate();
  const { isOpen: isWorkoutOpen, onOpen: onWorkoutOpen, onClose: onWorkoutClose } = useDisclosure();

  return (
    <div className="home-container bg-indigo-100">
      <div className="container flex flex-col">

        <div className="  ">
          <button onClick={WorkoutPlan} className='mx-2 rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto '> Workout </button>
          <button onClick={MealPlan} className='mx-2 rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto '> Meal Plan</button>
          <button onClick={PostsUp} className='mx-2 rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto '> Posts </button>

        </div>

        {/* <div className=" flex flex-col gap-10 ">
          <CreateWorkout currentUser={currentUser} refetchWorkouts={fetchAllWorkout} />
          <CreatePost currentUser={currentUser} refetchPosts={fetchAllPost} />

        </div> */}

        {/* <div>
          <button onClick={onWorkoutOpen} className='rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto flex flex-col'>Create Workout Plan</button>
          <CreateWorkout onClose={onWorkoutClose} isOpen={isWorkoutOpen} currentUser={currentUser} refetchWorkouts={fetchAllWorkout} className='flex justify-center items-center' />
        </div> */}

        <div className="">
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
        </div>

        <div>
          {isLoading ? (
            <PostLoader />
          ) : (
            <>
              <h2 className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md bg-opacity-0">
                  Posts
                </span>
              </h2>
              {posts.map(post => (
                <Post
                  key={post.id}
                  currentUser={currentUser}
                  refetchPosts={fetchAllPost}
                  {...post}
                />
              ))}
            </>
          )}
          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

          {isLoading ? (
            <PostLoader />
          ) : (
            <>
              <h2 className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md bg-opacity-0">
                  Workouts
                </span>
              </h2>

              {workouts.map(workout => (
                <Workout
                  key={workout.id}
                  currentUser={currentUser}
                  refetchWorkouts={fetchAllWorkout}
                  {...workout}
                />
              ))}
            </>
          )}

          <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />

          {isLoading ? (
            <PostLoader />
          ) : (
            <>
              <h2 className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md bg-opacity-0">
                  Meal plan
                </span>
              </h2>

              {mealplans.map(mealplan => (
                <Mealplan
                  key={mealplan.id}
                  currentUser={currentUser}
                  refetchMealplans={fetchAllMealplan}
                  {...mealplan}
                />
              ))}
            </>
          )}
        </div>

        {/* {isLoading ? (
          <PostLoader />
        ) : (
          posts.map(post => (
            <Post
              key={post.id}
              currentUser={currentUser}
              refetchPosts={fetchAllPost}
              {...post}
            />
          
          ))
        )} */}

      </div>
    </div>
  );
};

export default Home;
