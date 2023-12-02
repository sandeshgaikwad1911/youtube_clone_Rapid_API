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
    if( (e?.key === "Enter" || e === "searchButton") && searchQuery.length > 0){
      navigate(`/searchResult/${searchQuery}`)
    }
  }

  
  const mobileMenuToggle = ()=>{
    setMobileMenu(!mobileMenu)
  }


  const {pathname} = useLocation();
  // const pageName = pathname?.split("/")?.filter(Boolean)?.[0];
  const pageName = pathname?.split("/")[1]
  console.log('pageName', pageName)
  
  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {
        loading && <Loader/>
      }
      <div className="flex h-5 items-center">
        {
          pageName !== "video" && (
            <div className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                  onClick={mobileMenuToggle}
            >
              {
                mobileMenu ? (<CgClose className="text-white text-xl"/>) : (<SlMenu className="text-white text-xl"/>)
              }
            </div>
          )
        }
        <Link to='/' className="flex h-5 items-center">
          <img src={ytLogo} alt="" className="h-full hidden dark:md:block"/>
          <img src={ytMobileLogo} alt="" className="h-full md:hidden"/>
        </Link>
      </div>
    </div>
  )
}

export default Header

/* 
  useLocation() ; return an object .... {pathname: '/searchResult/osho', search: '', hash: '', state: null, key: 'default'}
*/