import React from "react";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  
  return (
    <div>
      <ul className="pagination flex justify-between items-center list-none">
        {pages.map((page) => (
          <li className={page === currentPage ? "flex items-center justify-center w-8 h-8 border-2 border-slate-600 hover:cursor-pointer rounded-md bg-red-500" : "flex items-center justify-center w-8 h-8 border-2 border-slate-600 hover:cursor-pointer rounded-md"} key={page}>
            <a onClick={() => onPageChange(page)} className="pagelink hover:cursor-pointer">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

