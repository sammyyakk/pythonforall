'use client';

import { useEffect, useState } from 'react';

interface Post {
  title: string;
  body: string;
}

const Test3Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/test3');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Test 3 Page</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      ))}
    </div>
  );
};

export default Test3Page;
