import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PostView() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/posts/${postId}`).then(r => setPost(r.data));
    api.get(`/posts/${postId}/comments`).then(r => setComments(r.data));
  }, [postId]);

  const submitComment = async () => {
    if (!user) return alert('Login to comment');
    await api.post(`/posts/${postId}/comments`, { text });
    setText('');
    const r = await api.get(`/posts/${postId}/comments`);
    setComments(r.data);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {post.author?.name}</p>
      {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: '600px' }} />}
      <div>{post.body}</div>

      <section>
        <h3>Comments</h3>
        {comments.map(c => <div key={c._id}><b>{c.author.name}</b>: {c.text}</div>)}
        <div>
          <textarea value={text} onChange={e => setText(e.target.value)} />
          <button onClick={submitComment}>Add Comment</button>
        </div>
      </section>
    </div>
  );
}
