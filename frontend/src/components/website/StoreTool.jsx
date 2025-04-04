"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineSortAscending } from "react-icons/ai";
import { AiOutlineSortDescending } from "react-icons/ai";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { TbSortDescendingNumbers } from "react-icons/tb";
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from '@/components/website/SearchInput';
export default function StoreTool() {
    const searchParams = useSearchParams();
    const [sortName,setSortName] = useState(null);
    const [sortPrice,setSortPrice] = useState(null);
    const [sortByLimit,setSortLimit] = useState(null);
    //Asc:1 Desc:-1
    const router = useRouter();
    useEffect(()=>
    {
if(searchParams.get("sortByName"))
{
    setSortName(parseInt(searchParams.get("sortByName")));
}
if(searchParams.get("sortPrice"))
{
    setSortPrice(parseInt(searchParams.get("sortByPrice")));
}
    },[])
    useEffect(()=>
    {
const query = new URLSearchParams();
if(sortName)
{
    query.set("sortByName",sortName);
}
if(sortPrice)
{
    query.set("sortByPrice",sortPrice);
}
if(sortByLimit)
{
    query.set("sortByLimit",sortByLimit);
}
router.push(`?${query.toString()}`);
    },[sortName,sortPrice,sortByLimit]);
    //Dropdown handler


    const handleDropdownChange = (event) => {
        const value = event.target.value;
        if (value === "name-asc") {
            setSortName(1);
            setSortPrice(null); // Reset Price Sorting
        } else if (value === "name-desc") {
            setSortName(-1);
            setSortPrice(null);
        } else if (value === "price-asc") {
            setSortPrice(1);
            setSortName(null); // Reset Name Sorting
        } else if (value === "price-desc") {
            setSortPrice(-1);
            setSortName(null);
        }
        else if(value=== "tenproducts")
            {
                setSortLimit(10);
                setSortPrice(null);
                setSortName(null);
            }
            else if(value==="twentyproducts")
                {
                    setSortLimit(20);
                    setSortPrice(null);
                    setSortName(null);
                }
                else if(value==="30products")
                    {
                        setSortLimit(30);
                        setSortPrice(null);
                        setSortName(null);
                    }
                    else if(value==="infiniteproducts")
                        {
                            setSortLimit(null);
                            setSortPrice(null);
                            setSortName(null);
                        } else {
            setSortName(null);
            setSortPrice(null);
        }
        
    };
    const clearAll=()=>
    {
        router.replace("/store");
        setSortLimit(null);
        setSortPrice(null);
        setSortName(null);
    }
  return (
    <>
   <div className='py-2 px-2 mb-5 flex justify-between shadow-md rounded  '>
        <div className='flex gap-5 items-center '>
       {/* Sorting Icons */}
       <AiOutlineSortAscending onClick={() => { setSortName(1); setSortPrice(null); }}
                    className={`cursor-pointer text-[22px] ${sortName == 1 ? "text-blue-500" : ""}`} />
                <AiOutlineSortDescending onClick={() => { setSortName(-1); setSortPrice(null); }}
                    className={`cursor-pointer text-[22px] ${sortName == -1 ? "text-blue-500" : ""}`} />
                <TbSortAscendingNumbers onClick={() => { setSortPrice(1); setSortName(null); }}
                    className={`cursor-pointer text-[22px] ${sortPrice == 1 ? "text-blue-500" : ""}`} />
                <TbSortDescendingNumbers onClick={() => { setSortPrice(-1); setSortName(null); }}
                    className={`cursor-pointer text-[22px] ${sortPrice == -1 ? "text-blue-500" : ""}`} />

                {/* Dropdown Filter */}
                <select
                    className="px-3 py-2 border border-blue-200 outline-none rounded ml-4"
                    onChange={handleDropdownChange}
                >
                    <option value="">Sort by</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
                <select
                    className="px-3 py-2 border border-blue-200 outline-none rounded ml-4"
                    onChange={handleDropdownChange}
                >
                    <option value="">Load More</option>
                    <option value="tenproducts">10 Products</option>
                    <option value="twentyproducts">20 products</option>
                    <option value="30products">30 products</option>
                    <option value="infiniteproducts">Infinite products</option>
                </select>
        </div>
    <button onClick={clearAll} className='border border-blue-400 px-3 bg-blue-500 text-white rounded'>clear All</button>
        <SearchInput/>
        </div>
    </>
 

  )
}
