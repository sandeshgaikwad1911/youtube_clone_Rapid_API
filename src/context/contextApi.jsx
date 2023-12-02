/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { fetchDataFromUrl } from "../utils/api";

export const Context = createContext(null);

export const AppContext = ({children})=>{

    const [loading, setLoading] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [selectCategory, setSelectCategory] = useState("New");

    const fetchSelectedCategoryData = (query)=>{
        setLoading(true);
        fetchDataFromUrl(`search/?q={query}`).then((res)=>{
            console.log('fetchSelectedCategoryData RES',res?.contents)
            setSearchResult(res?.contents)
            setLoading(false);
        }).catch((error)=>{
            console.log('fetchSelectedCategoryDataError', error);
            setLoading(false)
        })
    } 

    useEffect(()=>{
        fetchSelectedCategoryData(selectCategory);
    },[selectCategory]);

    return(
        <Context.Provider value={{
                loading, setLoading,
                mobileMenu, setMobileMenu, 
                searchResult, setSearchResult, 
                selectCategory, setSelectCategory
            }}
        >
            {children}
        </Context.Provider>
    )
}

/* 
    [.]     fetchDataFromUrl() method decalre in api.js  which return (data) promise
*/