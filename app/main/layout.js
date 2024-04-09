// import NavbarCatalog from "../../Components/navbar/navbarCatalog"
export default function mainLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>
         {/* <NavbarCatalog/>    */}
        {children}
      </section>
    )
  }