import Image from "next/image";
import Link from "next/link";

export default function Blog() {
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
          <Image
            src="/star-labs-logo.png"
            alt="StarLabs Logo"
            width={500}
            height={200}
            priority
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
              backgroundColor: "#0F1C3F",
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

      <main style={{
        padding: "3rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", textAlign: "center" }}>StarLabs Blog</h1>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          <article style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>The Future of Solar Energy in Saudi Arabia</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Published: October 15, 2024
            </p>
            <p>
              Exploring how Saudi Arabia's Vision 2030 is transforming the energy 
              landscape through innovative solar technologies and sustainable practices.
            </p>
          </article>
          
          <article style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>3D Printing Revolution in Manufacturing</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Published: October 10, 2024
            </p>
            <p>
              How additive manufacturing is reshaping industrial production 
              and enabling rapid prototyping across multiple industries.
            </p>
          </article>
          
          <article style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>AI-Powered Research and Development</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Published: October 5, 2024
            </p>
            <p>
              The role of artificial intelligence in accelerating scientific 
              discovery and innovation in our research laboratories.
            </p>
          </article>
          
          <article style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>Quantum Computing Breakthroughs</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Published: September 28, 2024
            </p>
            <p>
              Latest developments in quantum computing and their potential 
              applications in solving complex computational problems.
            </p>
          </article>
          
          <article style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>Sustainable Energy Storage Solutions</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Published: September 20, 2024
            </p>
            <p>
              Innovative battery technologies and energy storage systems 
              that are making renewable energy more reliable and efficient.
            </p>
          </article>
          
          <article style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
          }}>
            <h2>Robotics in Industrial Automation</h2>
            <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Published: September 15, 2024
            </p>
            <p>
              How autonomous robots are transforming manufacturing processes 
              and improving efficiency in industrial environments.
            </p>
          </article>
        </div>

        <div style={{
          backgroundColor: "#f0f8ff",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h2>Stay Updated</h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Subscribe to our newsletter to receive the latest insights on technology, 
            innovation, and research developments from StarLabs.
          </p>
        </div>
      </main>
    </div>
  )
}