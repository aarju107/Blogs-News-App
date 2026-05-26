import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-gray-700 rounded-md p-2 shadow-md hover:bg-gray-600 transition-all">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-32 object-cover rounded-md mb-2"
        />
      )}
      <h3 className="text-md font-semibold mb-1">{article.title}</h3>
      <p className="text-sm text-gray-300 line-clamp-3">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 text-sm mt-2 inline-block"
      >
        Read More
      </a>
    </div>
  );
};

export default ArticleCard;
