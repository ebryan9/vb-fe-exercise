import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/posts';
import { Post } from '../models/post';
import PostForm from '../components/PostForm';
import { Typography, CircularProgress } from '@mui/material';

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('No post ID provided in URL.');
      setLoading(false);
      return;
    }

    getPostById(id)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load post:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (updatedPost: Post) => {
    await updatePost(updatedPost);
    navigate('/');
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  if (!post) {
    return <Typography color="error" sx={{ mt: 4 }}>
      Post not found or failed to load.
    </Typography>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
      <PostForm
        isEdit
        initialValues={post}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditPostPage;
