import React from 'react';

const BlogCard = ({ blog, userID, onDelete }) => {
  if (!blog) return null;

  const isOwner = blog.userId === userID;

  return (
    <div className="bg-white text-black relative rounded-lg shadow-md overflow-hidden">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="p-3">
        <h3 className="text-md font-bold mb-1 line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{blog.thought}</p>
      </div>

      {isOwner && (
        <button
          onClick={() => onDelete(blog.$id)}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogCard;
