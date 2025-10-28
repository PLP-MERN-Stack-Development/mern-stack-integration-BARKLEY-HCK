import React from 'react';
import useFetch from './hooks/useFetch';
import PostList from '../components/PostList';

export default function Home() {
  const { data: posts, loading } = useFetch('/posts', []);

  return (
    <div>
      <h1>Blog</h1>
      {loading ? <p>Loading...</p> : <PostList posts={posts} />}
    </div>
  );
}
