import React from 'react';
import { Link } from 'react-router-dom';

export default function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post._id} style={{ border: '1px solid #ddd', margin: '12px', padding: '12px' }}>
          <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
          <p>by {post.author?.name}</p>
          {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: '300px' }} />}
          <p>{post.body?.slice(0, 200)}...</p>
        </article>
      ))}
    </div>
  );
}
