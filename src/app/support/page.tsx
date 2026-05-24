import Link from "next/link";

export const metadata = {
  title: "Support | STAR Labs",
  description: "Contact STAR Labs for all inquiries, collaborations, or service requests.",
};

export default function SupportPage() {
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

      <section style={{
        textAlign: "center",
        padding: "8rem 0"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>Support</h1>
        <p style={{
          fontSize: "1.125rem",
          color: "#374151",
          marginBottom: "2.5rem"
        }}>
          For all inquiries, collaborations, or service requests, please contact us at:
        </p>

        <a
          href="mailto:starlabs.ksa@gmail.com"
          style={{
            display: "inline-block",
            padding: "1rem 2rem",
            borderRadius: "0.75rem",
            backgroundColor: "#001f3f",
            color: "#ffffff",
            fontSize: "1.125rem",
            fontWeight: "500",
            textDecoration: "none"
          }}
        >
          starlabs.ksa@gmail.com
        </a>

        <p style={{
          marginTop: "2.5rem",
          color: "#6b7280",
          fontSize: "0.875rem"
        }}>
          We aim to respond to all emails within 1–2 business days.
        </p>
      </section>
    </div>
  );
}