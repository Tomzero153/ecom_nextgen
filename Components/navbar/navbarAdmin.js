'use client'
import cart from "../Assets/cart.png";
import Image from 'next/image'
import Link from 'next/link'

export default function navbarAdmin() {
    return (
      <div className="pt-1 block xl:w-[1300px] w-full m-auto  items-center h-[50px] ">
      <div className="flex p-1 mt-1  items-center justify-center lg:gap-x-20 md:gap-x-10 gap-x-5 rounded-sm bg-slate-800">
        <Link href="/admin/addProduct" className=" items-center p-1 lg:text-2xl md:text-lg hover:bg-purple-600 rounded-sm ">AddProduct</Link>
        <Link href="/admin/editProduct" className=" items-center p-1 lg:text-2xl md:text-lg hover:bg-purple-600 rounded-sm ">EditProduct</Link>
        <Link href="/admin/listProduct" className=" items-center p-1 lg:text-2xl md:text-lg hover:bg-purple-600 rounded-sm ">ListProduct</Link>
      </div>
    </div>

  
    );
  }
       