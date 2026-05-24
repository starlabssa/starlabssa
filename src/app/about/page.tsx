import Image from "next/image";
import Link from "next/link";

export default function About() {
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

      <section style={{
        textAlign: "center",
        padding: "5rem 0",
        backgroundColor: "#ffffff",
        color: "#000000"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        }}>Building Tomorrow's Technologies, Today</h1>
        <p style={{
          maxWidth: "32rem",
          margin: "0 auto 2rem",
          color: "#4B5563",
          fontSize: "1.25rem"
        }}>
          STAR Labs is a Saudi-based innovation and development consultancy dedicated to advancing science, engineering, and design.
        </p>
      </section>

      <section style={{
        maxWidth: "56rem",
        margin: "0 auto",
        padding: "5rem 1rem",
        color: "#1F2937"
      }}>
        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>Who We Are</h2>
        <p style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
          STAR Labs is a Saudi-based innovation and development consultancy dedicated to advancing science, engineering, and design. 
          We specialize in bridging the gap between research and practical application — transforming ideas into scalable, real-world technologies.
        </p>
        <p style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
          Our mission is simple yet bold: to redefine how innovation is approached by learning from the institutions that came before us, 
          and building on their successes with a fresh perspective and renewed purpose.
        </p>

        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>Our Purpose</h2>
        <p style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
          We exist to accelerate technological growth in fields that shape the modern world — renewable energy, artificial intelligence, 
          materials science, and digital manufacturing. Through collaboration, strategic partnerships, and forward-thinking development, 
          STAR Labs aims to become the regional hub for innovation and R&D in Saudi Arabia and beyond.
        </p>

        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>Philosophy & Approach</h2>
        <p style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
          At STAR Labs, we believe in <strong>learning, creating, and advancing for all.</strong> Our work is grounded in three principles:
        </p>
        <ul style={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          marginBottom: "2rem"
        }}>
          <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
            <strong>Innovation:</strong> Exploring and developing new technologies that drive progress.
          </li>
          <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
            <strong>Integration:</strong> Combining research, design, and industry expertise into one unified process.
          </li>
          <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
            <strong>Impact:</strong> Ensuring that every project contributes to a sustainable and intelligent future.
          </li>
        </ul>
        <p style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>
          We merge creativity with precision, research with execution, and vision with measurable results.
        </p>

        <h2 style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>The Future of STAR Labs</h2>
        <p style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>
          While today we operate as a consultancy and development firm, our future lies in becoming a full-scale innovation center — 
          combining research, prototyping, and product development under one roof. Our goal is to nurture talent, accelerate ideas, 
          and shape technologies that serve both people and planet.
        </p>

        <div style={{ textAlign: "center" }}>
          <Link href="/support" style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: "0.75rem",
            textDecoration: "none",
            fontWeight: "600"
          }}>
            Get in Touch →
          </Link>
        </div>
      </section>
    </div>
  )
}
