"use client";
import cart from "../Assets/cart.png";
import Image from "next/image";
import Link from 'next/link'
import { useParams,useRouter,usePathname  } from 'next/navigation'
export default function NavbarAccount()
{
const params = useParams()
const pathname = usePathname()
const isActive = (text) => {
  console.log("router",pathname);
  const parts = pathname.split('/');
  const lastPart = parts[parts.length - 1]; 
  return lastPart === text;
}
  return (

      <div className="flex flex-col items-center justify-center gap-20  rounded-sm bg-slate-800 pt-10 pb-10">

      <Link href="/user/account/information"  className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("information") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>MY ACCOUNT</Link>
      <Link href="/user/account/order" className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("order") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>MY ORDERS</Link>
      <Link href="/user/account/address" className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("address") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>MY ADDRESS</Link>
      <div  className= "items-center p-1 lg:text-2xl md:text-lg text-sm  hover:bg-purple-600" rounded-sm>LOGOUT</div>
    
      </div>
   
  );
}
