/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { fetchDataFromUrl } from "../utils/api";

export const Context = createContext();

export const AppContext = ({children})=>{

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [selectCategory, setSelectCategory] = useState("New");

    const fetchSelectedCategoryData = (query)=>{
        setLoading(true);
        fetchDataFromUrl(`search/?q=${query}`).then((res)=>{
            // console.log('fetchSelectedCategoryData RES',res?.contents);
            setSearchResult(res?.contents)
            setLoading(false);
        }).catch((error)=>{
            console.log('fetchSelectedCategoryDataError', error?.response?.data?.message);
            setError(error?.response?.data?.message || 'An Error Occurred');
            setLoading(false);
        })
    } 

    useEffect(()=>{
        fetchSelectedCategoryData(selectCategory);
    },[selectCategory]);

    return(
        <Context.Provider value={{
                loading, setLoading,
                searchResult, setSearchResult,
                error,
                mobileMenu, setMobileMenu, 
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