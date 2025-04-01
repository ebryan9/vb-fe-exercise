import { Post } from '../models/post';

const API_URL = 'https://us-central1-mbtcandidate.cloudfunctions.net/posts/bbryan211';

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.response;
};

export const getPostById = async (id: string): Promise<Post> => {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  return data.response;
};

export const createPost = async (post: Omit<Post, 'id' | 'timestamp'>): Promise<Post> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...post, timestamp: new Date().toISOString() }),
  });

  const data = await res.json();
  return data.response;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const res = await fetch(`${API_URL}/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
      title: post.title,
      text: post.text,
      timestamp: post.timestamp
    }),
  });

  const data = await res.json();
  return data.response;
};

export const deletePost = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
