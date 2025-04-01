import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { Post } from "../models/post";
import { getPosts, deletePost } from "../services/posts";

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      getPosts().then(setPosts);
    }, []);
  
    const handleDelete = async (id: string) => {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    };
  
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Posts</h1>
        <PostList posts={posts} onDelete={handleDelete} />
      </div>
    );
  };
  
  export default PostsPage;