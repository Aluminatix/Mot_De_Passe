import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-slate-900 flex justify-between items-center
    px-4 h-14 text-white'>
       <div className="logo font-bold text-white text-2xl">
          <span className='text-blue-500'> &lt; </span>
          Pass
          <span className='text-blue-500'>Word/&gt; </span>
        </div>
       <ul>
         <li className='flex gap-5'>
            <a className = 'hover:font-bold' href="/">Home</a>
            <a className = 'hover:font-bold' href="#">About</a>
            <a className = 'hover:font-bold' href="#">Contact</a>
         </li>
        </ul>      
    </nav>
  )
}

export default Navbar;
