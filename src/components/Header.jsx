import React from 'react';

const Header = ({search,setsearch}) => {
  return (
    <div className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">NEWS AND BLOGS</div>
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Enter the news topic"
          className="px-3 py-2 rounded-md text-black bg-white placeholder-gray-600"
          value={search}
         onChange={(e)=> setsearch(e.target.value)}
        />
      <button 
      typeof='submit'
      className="bg-violet-600 text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-violet-500 transition duration-300">
  Go
</button>

      </form>
    </div>
  );
};

export default Header;
