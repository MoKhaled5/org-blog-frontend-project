import React, { useState } from 'react';
import PostCard from './PostCard';
import { usePosts } from '../../context/PostsContext';

export default function PostsSection() {
  const { posts, loading } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; 
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-4xl font-bold text-center">All Blog Posts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        {currentPosts.map((post) => (
          <PostCard key={post.id} postId={post.id} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-15">
        <button
          className="w-10 aspect-square rounded flex justify-center items-center disabled:opacity-30 cursor-pointer"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" className="size-6 stroke-[#6941C6] dark:stroke-[#9F76FF]" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"></path>
          </svg>
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 aspect-square rounded cursor-pointer ${currentPage === index + 1 ? 'bg-[#6941C6] text-white dark:bg-[#9F76FF] dark:text-white' : 'text-[#667085] dark:text-[#C0C5D0]'}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="w-10 aspect-square rounded flex justify-center items-center disabled:opacity-30 cursor-pointer"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" className="size-6 stroke-[#6941C6] dark:stroke-[#9F76FF]" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
