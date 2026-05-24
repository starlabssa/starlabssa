import Link from "next/link";

export const metadata = {
  title: "Energy Solutions | STAR Labs",
  description:
    "Partnering with contractors to deliver accessible solar solutions with zero upfront cost, supporting Saudi Arabia's 2060 energy goals.",
};

export default function EnergyPage() {
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

      {/* Hero */}
      <section style={{
        textAlign: "center",
        padding: "5rem 0"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem"
        }}>Energy Solutions</h1>
        <p style={{
          maxWidth: "32rem",
          margin: "0 auto",
          color: "#374151",
          fontSize: "1.25rem"
        }}>
          Accelerating Saudi Arabia's clean-energy transition through collaborative solar projects and cost-efficient power agreements.
        </p>
      </section>

      <section style={{
        maxWidth: "64rem",
        margin: "0 auto",
        padding: "0 1rem 6rem"
      }}>
        {/* How we work */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Our Approach</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1rem",
            fontSize: "1.25rem"
          }}>
            STAR Labs partners with contractors, developers, and businesses to design, integrate, and manage large-scale and distributed
            solar energy systems. We handle system design, component selection, performance monitoring, and ongoing optimization while
            ensuring that each installation meets both technical and environmental standards.
          </p>
          <p style={{
            color: "#374151",
            fontSize: "1.25rem"
          }}>
            By combining engineering precision with reliable suppliers and field expertise, we enable smooth installation and long-term
            performance of photovoltaic systems suited for Saudi Arabia's climate.
          </p>
        </div>

        {/* The zero-capital model */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Zero-Capital Solar Model</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1rem",
            fontSize: "1.25rem"
          }}>
            Traditional solar projects require high upfront investment — a barrier that limits adoption for many organizations. 
            STAR Labs offers an alternative model: a <strong>Power Purchase Agreement (PPA)</strong> where clients pay nothing upfront.
          </p>
          <ul style={{
            listStyleType: "disc",
            paddingLeft: "1.5rem",
            marginBottom: "1rem"
          }}>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>We design, install, and maintain the solar system on your premises.</li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>You purchase the generated power at a fixed, discounted rate below grid cost.</li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Our long-term agreement ensures predictable energy savings and stable pricing.</li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Maintenance, insurance, and performance monitoring are included in the contract.</li>
          </ul>
          <p style={{
            color: "#374151",
            fontSize: "1.25rem"
          }}>
            This structure eliminates financial risk and allows businesses and property owners to benefit from renewable energy without
            upfront capital. You gain lower bills, cleaner power, and a smaller carbon footprint from day one.
          </p>
        </div>

        {/* Partnerships with contractors */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Partnerships with Contractors</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1rem",
            fontSize: "1.25rem"
          }}>
            We collaborate directly with local contractors and engineering firms to accelerate deployment across residential,
            commercial, and industrial sectors. STAR Labs provides design guidance, system optimization, and procurement support,
            while contractors handle installation and local compliance.
          </p>
          <p style={{
            color: "#374151",
            fontSize: "1.25rem"
          }}>
            This shared approach strengthens local expertise, reduces logistical overhead, and ensures every project meets our
            performance and safety standards.
          </p>
        </div>

        {/* Saudi 2060 vision */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Supporting Saudi Arabia's 2060 Vision</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1rem",
            fontSize: "1.25rem"
          }}>
            STAR Labs proudly aligns its mission with <strong>Saudi Arabia's Vision 2060</strong> — a commitment to reach net-zero
            greenhouse gas emissions through diversification of energy sources and large-scale renewable deployment.
          </p>
          <p style={{
            color: "#374151",
            fontSize: "1.25rem"
          }}>
            Our initiatives directly contribute to this national transformation by integrating sustainable power solutions that reduce
            reliance on fossil fuels, enhance energy independence, and support economic diversification under Vision 2030 and the
            Kingdom's long-term environmental strategy.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center",
          border: "1px solid #e5e5e5",
          borderRadius: "1rem",
          padding: "2.5rem",
          backgroundColor: "#f9fafb"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}>Partner with STAR Labs</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1.5rem",
            fontSize: "1.25rem"
          }}>
            Whether you're a contractor, property owner, or developer — we can help you integrate solar energy at zero upfront cost and
            long-term savings.
          </p>
          <a
            href="mailto:starlabs.ksa@gmail.com?subject=Energy%20Solutions%20Partnership%20Inquiry"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              backgroundColor: "#001f3f",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Email: starlabs.ksa@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}