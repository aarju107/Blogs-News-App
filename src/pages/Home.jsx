import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ArticleCard from '../components/ArticleCard';
import BlogCard from '../components/Blogcard';
import BlogModal from '../components/BlogModal';
import { NavLink } from "react-router-dom";
import { account, database } from '../appwrite';
import { Query } from 'appwrite';
import Weathercard from '../components/Weathercard';
import CalendarCard from '../components/Calendercard';

const weatherapi = "4456583dbb5f3c480525c691c154bd42";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topArticle, setTopArticle] = useState(null);
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [weathersearch, setweathersearch] = useState('');
  const [weatherdata, setweatherdata] = useState({});

  const handledelete = async (blogId) => {
    try {
      await database.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        blogId
      );
      setBlogs(prev => prev.filter(blog => blog.$id !== blogId));
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const fetchArticles = async (query = '') => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&pageSize=10&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Error loading the data');

      const data = await response.json();
      if (data.articles.length > 0) {
        setTopArticle(data.articles[0]);
        setArticles(data.articles.slice(1));
      }
    } catch (error) {
      console.error('Error fetching articles:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles(search);
  }, [search]);

  const getUserBlogs = async () => {
    try {
      const fetchedUser = await account.get();
      setUser(fetchedUser);

      if (!fetchedUser.$id) {
        console.error('User ID missing');
        return;
      }

      const res = await database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal('userId', fetchedUser.$id)]
      );
      setBlogs(res.documents);
    } catch (error) {
      console.error('Error loading user blogs', error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  const getweatherdata = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weathersearch}&appid=${weatherapi}&units=metric`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setweatherdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full">
        <Header search={search} setsearch={setSearch} />
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-2">
        {/* Sidebar */}
        <aside className="md:col-span-2 flex flex-col gap-2">
          <div className="bg-gray-800 p-2 rounded-md">User Info</div>
          <nav className="bg-purple-100 p-3 rounded-md shadow-md">
            <div className="text-sm font-semibold text-purple-900 mb-2">Categories</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <NavLink
                  to="/"
                  onClick={() => fetchArticles('')}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-purple-600 text-white" : "text-purple-700 hover:bg-purple-200"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition ${
                      isActive ? "bg-purple-600 text-white" : "text-purple-700 hover:bg-purple-200"
                    }`
                  }
                >
                  BLOGS
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => fetchArticles('sports')}
                  className="block px-3 py-2 rounded-lg transition text-purple-700 hover:bg-purple-200"
                >
                  Sports
                </button>
              </li>
              <li>
                <button
                  onClick={() => fetchArticles('India')}
                  className="block px-3 py-2 rounded-lg transition text-purple-700 hover:bg-purple-200"
                >
                  INDIA
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* News Section */}
        <section className="md:col-span-5 flex flex-col gap-2">
          <div className="bg-gray-700 rounded-md h-72 p-2 flex flex-col gap-2">
            {topArticle && topArticle.urlToImage && topArticle.title ? (
              <>
                <div className="flex-1 overflow-hidden rounded-md flex items-center justify-center">
                  <img
                    src={topArticle.urlToImage}
                    alt="Headline"
                    className="max-h-52 w-full object-contain rounded-md"
                  />
                </div>
                <div className="text-sm font-bold line-clamp-2">{topArticle.title}</div>
                {topArticle.url && (
                  <a
                    href={topArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-xs hover:underline"
                  >
                    Read more →
                  </a>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-300">
                No top article available
              </div>
            )}
          </div>

          {/* News Grid */}
          <div className="bg-gray-800 p-2 rounded-md h-96 overflow-y-auto">
            <div className="text-lg font-semibold mb-2">News Grid</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {articles.map((article, idx) => (
                <ArticleCard key={idx} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="md:col-span-3 relative">
          <div className="bg-gray-800 p-2 rounded-md h-full min-h-[200px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">My Blogs</h2>
              <button
                onClick={() => setShowModal(true)}
                className="text-xl bg-purple-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-700"
                title="Create Blog"
              >
                +
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <BlogCard
                    key={blog.$id}
                    blog={blog}
                    userID={user?.$id}
                    onDelete={handledelete}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-sm">No blogs posted yet.</p>
              )}
            </div>
          </div>

          {showModal && user && (
            <BlogModal
              isopen={showModal}
              onclose={() => setShowModal(false)}
              userID={user?.$id}
              onBlogAdded={getUserBlogs}
            />
          )}
        </section>

        {/* Weather + Calendar */}
<aside className="md:col-span-2 flex flex-col gap-2 overflow-hidden">
  <div className="bg-gray-800 p-4 rounded-2xl flex flex-col items-center h-[300px] overflow-y-auto no-scrollbar">
    <h2 className="text-lg font-semibold text-white mb-2">Weather</h2>
    <input
      type="text"
      placeholder="Enter location"
      value={weathersearch}
      onChange={(e) => {
        setweathersearch(e.target.value);
        getweatherdata(e.target.value);
      }}
      className="w-full px-3 py-2 mb-3 rounded-lg bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <Weathercard weatherdata={weatherdata} />
  </div>

  
    <CalendarCard />
  
</aside>
      </main>

      <footer className="bg-gray-900 text-center py-2 mt-2">Footer</footer>
    </div>
  );
};

export default Home;
