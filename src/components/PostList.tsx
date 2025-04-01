import { Post } from '../models/post';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';
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
                primary={
                    <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {post.title}
                    </Link>
                }
                secondary={`${post.text.slice(0, 100)}... (${moment(post.timestamp).format('MMMM D, YYYY')})`}
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
