import { useState, useEffect } from 'react';


const PostPagination = ({postsData}) => {
  const [posts, setPosts] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2024-09-01T00:00:00Z')); // Example starting date
  const [endDate, setEndDate] = useState(new Date('2024-09-30T23:59:59Z')); // Example ending date
  const [limit] = useState(2); // Number of posts per page

  useEffect(() => {
    paginatePosts();
  }, [startDate, endDate]);

  const paginatePosts = () => {
    const filteredPosts = postsData.filter(post => {
      const postDate = new Date(post.dateSent);
      return postDate >= startDate && postDate <= endDate;
    });

    setPosts(filteredPosts.slice(0, limit));
  };

  const loadOlder = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - limit);
    const newEndDate = new Date(endDate);
    newEndDate.setDate(endDate.getDate() - limit);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const loadNewer = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + limit);
    const newEndDate = new Date(endDate);
    newEndDate.setDate(endDate.getDate() + limit);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Created at: {new Date(post.dateSent).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <button onClick={loadOlder}>Older Posts</button>
      <button onClick={loadNewer}>Newer Posts</button>
    </div>
  );
};

export default PostPagination;
