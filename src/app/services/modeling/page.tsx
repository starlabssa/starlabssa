import Link from "next/link";

export const metadata = {
  title: "3D Modeling Consultancy | STAR Labs",
  description:
    "Precision Autodesk-based CAD modeling for products, parts, and visualization. DFM for additive manufacturing and ready-to-print files.",
};

export default function ModelingService() {
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
        }}>3D Modeling Consultancy</h1>
        <p style={{
          maxWidth: "32rem",
          margin: "0 auto",
          color: "#374151",
          fontSize: "1.25rem"
        }}>
          Turning ideas into accurate, manufacturable 3D models — fully built in Autodesk environments and optimized for additive manufacturing.
        </p>
      </section>

      <section style={{
        maxWidth: "64rem",
        margin: "0 auto",
        padding: "0 1rem 6rem"
      }}>
        {/* What we offer */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>What We Offer</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem"
            }}>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Parametric CAD:</strong> editable Autodesk Fusion 360 or Inventor models with organized feature history.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Assemblies:</strong> constraints, motion studies, and alignment for real-world fit.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Surface & Solid Modeling:</strong> smooth aesthetic surfaces and precise engineering solids.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>DFM for Additive Manufacturing:</strong> orientation, support planning, and wall-thickness optimization.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Technical Drawings:</strong> detailed 2D prints and assembly sheets for documentation.
              </li>
            </ul>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem"
            }}>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Tolerance & Fit:</strong> slip-fit, press-fit, and clearance design for printed parts.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Material Guidance:</strong> plastics, resins, and composites suitable for FDM/SLA printers.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Visualization:</strong> exploded views, render setups, and client-ready presentation assets.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Rapid Iteration:</strong> quick turnaround updates based on test feedback or redesign goals.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>File Prep for Printing:</strong> watertight meshes and export guidance for your printer profile.
              </li>
            </ul>
          </div>
        </div>

        {/* Why choose us */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Why Choose STAR Labs</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}>
            {[
              {
                t: "Autodesk Expertise",
                d: "All projects are modeled exclusively in Autodesk Fusion 360, AutoCAD, or Inventor — ensuring compatibility, accuracy, and scalability.",
              },
              {
                t: "Manufacturing-Ready Design",
                d: "Every model is validated for 3D printing and practical production constraints.",
              },
              {
                t: "Parametric Flexibility",
                d: "Easily adjustable dimensions and controlled dependencies for quick revisions.",
              },
              {
                t: "Precision & Clarity",
                d: "Clean feature trees, labeled sketches, and clear documentation for seamless handoff.",
              },
              {
                t: "Secure Collaboration",
                d: "Private Autodesk cloud projects with optional NDA coverage for client data.",
              },
              {
                t: "Transparent Workflow",
                d: "Regular previews, milestone reviews, and direct communication during design.",
              },
            ].map((x) => (
              <div key={x.t} style={{
                borderRadius: "1rem",
                border: "1px solid #e5e5e5",
                padding: "1.5rem"
              }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem"
                }}>{x.t}</h3>
                <p style={{
                  color: "#374151",
                  fontSize: "1.25rem"
                }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Our Process</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem"
          }}>
            {[
              ["1. Brief", "We define your goals, functional needs, and target printer/material."],
              ["2. Concept Alignment", "Review sketches, references, or inspiration to set design intent."],
              ["3. Modeling", "Parametric modeling in Autodesk Fusion 360 or Inventor with continuous feedback."],
              ["4. Verification", "Geometry checks, tolerance validation, and export testing for your print setup."],
              ["5. Delivery", "Provide editable CAD, watertight STL/3MF files, and optional renders or drawings."],
            ].map(([title, desc]) => (
              <div key={title} style={{
                borderRadius: "1rem",
                border: "1px solid #e5e5e5",
                padding: "1.25rem"
              }}>
                <h3 style={{
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                  fontSize: "1.25rem"
                }}>{title}</h3>
                <p style={{
                  color: "#374151",
                  fontSize: "1.25rem"
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Deliverables</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem"
            }}>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Autodesk Fusion 360 (.f3d) or Inventor (.ipt / .iam) files</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>STEP (.step) and STL / 3MF exports ready for printing</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>2D technical drawings (PDF/DWG)</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Exploded view and basic assembly notes</li>
            </ul>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem"
            }}>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Material and printer orientation recommendations</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Optional render images for client presentations</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Revision log with change notes and version control</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>30-day post-delivery adjustment period</li>
            </ul>
          </div>
        </div>


        {/* Coming soon */}
        <div style={{
          borderRadius: "1rem",
          border: "1px solid #e5e5e5",
          padding: "2rem",
          backgroundColor: "#f9fafb",
          marginBottom: "4rem"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.5rem"
          }}>Coming Soon: Photo → 3D Model (AI)</h2>
          <p style={{
            color: "#374151",
            fontSize: "1.25rem"
          }}>
            Soon you'll be able to upload a simple photo and receive an editable 3D mesh file, powered by STAR Labs' in-house AI reconstruction system.
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
          }}>Request a Quotation</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1.5rem",
            fontSize: "1.25rem"
          }}>
            Send your references, sketches, and design requirements. We'll respond with a clear scope, cost, and estimated delivery timeline.
          </p>
          <a
            href="mailto:starlabs.ksa@gmail.com?subject=3D%20Modeling%20Quotation%20Request"
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
