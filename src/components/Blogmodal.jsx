import React, { useState } from 'react';
import { database, storage, IDhelper } from '../appwrite';

const BlogModal = ({ isopen, onclose, userID, onBlogAdded }) => {
  const [title, settitle] = useState('');
  const [thought, setthought] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !thought || !image || loading) return;

    setloading(true);
    try {
      const uploadedImage = await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        IDhelper.unique(),
        image
      );

      const fileId = uploadedImage.$id;
      const fileUrl = storage.getFileView(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId
      ).toString();

      await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        IDhelper.unique(),
        {
          title,
          thought,
          image: fileUrl,
          userId: userID,
        }
      );

      onBlogAdded();
      onclose();
    } catch (error) {
      console.error("Error uploading blog:", error.message || error);
    } finally {
      setloading(false);
    }
  };

  if (!isopen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Share a Thought</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border mb-2"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-2 border mb-2"
          value={thought}
          onChange={(e) => setthought(e.target.value)}
        />
        <input
          type="file"
          className="mb-4"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Blog'}
        </button>
        <button
          type="button"
          className="ml-2 text-red-500"
          onClick={onclose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BlogModal;
