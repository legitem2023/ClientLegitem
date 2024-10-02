'use client'; // Ensure it's client-side only
import React, { useEffect, useState } from 'react';
import { NEWS_POSTER } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
const PostedBy: React.FC = () => {
  const { data, loading, error } = useQuery(NEWS_POSTER);
  const [newsPoster, setNewsPoster] = useState<any[]>([]);
  useEffect(() => {
    if (data?.readNewsPoster) {
      setNewsPoster(data.readNewsPoster);
    }
  }, [data]);
  if (loading) return <Loading />;
  if (error) return <p>Error loading data...</p>;
  return (
    <ul className="Menu">
      <li className="Menu_label">Posted By</li>
      {newsPoster.map((item: any, index: any) => (
        <li key={index} className="menu_li">
          {item.postedBy}
        </li>
      ))}
    </ul>
  );
};

export default PostedBy;
