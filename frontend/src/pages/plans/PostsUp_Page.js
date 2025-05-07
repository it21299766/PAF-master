import React, { useEffect, useState } from "react";
// import "./Workout.css";
import Post from "../../components/Post";
import Workout from "../../components/Workout";
import { getAllPost } from "../../util/APIUtils";
import { getAllWorkout } from "../../util/APIUtils";
import { toast } from "react-toastify";
import CreatePost from "../../components/CreatePost";
import PostLoader from "../../components/PostLoader";
import CreateWorkout from "../../components/CreateWorkout";
//-------------------------
//import CreatePostModal from '../PostCard/CreatePostModal';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

//-------------------------
const PostsUp_Page = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]);
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

  

  useEffect(() => {
    fetchAllPost();
  }, []);

  const navigate = useNavigate();
  const { isOpen: isWorkoutOpen, onOpen: onWorkoutOpen, onClose: onWorkoutClose } = useDisclosure();

  return (
    <div className="Workout-container bg-indigo-100">
      <div className="container">
        <div className=" flex  gap-10 ">
           </div>
        <div className=" flex flex-col gap-10 ">
        <CreatePost currentUser={currentUser} refetchPosts={fetchAllPost} />

        </div>

        {/* <div>
          <button onClick={onWorkoutOpen} className='rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto flex flex-col'>Create Workout Plan</button>
          <CreateWorkout onClose={onWorkoutClose} isOpen={isWorkoutOpen} currentUser={currentUser} refetchWorkouts={fetchAllWorkout} className='flex justify-center items-center' />
        </div> */}

        <div>

          
         
          {isLoading ? (
            <PostLoader />
          ) : (
            <>
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
        </div>

      </div>
    </div>
  );
};

export default PostsUp_Page;
