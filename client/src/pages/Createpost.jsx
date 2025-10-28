import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return alert('Please login');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('tags', tags);
    if (image) formData.append('image', image);

    const res = await api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    navigate(`/posts/${res.data._id}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write your post..." />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="tags comma separated" />
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      <button type="submit">Create</button>
    </form>
  );
}
