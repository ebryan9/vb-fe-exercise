import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Post } from '../models/post';

type PostFormProps =
  | {
      isEdit: true;
      initialValues: Post;
      onSubmit: (post: Post) => void | Promise<void>;
    }
  | {
      isEdit?: false;
      initialValues?: never;
      onSubmit: (post: Omit<Post, 'id' | 'timestamp'>) => void | Promise<void>;
    };

const PostForm: React.FC<PostFormProps> = (props) => {
    const isEdit = props.isEdit === true;
    const initialValues = isEdit ? props.initialValues : { title: '', text: '' };
    
    const [title, setTitle] = useState(initialValues.title);
    const [text, setText] = useState(initialValues.text);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (isEdit) {
        const updatedPost: Post = {
            ...(props.initialValues as Post),
            title,
            text,
        };
        props.onSubmit(updatedPost);
        } else {
        const newPost = {
            title,
            text,
        };
        props.onSubmit(newPost);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
            label="Text"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="contained">
            {isEdit ? 'Update Post' : 'Create Post'}
        </Button>
        </form>
    );
    };

export default PostForm;