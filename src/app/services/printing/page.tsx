import Link from "next/link";

export const metadata = {
  title: "3D Printing & Manufacturing | STAR Labs",
  description:
    "FDM and SLA 3D printing for rapid prototyping and short-run parts. Many materials and colors, Autodesk-ready files.",
};

export default function PrintingService() {
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
        }}>3D Printing & Manufacturing</h1>
        <p style={{
          maxWidth: "32rem",
          margin: "0 auto",
          color: "#374151",
          fontSize: "1.25rem"
        }}>
          Fast, reliable additive manufacturing with FDM & SLA. Perfect for functional prototypes, fit checks,
          enclosures, jigs, models, and presentation pieces.
        </p>
      </section>

      <section style={{
        maxWidth: "64rem",
        margin: "0 auto",
        padding: "0 1rem 6rem"
      }}>
        {/* What we print */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Processes We Offer</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            <div style={{
              borderRadius: "1rem",
              border: "1px solid #e5e5e5",
              padding: "1.5rem"
            }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>FDM (Fused Deposition Modeling)</h3>
              <p style={{
                color: "#374151",
                marginBottom: "0.75rem",
                fontSize: "1.25rem"
              }}>
                Versatile and cost-effective for quick iterations and durable functional parts.
              </p>
              <ul style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem"
              }}>
                <li style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>Great for enclosures, brackets, fixtures, and large prints.</li>
                <li style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>Wide palette of materials and colors.</li>
                <li style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>Balanced strength, price, and turnaround time.</li>
              </ul>
            </div>
            <div style={{
              borderRadius: "1rem",
              border: "1px solid #e5e5e5",
              padding: "1.5rem"
            }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>SLA (Stereolithography)</h3>
              <p style={{
                color: "#374151",
                marginBottom: "0.75rem",
                fontSize: "1.25rem"
              }}>
                High-detail resin printing for smooth surfaces, small features, and presentation-quality parts.
              </p>
              <ul style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem"
              }}>
                <li style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>Excellent for cosmetic models, miniatures, and precise fit checks.</li>
                <li style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>Specialty resins for toughness, heat resistance, or transparency.</li>
                <li style={{ marginBottom: "0.25rem", fontSize: "1.25rem" }}>Minimal layer lines; paint/finish-ready surfaces.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why rapid prototyping */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Why Rapid Prototyping</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}>
            {[
              {
                t: "Accelerate Iteration",
                d: "Test, learn, and refine quickly—shorten the path from idea to validated design.",
              },
              {
                t: "Reduce Risk & Cost",
                d: "Catch fit, tolerance, and usability issues before committing to tooling or large orders.",
              },
              {
                t: "Real-World Feedback",
                d: "Evaluate parts in-hand for ergonomics, assembly, and performance.",
              },
              {
                t: "Design Freedom",
                d: "Print complex geometries that are difficult or costly to machine.",
              },
              {
                t: "Bridge to Production",
                d: "Create jigs, fixtures, and pilot runs while final manufacturing ramps up.",
              },
              {
                t: "Custom & On-Demand",
                d: "Make one-offs or short runs without minimum order quantities.",
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

        {/* Materials & Colors */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Materials & Colors</h2>
          <p style={{
            color: "#374151",
            marginBottom: "1rem",
            fontSize: "1.25rem"
          }}>
            Choose from a broad selection to match strength, temperature resistance, finish quality, and aesthetics.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            <div style={{
              borderRadius: "1rem",
              border: "1px solid #e5e5e5",
              padding: "1.5rem"
            }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.75rem"
              }}>FDM Materials</h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "0.75rem"
              }}>
                {[
                  "PLA / PLA+",
                  "PETG",
                  "ABS",
                  "ASA",
                  "TPU (flexible)",
                  "Nylon",
                  "Nylon + CF (composite)",
                ].map((tag) => (
                  <span key={tag} style={{
                    display: "inline-block",
                    borderRadius: "9999px",
                    backgroundColor: "#001f3f",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    padding: "0.25rem 0.75rem"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{
                color: "#374151",
                fontSize: "1.25rem"
              }}>
                Colors: core neutrals (black/white/gray) plus a wide range of solid colors. Specialty filaments available on request.
              </p>
            </div>

            <div style={{
              borderRadius: "1rem",
              border: "1px solid #e5e5e5",
              padding: "1.5rem"
            }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.75rem"
              }}>SLA Resins</h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "0.75rem"
              }}>
                {[
                  "Standard (model)",
                  "Tough / Durable",
                  "High-Temp",
                  "Clear / Translucent",
                  "Rigid / Filled",
                  "Flexible (elastomeric)",
                ].map((tag) => (
                  <span key={tag} style={{
                    display: "inline-block",
                    borderRadius: "9999px",
                    backgroundColor: "#001f3f",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    padding: "0.25rem 0.75rem"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{
                color: "#374151",
                fontSize: "1.25rem"
              }}>
                Colors: black, white, gray, clear, and specialty tones. Paint-ready and polishable options available.
              </p>
            </div>
          </div>
        </div>

        {/* File Prep & Handover */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>File Prep & Handover</h2>
          <ul style={{
            listStyleType: "disc",
            paddingLeft: "1.5rem"
          }}>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
              <strong>Preferred Files:</strong> STL or 3MF. We also accept STEP for orientation guidance.
            </li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
              <strong>Modeled in Autodesk:</strong> Our upstream CAD is built in Autodesk apps for clean, watertight exports.
            </li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
              <strong>Checks:</strong> wall thickness, overhangs, supports, and orientation recommendations.
            </li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
              <strong>Finish Options:</strong> sanding, priming/painting (on request), basic post-processing for SLA.
            </li>
            <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
              <strong>Quality Control:</strong> visual inspection, dimensional spot-checks, and test fit (when applicable).
            </li>
          </ul>
        </div>

        {/* Order Process */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>How to Order</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem"
          }}>
            {[
              ["1. Share Files", "Send STL/3MF (and STEP if needed), quantity, and color/material preferences."],
              ["2. Review", "We confirm feasibility, suggest orientation/material, and flag any risks."],
              ["3. Quote", "You receive price and lead time based on material, size, and volume."],
              ["4. Print", "We manufacture, post-process (if requested), and inspect."],
              ["5. Delivery", "Pickup or shipping with basic packing; digital print report provided."],
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
            Include your files (STL/3MF), target material, color, quantities, and any special requirements (strength, heat, flexibility).
          </p>
          <a
            href="mailto:starlabs.ksa@gmail.com?subject=3D%20Printing%20Quotation%20Request"
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

