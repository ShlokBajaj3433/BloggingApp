// components/PostCard.jsx

import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-secondary rounded-xl p-4 transform hover:scale-105 transition-transform duration-200 ease-in-out">
        <div className="w-full justify-center mb-4">
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;