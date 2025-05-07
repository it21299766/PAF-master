import React, { useEffect, useState } from "react";
// import "./mealplan.css";
import Mealplan from "../../components/Mealplan";
import { getAllMealplan } from "../../util/APIUtils";
import { getAllmealplan } from "../../util/APIUtils";
import { toast } from "react-toastify";
import PostLoader from "../../components/PostLoader";
import CreateMealplan from "../../components/CreateMealplan";
//-------------------------
//import CreatePostModal from '../PostCard/CreatePostModal';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

//-------------------------
const MealPlan_Page = ({ currentUser }) => {
  const [mealplans, setMealPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  

  const fetchAllMealPlan = async () => {
    setIsLoading(true);
    try {
      const response = await getAllMealplan();
      setMealPlan(response.reverse());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  useEffect(() => {
    fetchAllMealPlan(); // Fetch both posts and mealplans separately
  }, []);

  const navigate = useNavigate();
  const { isOpen: ismealplanOpen, onOpen: onmealplanOpen, onClose: onmealplanClose } = useDisclosure();

  return (
    <div className="mealplan-container bg-indigo-100">
      <div className="container">
        <div className=" flex  gap-10 ">
           </div>
        <div className=" flex flex-col gap-10 ">
          <CreateMealplan currentUser={currentUser} refetchMealplans={fetchAllMealPlan} />

        </div>

        {/* <div>
          <button onClick={onmealplanOpen} className='rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-100 bg-indigo-500 ml-auto flex flex-col'>Create mealplan Plan</button>
          <Createmealplan onClose={onmealplanClose} isOpen={ismealplanOpen} currentUser={currentUser} refetchmealplans={fetchAllmealplan} className='flex justify-center items-center' />
        </div> */}

        <div>

          
          {isLoading ? (
            <PostLoader />
          ) : (
            <>
              {mealplans.map(mealplan => (
                <Mealplan
                  key={mealplan.id}
                  currentUser={currentUser}
                  refetchMealplans={fetchAllMealPlan}
                  {...mealplan}
                />
              ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default MealPlan_Page;
