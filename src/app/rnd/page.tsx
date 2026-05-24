import Image from "next/image";
import Link from "next/link";

export default function RND() {
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
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", textAlign: "center" }}>Research & Development</h1>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          <div style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#fff8f0"
          }}>
            <h2>Artificial Intelligence</h2>
            <p>
              Advanced AI research including machine learning, computer vision, natural 
              language processing, and autonomous systems for industrial applications.
            </p>
          </div>
          
          <div style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#fff8f0"
          }}>
            <h2>Robotics & Automation</h2>
            <p>
              Cutting-edge robotics research focusing on industrial automation, 
              service robots, and human-robot collaboration systems.
            </p>
          </div>
          
          <div style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#fff8f0"
          }}>
            <h2>Materials Science</h2>
            <p>
              Novel materials development including composites, nanomaterials, 
              smart materials, and advanced manufacturing processes.
            </p>
          </div>
          
          <div style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#fff8f0"
          }}>
            <h2>Quantum Computing</h2>
            <p>
              Quantum algorithms, quantum hardware development, and quantum 
              communication systems for next-generation computing.
            </p>
          </div>
          
          <div style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#fff8f0"
          }}>
            <h2>Biotechnology</h2>
            <p>
              Synthetic biology, bioengineering, and biomanufacturing technologies 
              for sustainable production and medical applications.
            </p>
          </div>
          
          <div style={{
            padding: "2rem",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            backgroundColor: "#fff8f0"
          }}>
            <h2>Space Technology</h2>
            <p>
              Satellite technology, space systems engineering, and space-based 
              applications for communication and Earth observation.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem"
        }}>
          <h2>Research Facilities</h2>
          <p>
            Our state-of-the-art research facilities include advanced laboratories, 
            clean rooms, testing chambers, and computational resources that enable 
            cutting-edge research across multiple disciplines.
          </p>
        </div>

        <div style={{
          backgroundColor: "#f0f8ff",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h2>Collaboration Opportunities</h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto" }}>
            We actively collaborate with universities, research institutions, and 
            industry partners to advance scientific knowledge and develop practical 
            solutions. Contact us to explore partnership opportunities.
          </p>
        </div>
      </main>
    </div>
  )
}
