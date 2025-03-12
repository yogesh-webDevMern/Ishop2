// "use client";
import React from 'react';

import { moveToTrashProductData } from '@/library/api-call';
import { timeAgo } from "@/library/helper";
import Link from 'next/link';
// import { FaEdit } from "react-icons/fa";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from '@/components/admin/ToggleStatus';
// import { MdOutlineRestore } from "react-icons/md";
import Restore from '@/components/admin/Restore';


export default async  function Page() {

const productJSON = await moveToTrashProductData();
const products = productJSON.products;    
console.log(products);


  return (
    <>
    <div className='flex justify-center gap-[100px]'>
<div className='mt-[10px] font-bold text-xl ml-3'>Trash Products</div>
<div className='bg-purple-500 text-white w-[150px] flex justify-center items-center mt-3 rounded-md'><Link href="/admin/product">Back to view</Link></div>
    </div>

    <div className='p-[20px]'>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">NAME / slug</th>
            <th className="p-2 border">PRICE</th>
            <th className="p-2 border">IMAGE</th>
            <th className="p-2 border">CATEGORY</th>
            <th className="p-2 border">COLOR</th>
            <th className="p-2 border">CREATED / UPDATED</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">ACTIONS</th>

          </tr>
        </thead>
        <tbody>
          {
            products.length>0  && products.map((prod, index) => (
              <tr key={prod._id} className="hover:bg-gray-50">
                <td className="p-2 border text-black">{index + 1}</td>
                <td className="p-2 border">{prod.name}/{prod.slug}</td>
                <td className="p-2 border"><div>price : {prod.price}</div>
                  <div>  discount : {prod.discount}%</div>
                  <div>  Final Price : {prod.final_price}</div>
                </td>
                <td className="p-2 border">
                  <img className='rounded-md' width={50} height={50}  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${prod.main_image}`} alt="" />

                </td>
                <td className="p-2 border">{prod.category_id.name}</td>
                <td className="p-5 border">
                  <ul className='list-disc text-center'>


                    {
                      prod.colors.map((color) => {
                        return (
                          <>
                            <li >{color.name}</li>
                            <div style={{ backgroundColor: color.name }} className={`w-[60px] mx-auto h-[20px] rounded-full`}></div>
                          </>
                        )
                      })
                    }
                  </ul>
                </td>
                <td className="p-2 border">{timeAgo(prod.createdAt)} / {timeAgo(prod.updatedAt)}</td>
                <td className="p-2 border">
                <ToggleStatus status={prod.status} id={prod._id} apiUrl={`/product/change-status`} />
                </td>
                <td className="p-2 border text-center">
                  <div className='flex flex-col items-center gap-2'>

              
          <Restore apiUrl={`/product/restore/${prod._id}`}/>
                  <DeleteBtn  flag={0} deleteUrl={`/product/delete/${prod._id}`} />
                  </div>
                </td>
              </tr>
            ))
          }
     
        </tbody>
      </table>
    </div>
    </>

  )
}

