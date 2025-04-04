import React from 'react';
import ProductCard from '@/components/website/ProductCard';
import {getProductData} from "@/library/api-call";


export default async function page({searchParams}) {
  // console.log("jkdsfk",searchParams.color);
const productJson=await getProductData(null,true,null,searchParams.sortByName??null,searchParams.sortByPrice??null,searchParams.sortByLimit??null,searchParams.color??null);
const products = productJson.products;

  return (
    <>
<div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4  p-2'>
  {products.map((product,index)=>
  {
    return <ProductCard data={product}/>
  })}


</div>
  </>

  )
}
