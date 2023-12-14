/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import categories from '../utils/constant';
import LeftMenuItems from './LeftMenuItems';
import { Context } from '../context/contextApi';

const LeftNav = () => {

    const {selectCategory, setSelectCategory, mobileMenu} = useContext(Context);

    const handleClick = (name, type)=>{
        switch(type){
            case "category" : 
                return setSelectCategory(name);
            
            case "home" : 
                return setSelectCategory(name);

            case "menu" : 
                return false;
            
            default:
                break;
        }
    }
    const navigate = useNavigate();

  return (
    <div className={`w-[240px] h-full overflow-y-auto bg-black z-10 absolute md:relative md:block translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : ""}`}>
        <div className="flex flex-col px-5">
            {
                categories.map((category, i)=>{
                    // console.log('category', category);
                    return(
                        <React.Fragment key={i}>
                            <LeftMenuItems
                                text={category.type === "home" ? "Home" : category.name}
                                icon={category.icon}
                                className={`${selectCategory === category.name ? "bg-white/[0.15]" : ""}`}
                                action={()=>{
                                    handleClick(category.name, category.type);
                                    navigate("/");
                                }}

                            />
                            {
                                category.divider && (
                                    <hr className='my-5 border-white'/>
                                )
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
    </div>
  )
}

export default LeftNav