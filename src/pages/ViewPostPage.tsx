import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, deletePost } from '../services/posts';
import { Post } from '../models/post';
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Stack
} from '@mui/material';
import moment from 'moment';

const ViewPostPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getPostById(id)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch post', err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      navigate('/');
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  if (!post) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Post not found or failed to load.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {moment(post.timestamp).format('MMMM Do YYYY, h:mm a')}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {post.text}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" component={Link} to={`/posts/edit/${post.id}`}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="text" onClick={() => navigate('/')}>
          Back to Posts
        </Button>
      </Stack>
    </Box>
  );
};

export default ViewPostPage;
