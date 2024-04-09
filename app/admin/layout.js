import NavbarAdmin from "../../Components/navbar/navbarAdmin";

export default function adminLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>
        <NavbarAdmin/>
        {children}
      </section>
    )
  }
  