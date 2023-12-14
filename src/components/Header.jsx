/* eslint-disable no-unused-vars */
import { useState } from "react";
import {useNavigate, useLocation, Link} from 'react-router-dom';

import ytLogo  from '../images/yt-logo.png';
import ytMobileLogo from '../images/yt-logo-mobile.png'

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { useContext } from "react";
import { Context } from "../context/contextApi";
import Loader from "../shared/Loader";

const Header = () => {

  const {loading, mobileMenu, setMobileMenu} = useContext(Context);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // --------------------------------------------------------------------------------------------------------

  const searchQueryHandler = (e)=>{
    // console.log('searchQueryHandler', e)
    if( (e?.key === "Enter" || e === "searchButton") && searchQuery.length > 0){
      navigate(`/searchResult/${searchQuery}`)
      setSearchQuery("");
      // <Route path='/searchResult/:searchQuery' element={<SearchResult/>}/>
    }
  }

  
  const mobileMenuToggle = ()=>{
    setMobileMenu(!mobileMenu)
  }

  // --------------------------------------------------------------------------------------------------

  const {pathname} = useLocation();
  // console.log('pathname', pathname);
  const pageName = pathname?.split("/")[1]
  console.log('pageName', pageName)
  
  /* 
  <Route path='/searchResult/:searchQuery' element={<SearchResult/>}/>
  http://localhost:5173/searchResult/osho  =>  then pageName will be    'searchResult'

      <Route path='/video/:id' element={<VideoDetails/>}/>
  */

  // --------------------------------------------------------------------------------------------------

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between md:justify-start h-14 px-4 bg-white dark:bg-black">

        {
          loading && <Loader/>
        }

        <div className="flex h-6 items-center">

            {
              pageName !== "video" && (
                //  more than 768px then it will be hidden
                <div className="md:hidden md:mr-6 cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                onClick={mobileMenuToggle}
                >
                  {
                    mobileMenu ? (<CgClose className="text-white text-xl"/>) : (<SlMenu className="text-white text-xl"/>)
                  }
                </div>
              )
            }

            <Link to='/' className="flex h-6 items-center">
              <img src={ytLogo} alt="" className="h-full hidden dark:md:block"/>
              <img src={ytMobileLogo} alt="" className="h-full md:hidden"/>
            </Link>

        </div>

        <div className="group flex items-center md:ml-[240px]">
              <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                  <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                      <IoIosSearch className="text-white text-xl" />
                  </div>
                  <input
                      type="text"
                      className="bg-transparent outline-none text-white px-5 w-44 md:w-64 lg:w-[500px]"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyUp={searchQueryHandler}
                  />
              </div>
              <button
                  className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1] hover:border-blue-500"
                  onClick={() => searchQueryHandler("searchButton")}
              >
                  <IoIosSearch className="text-white text-xl" />
              </button>
        </div> 

    </div>
  )
}

export default Header

/* 
  useLocation() ; return an object .... {pathname: '/searchResult/osho', search: '', hash: '', state: null, key: 'default'}
*/