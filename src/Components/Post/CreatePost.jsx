import styles from "./CreatePost.module.css";
import importedPostsArray from "../PostArray/PostsArray";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export function CreatePost({ selectedCategory }) {
  const [postsArray, setPostsArray] = useState([]);
  const [shuffledPosts, setShuffledPosts] = useState([]);
  const [postData, setPostData] = useState({
    userName: "",
    category: "",
    post: "",
  });
  const { searchTerm } = useOutletContext();

  useEffect(() => {
    const initializedPosts = importedPostsArray.map((post) => ({
      ...post,
      likes: Math.floor(Math.random() * 1000) + 1,
      isLiked: false,
    }));
    setShuffledPosts(shuffleArray(initializedPosts));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreatePost = () => {
    if (postData.userName && postData.category && postData.post) {
      const newPost = {
        ...postData,
        key: Date.now().toString(),
        likes: 0,
        isLiked: false,
      };
      setPostsArray([newPost, ...postsArray]);
      setPostData({
        key: "",
        userName: "",
        category: "",
        post: "",
      });
      toast.success("Post created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } else {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  const toggleLike = (key) => {
    const updateLikes = (posts) =>
      posts.map((post) =>
        post.key === key
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      );

    setPostsArray(updateLikes(postsArray));
    setShuffledPosts(updateLikes(shuffledPosts));
  };

  const combinedPosts = [...postsArray, ...shuffledPosts];

  const filteredPosts = combinedPosts.filter(
    (post) =>
      (selectedCategory === "" || post.category === selectedCategory) &&
      (post.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.post.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <ToastContainer />
      <div className={styles.createPostContainer}>
        <div className={styles.user}>
          <input
            type="text"
            value={postData.userName}
            placeholder="Your Name:"
            name="userName"
            className={styles.name}
            onChange={handleInputChange}
          />

          <select
            className={styles.postOptions}
            value={postData.category}
            name="category"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Category: “General“, “Streaming”, “Games”
            </option>
            <option value="General">General</option>
            <option value="Streaming">Streaming</option>
            <option value="Games">Games</option>
          </select>

          <textarea
            className={styles.postTextarea}
            value={postData.post}
            name="post"
            placeholder="Post:"
            onChange={handleInputChange}
            cols="30"
            rows="10"
          ></textarea>

          <button
            type="button"
            className={styles.button}
            onClick={handleCreatePost}
          >
            Create Post
          </button>
        </div>
      </div>

      <div className={styles.postListContainer}>
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.key} className={styles.postList}>
              <div className={styles.postContainerHeader}>
                <p className={styles.userName}>{post.userName}</p>
                <p>{post.category}</p>
                <div className={styles.headerLikes}>
                  <p>{post.likes} Likes</p>
                  <div
                    className={styles.iconCircle}
                    onClick={() => toggleLike(post.key)}
                  >
                    <svg
                      className={styles.icon}
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill={post.isLiked ? "#FF0000" : "#C5D0E6"} // Red if liked, else default color
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.28472 0.286348C0.582052 1.41945 -0.738149 5.24881 0.391497 8.59912C2.20862 13.9716 10.0014 18 10.0014 18C10.0014 18 17.8521 13.9096 19.6102 8.59912C20.7388 5.24881 19.4102 1.41945 15.7075 0.286348C13.762 -0.306707 11.5332 0.0733286 10.0014 1.19843C8.38219 0.0413257 6.23239 -0.310707 4.28472 0.286348Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <textarea
                className={styles.post}
                readOnly
                value={post.post}
                cols="30"
                rows="10"
              ></textarea>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

CreatePost.propTypes = {
  selectedCategory: PropTypes.string,
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
