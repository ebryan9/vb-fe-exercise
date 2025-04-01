import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';

import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ViewPostPage from './pages/ViewPostPage';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            My Blog
          </Typography>          
          <Button color="inherit" component={Link} to="/">Posts</Button>
          <Button color="inherit" component={Link} to="/posts/create">Create Post</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/create" element={<CreatePostPage />} />
          <Route path="/posts/edit/:id" element={<EditPostPage />} />
          <Route path="/posts/:id" element={<ViewPostPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
