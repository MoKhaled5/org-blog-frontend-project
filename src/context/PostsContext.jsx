import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPosts() {
    try {
      const response = await axios.get('https://org-blog-frontend-project-production.up.railway.app/posts');

      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(postId) {
    try {
      await axios.delete(`https://org-blog-frontend-project-production.up.railway.app/posts/${postId}`);

      
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

    } catch (error) {
      console.error(`Failed to delete post with id ${postId}:`, error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, getPosts, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}