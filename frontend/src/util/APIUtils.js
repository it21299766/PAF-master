import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function getAllPost() {
  return request({
    url: API_BASE_URL + "/api/v1/posts/",
    method: "GET"
  });
}


export function createPost(post) {
  return request({
    url: API_BASE_URL + "/api/v1/posts/",
    method: "POST",
    body: JSON.stringify(post)
  });
}


export function getAllUsers() {
  return request({
    url: API_BASE_URL + "/user/all",
    method: "GET"
  });
}

export function postComment(comment) {
  return request({
    url: API_BASE_URL + "/api/comments/",
    method: "POST",
    body: JSON.stringify(comment)
  });
}


export function likePost({ postId, userId }) {
  return request({
    url: API_BASE_URL + "/posts/" + postId + "/likes",
    method: "POST",
    body: JSON.stringify({ postId, userId })
  });
}

export function disLikePost({ likeId }) {
  return request({
    url: API_BASE_URL + "/posts/likes/" + likeId,
    method: "DELETE"
  });
}

export function sharePost(post) {
  return request({
    url: API_BASE_URL + "/api/v1/shared-posts",
    method: "POST",
    body: JSON.stringify(post)
  });
}

export function getPostById(id) {
  return request({
    url: API_BASE_URL + "/api/v1/posts/" + id,
    method: "GET"
  });
}



export function deleteComment(id, userId) {
  return request({
    url: API_BASE_URL + "/api/comments/" + id + "/" + userId,
    method: "DELETE"
  });
}

export function editComment(id, comment) {
  return request({
    url: API_BASE_URL + "/api/comments/" + id,
    method: "PUT",
    body: JSON.stringify(comment)
  });
}

export function deletePost(id) {
  return request({
    url: API_BASE_URL + "/api/v1/posts/" + id,
    method: "DELETE"
  });
}



export function deleteProfileById(id) {
  return request({
    url: API_BASE_URL + "/user/delete/" + id,
    method: "DELETE"
  });
}

export function updatePost(id, post) {
  return request({
    url: API_BASE_URL + "/api/v1/posts/" + id,
    method: "PUT",
    body: JSON.stringify(post)
  });
}




export function getSharedPosts() {
  return request({
    url: API_BASE_URL + "/api/v1/shared-posts",
    method: "GET"
  });
}

export function updateProfile(id, user) {
  return request({
    url: API_BASE_URL + "/user/edit/" + id,
    method: "PUT",
    body: JSON.stringify(user)
  });
}

export function deleteSharedPost(id) {
  return request({
    url: API_BASE_URL + "/api/v1/shared-posts/" + id,
    method: "DELETE"
  });
}

export function updateSharedPost(id, post) {
  return request({
    url: API_BASE_URL + "/api/v1/shared-posts/" + id,
    method: "PUT",
    body: JSON.stringify(post)
  });
}

//--------------------- workout start-------------------------

export function getAllWorkout() {
  return request({
    url: API_BASE_URL + "/api/v1/workouts/",
    method: "GET"
  });
}


export function createWorkout(workout) {
  return request({
    url: API_BASE_URL + "/api/v1/workouts/",
    method: "POST",
    body: JSON.stringify(workout)
  });
}

export function getWorkoutById(id) {
  return request({
    url: API_BASE_URL + "/api/v1/workouts/" + id,
    method: "GET"
  });
}


export function deleteWorkout(id) {
  return request({
    url: API_BASE_URL + "/api/v1/workouts/" + id,
    method: "DELETE"
  });
}

export function updateWorkout(id, workout) {
  return request({
    url: API_BASE_URL + "/api/v1/workouts/" + id,
    method: "PUT",
    body: JSON.stringify(workout)
  });
}

export function workoutComment(comment) {
  return request({
    url: API_BASE_URL + "/api/comments/",
    method: "POST",
    body: JSON.stringify(comment)
  });
}
//--comments--
export function postCommentWO(comment) {
  return request({
    url: API_BASE_URL + "/api/wo_comments/",
    method: "POST",
    body: JSON.stringify(comment)
  });
}


export function deleteCommentWO(id, userId) {
  return request({
    url: API_BASE_URL + "/api/wo_comments/" + id + "/" + userId,
    method: "DELETE"
  });
}

export function editCommentWO(id, comment) {
  return request({
    url: API_BASE_URL + "/api/wo_comments/" + id,
    method: "PUT",
    body: JSON.stringify(comment)
  });
}

//-------like workout
export function likeWorkout({ workoutId, userId }) {
  return request({
    url: API_BASE_URL + "/workouts/" + workoutId + "/likes",
    method: "POST",
    body: JSON.stringify({ workoutId, userId })
  });
}

export function disLikeWorkout({ likeId }) {
  return request({
    url: API_BASE_URL + "/workouts/likes/" + likeId, // Update endpoint to workouts
    method: "DELETE"
  });
}

//--------------------- workout end-------------------------



//--------------------- mealplan start-------------------------

export function getAllMealplan() {
  return request({
    url: API_BASE_URL + "/api/v1/mealplans/",
    method: "GET"
  });
}


export function createMealplan(mealplan) {
  return request({
    url: API_BASE_URL + "/api/v1/mealplans/",
    method: "POST",
    body: JSON.stringify(mealplan)
  });
}

export function getMealplanById(id) {
  return request({
    url: API_BASE_URL + "/api/v1/mealplans/" + id,
    method: "GET"
  });
}


export function deleteMealplan(id) {
  return request({
    url: API_BASE_URL + "/api/v1/mealplans/" + id,
    method: "DELETE"
  });
}

export function updateMealplan(id, mealplan) {
  return request({
    url: API_BASE_URL + "/api/v1/mealplans/" + id,
    method: "PUT",
    body: JSON.stringify(mealplan)
  });
}
//--comments--
export function postCommentMP(comment) {
  return request({
    url: API_BASE_URL + "/api/mp_comments/",
    method: "POST",
    body: JSON.stringify(comment)
  });
}


export function deleteCommentMP(id, userId) {
  return request({
    url: API_BASE_URL + "/api/mp_comments/" + id + "/" + userId,
    method: "DELETE"
  });
}

export function editCommentMP(id, comment) {
  return request({
    url: API_BASE_URL + "/api/mp_comments/" + id,
    method: "PUT",
    body: JSON.stringify(comment)
  });
}

//-------like workout
export function likeMealplan({ mealplanId, userId }) {
  return request({
    url: API_BASE_URL + "/mealplans/" + mealplanId + "/likes",
    method: "POST",
    body: JSON.stringify({ mealplanId, userId })
  });
}

export function disLikeMealplan({ likeId }) {
  return request({
    url: API_BASE_URL + "/mealplans/likes/" + likeId, // Update endpoint to workouts
    method: "DELETE"
  });
}

//--------------------- mealplan end-------------------------