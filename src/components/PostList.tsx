import { Post } from '../models/post';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post[] | null;
  onDelete: (id: string) => void;
}

const PostList: React.FC<Props> = ({ posts, onDelete }) => {
  if (posts === null) {
    return <Typography>Loading posts...</Typography>;
  }

  if (posts.length === 0) {
    return <Typography>No posts found.</Typography>;
  }

  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.id} divider>
          <ListItemText
            primary={post.title}
            secondary={`${post.text?.slice(0, 100) ?? ''}... (${new Date(post.timestamp).toLocaleString()})`}
          />
          <Button
            component={Link}
            to={`/posts/edit/${post.id}`}
            sx={{ mr: 1 }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button onClick={() => onDelete(post.id)} color="error">
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
