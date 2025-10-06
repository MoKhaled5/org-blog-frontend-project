import React from 'react'
import DeletePostButton from './DeletePostButton';
import EditPostsButton from './EditPostsButton';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostsContext';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useState } from 'react';


export default function PostCard({ postId }) {
  const { posts, deletePost } = usePosts();
  const { user } = useAuth();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return null;
  }

  const isOwner = user && post.author_id === user.id;

    const handleConfirmDelete = () => {
    deletePost(postId);
    setIsConfirmOpen(false);
  };

  return (
    <> 
      <div className='overflow-hidden'>
        <div className='w-full relative aspect-[583/364] overflow-hidden'>
          <img src={post.image_url} alt="Post-Image" className='w-full h-full object-cover' />
          {isOwner && (
            <div className='flex absolute top-3 right-3 gap-2'>
              <EditPostsButton postId={postId}/>
              <DeletePostButton onClick={() => setIsConfirmOpen(true)} />
            </div>
          )}
        </div>
        <p className='text-[#6941C6] dark:text-[#9F76FF] text-lg font-semibold mt-8'>
          <span>{post.author_name} - </span>
          <span>{post.formatted_date} - </span>
          <span>{post.formatted_time}</span>
        </p>
        <h3 className='text-[#1A1A1A] dark:text-[#FFFFFF] text-3xl font-semibold mt-4'>{post.title}</h3>
        <p className='text-[#667085] dark:text-[#C0C5D0] text-xl mt-2'>{post.description}</p>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  )
}

