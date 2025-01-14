import React from 'react'
import { Link } from 'react-router-dom'

export const Pagination = ({pages,page,isAdmin=false,keyword=""}) => {
  return (
    <nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px text-base h-10 mt-10">
    {page > 1 && 
          <li>
          <Link to={!isAdmin?keyword?`/search/${keyword}/page/${page+1}`:`/page/${page-1}`:`/admin/productslist/${page-1}`} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
        </li>
    }
  

    {
        [...Array(pages).keys()].map((x)=>(

            <li key={x+1} active={x+1===page}>
            <Link to={!isAdmin?keyword?`/search/${keyword}/page/${x+1}`:`/page/${x+1}`:`/admin/productslist/${x+1}`} className={`flex items-center justify-center ${x+1===page?"active:bg-slate-400":""} px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{x+1}</Link>
          </li>
        ))
    }

    {
        page < pages && 
          <li>
            <Link to={!isAdmin?keyword?`/search/${keyword}/page/${page-1}`:`/page/${page+1}`:`/admin/productslist/${page+1}`} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
          </li>
    }

  </ul>
</nav>
  )
}
