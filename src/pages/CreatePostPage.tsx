import React from 'react';
import { createPost } from '../services/posts';
import PostForm from '../components/PostForm';
import { useNavigate } from 'react-router-dom';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = async (postData: { title: string; text: string }) => {
    await createPost(postData);
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create Post</h1>
      <PostForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePostPage;
