"use client";
import Link from "next/link";

const services = [
  {
    slug: "/services/web",
    title: "Web Design & Build",
    blurb: "Modern, responsive websites built to perform and scale effortlessly.",
  },
  {
    slug: "/services/modeling",
    title: "3D Modeling Consultancy",
    blurb: "Precision CAD modeling for concept design, products, and visualization.",
    badge: "Coming Soon: Photo → 3D Model (AI)",
  },
  {
    slug: "/services/printing",
    title: "3D Printing & Manufacturing",
    blurb: "From rapid prototypes to production parts — quality and precision guaranteed.",
  },
];

export default function ServicesPage() {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      minHeight: "100vh",
      color: "#000000"
    }}>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5"
      }}>
        <div style={{ flexShrink: 0, minWidth: "500px" }}>
          <img
            src="/star-labs-logo.png"
            alt="StarLabs Logo"
            width={500}
            height={200}
            style={{ 
              objectFit: "contain",
              width: "500px",
              height: "200px"
            }}
          />
        </div>
        
        <nav style={{
          display: "flex",
          gap: "12px"
        }}>
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About Us" },
            { href: "/services", label: "Services" },
            { href: "/energy", label: "Energy" },
            { href: "/rnd", label: "R&D" },
            { href: "/blog", label: "Blog" },
            { href: "/support", label: "Support" }
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              backgroundColor: "#001f3f",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600
            }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        textAlign: "center",
        padding: "5rem 0"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        }}>Our Services</h1>
        <p style={{
          maxWidth: "32rem",
          margin: "0 auto",
          color: "#374151",
          fontSize: "1.25rem"
        }}>
          Explore how STAR Labs transforms ideas into technology — through design, modeling, and production.
        </p>
      </section>

      {/* Service Boxes */}
      <section style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "0 1rem 6rem"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem"
        }}>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={s.slug}
              style={{
                display: "block",
                backgroundColor: "#001f3f",
                color: "#ffffff",
                borderRadius: "1rem",
                padding: "2.5rem",
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.3s ease",
                transform: "translateY(0)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              {s.badge && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: "#ffffff",
                    color: "#001f3f",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px"
                  }}>
                    {s.badge}
                  </span>
                </div>
              )}
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.75rem"
              }}>
                {s.title}
              </h3>
              <p style={{
                color: "#d1d5db"
              }}>{s.blurb}</p>
            </Link>
          ))}
        </div>

        {/* Coming Soon detail box */}
        <div style={{
          marginTop: "4rem",
          maxWidth: "48rem",
          margin: "4rem auto 0",
          textAlign: "center",
          border: "1px solid #d1d5db",
          borderRadius: "1rem",
          padding: "2rem",
          backgroundColor: "#f9fafb"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}>Photo → 3D Model (AI) — Coming Soon</h2>
          <p style={{
            color: "#374151"
          }}>
            Upload a photo and instantly get a ready-to-edit 3D model. STAR Labs is integrating 
            next-gen AI reconstruction tools to revolutionize digital manufacturing.
          </p>
        </div>
      </section>
    </div>
  );
}
