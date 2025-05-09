/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import "./Profile.css";
import CreatePost from "../../../components/CreatePost";
import Post from "../../../components/Post";
import {
  deleteProfileById,
  getAllPost,
  getCurrentUser
} from "../../../util/APIUtils";
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "../../../constants";
import { useNavigate } from "react-router";
import EditUserModal from "../../../components/EditUserModal";
import PostLoader from "../../../components/PostLoader";

const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(currentUser);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refetchUser = async () => {
    try {
      const response = await getCurrentUser();
      if (!response) return;

      setUser(response);
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const fetchAllPost = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getAllPost();
      setIsLoading(false)
      if (!response.length) return;
      setPosts(response.reverse().filter(post => post.userId === user.id));

    } catch (error) {
      setIsLoading(false)
      toast("Oops something went wrong!", { type: "error" });
    }
  }, [user.id]);

  useEffect(() => {
    fetchAllPost();
  }, [fetchAllPost]);

  const editProfile = async () => {
    setOpen(true);
  };

  const deleteProfile = async () => {
    try {
      const response = await deleteProfileById(user.id);
      if (response != null) {
        toast("profile remove successfully", { type: "success" });
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = "/login";
      }
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  const handleSharedPosts = () => {
    navigate("/shared");
  };

  return (
    <>
      <header aria-label="Page Header" className="bg-indigo-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col items-center justify-center">
            <a href="#" className="block shrink-0">
              <span className="sr-only">Profile</span>
              <img
                alt={user.name}
                src={user.imageUrl}
                className="h-100 w-100 mb-2 rounded-full object-cover"
              />
            </a>
            <h1 className="text-2xl font-bold text-black sm:text-3xl">
              Welcome Back, {user.name}
            </h1>

            <p className="mt-1.5 text-sm text-black">{user.email}</p>
          </div>

          <div className="flex mt-4 selection:items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  onClick={handleSharedPosts}
                  className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black bg-amber-400 ml-auto"
                >
                  Shared Posts
                </div>
              </div>

              <div className="relative">
                <div
                  onClick={editProfile}
                  className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black bg-blue-700 ml-auto"
                >
                  Edit Profile
                </div>
              </div>

              <div
                onClick={deleteProfile}
                className="rounded-md p-1 px-4 font-semibold cursor-pointer text-black bg-rose-500 ml-auto"
              >
                Delete Profile
              </div>
            </div>
          </div>
        </div>
        <div className="count ml-auto">
          <div className="buttons flex"></div>
        </div>
      </header>

      <div className="home-container bg-indigo-100">
        <div className="container">
          <CreatePost currentUser={currentUser} refetchPosts={fetchAllPost} />

          {isLoading ? (
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
          )}
        </div>
      </div>

      <EditUserModal
        open={open}
        setOpen={setOpen}
        currentUser={user}
        refetchUser={refetchUser}
      />
    </>
  );
};

export default Profile;
