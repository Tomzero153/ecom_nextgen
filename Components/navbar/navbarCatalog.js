"use client";
import cart from "../Assets/cart.png";
import Image from "next/image";
import Link from 'next/link'
import { useParams } from 'next/navigation'
export default function NavbarCatalog()
{
const params = useParams()
const isActive = (text) => {
  return params.slug === text;
}
  return (
    <div className="pt-1 block xl:w-[1300px] w-full xl:m-auto  items-center h-[50px] ">
      
      <div className="flex p-1 mt-1  items-center justify-center lg:gap-x-20 md:gap-x-10 gap-x-4 rounded-sm bg-slate-800">
      <Link href="/main/catalog/MARKET"  className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("MARKET") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>MARKET</Link>
      <Link href="/main/catalog/NEXTGEN" className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("NEXTGEN") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>NEXTGEN</Link>
      <Link href="/main/catalog/ROBOT" className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("ROBOT") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>ROBOT</Link>
      <Link href="/main/catalog/IT" className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("IT") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>IT</Link>
      <Link href="/main/catalog/WEARABLES" className={`items-center p-1 lg:text-2xl md:text-lg text-sm ${isActive("WEAR") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>WEARABLES</Link>
      {/* <Link href="/main/catalog/SALE"className={`items-center p-1 text-2xl ${isActive("SALE") ? "bg-purple-600" : "hover:bg-purple-600"} rounded-sm`}>SALE</Link> */}

      </div>
    </div>
  );
}
