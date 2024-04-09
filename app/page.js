

import Image from "next/image";
import Homesite from "../Components/Home/homeslide";
import Bestseller from "../Components/Home/bestseller";
import NavbarTop from "../Components/navbar/navbarTop";
import NavbarCatalog from "../Components/navbar/navbarCatalog";

export default function Home() {
  return (
    <div>
      <title>NextGenMarketplace</title>
      <NavbarCatalog/>
      <Homesite/>
      <Bestseller/>
    </div>

  );
}
