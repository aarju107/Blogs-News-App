import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../appwrite';
import BlogCard from '../components/Blogcard';

const Blogs = () => {
  const [allblogs, setallblogs] = useState([]);
  const navigate = useNavigate();

  const getallblogs = async () => {
    try {
      const res = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID
      );
      setallblogs(res.documents);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getallblogs();
  }, []);

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">
          Explore Blogs
        </h1>

        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Back to Home
        </button>

        {allblogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allblogs.map((blog) => (
              <BlogCard 
              key={blog.$id} 
              blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No blogs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
