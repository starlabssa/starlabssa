import Link from "next/link";

export const metadata = {
  title: "Web Design & Build | STAR Labs",
  description:
    "Modern, performant websites and apps. Strategy, UX/UI, development, SEO, analytics, and launch.",
};

export default function WebService() {
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
        }}>Web Design & Build</h1>
        <p style={{
          maxWidth: "32rem",
          margin: "0 auto",
          color: "#374151",
          fontSize: "1.25rem"
        }}>
          We design and ship fast, reliable websites and apps—built for growth,
          credibility, and conversion.
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
                <strong>Strategy & Architecture:</strong> site mapping, user flows, content strategy.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>UX/UI Design:</strong> clean, accessible interfaces with responsive layouts.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Frontend Development:</strong> React/Next.js, modern CSS, component systems.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Backend & APIs:</strong> headless CMS, auth, data models, integrations.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>SEO & Performance:</strong> technical SEO, Core Web Vitals, analytics.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Deployment & Hosting:</strong> CI/CD, Vercel/Netlify, domains, SSL, email.
              </li>
            </ul>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem"
            }}>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>E-commerce:</strong> product catalogs, checkout, payments (Stripe).
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>CMS Setup:</strong> Sanity, Contentful, Strapi, or WordPress headless.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Localization:</strong> multi-language content and routing.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Accessibility (A11y):</strong> WCAG-friendly patterns and testing.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Security:</strong> best practices, secret management, attack-surface hardening.
              </li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>
                <strong>Ongoing Care:</strong> reliability checks, updates, and feature sprints.
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
                t: "Speed & Stability",
                d: "We prioritize performance, uptime, and reliability—measured and monitored.",
              },
              {
                t: "Design That Converts",
                d: "Clear messaging, hierarchy, and UX patterns that turn visitors into customers.",
              },
              {
                t: "Future-Ready Stack",
                d: "Modular architecture that scales without rewriting the whole system.",
              },
              {
                t: "Owner-Friendly",
                d: "Non-technical teams can update content safely via a CMS.",
              },
              {
                t: "Transparent Process",
                d: "Milestones, demos, and async updates so you always know status and scope.",
              },
              {
                t: "Security by Default",
                d: "Hardening, HTTPS, auth best practices, and dependency hygiene.",
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

        {/* Our process */}
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
              ["1. Discovery", "Goals, audience, success metrics, and technical constraints."],
              ["2. Architecture", "Site map, flows, component/system design, CMS schema."],
              ["3. Design", "Wireframes → high-fidelity UI with responsive states."],
              ["4. Build", "Frontend + backend integrations, QA, accessibility checks."],
              ["5. Launch & Care", "Deploy, monitor, iterate with analytics-driven improvements."],
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
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Responsive UI kit & component library</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Production-ready codebase (Git repo) with README</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Configured CMS & content models</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>SEO meta, sitemap, robots.txt</li>
            </ul>
            <ul style={{
              listStyleType: "disc",
              paddingLeft: "1.5rem"
            }}>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Analytics & monitoring (e.g., GA4, Vercel Analytics)</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Deployment pipeline (CI/CD) & hosting setup</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Admin handover & training</li>
              <li style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>30-day post-launch support (baseline)</li>
            </ul>
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }}>Tech Stack</h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}>
            {[
              "Next.js / React",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Vercel / Netlify",
              "Stripe / Payments",
              "Sanity / Contentful / Strapi",
              "PostgreSQL / Prisma",
              "Auth.js",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-block",
                  borderRadius: "9999px",
                  backgroundColor: "#001f3f",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  padding: "0.25rem 0.75rem"
                }}
              >
                {tag}
              </span>
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
            Tell us about your goals, timeline, and must-have features. We'll respond with a clear scope and estimate.
          </p>
          <a
            href="mailto:starlabs.ksa@gmail.com?subject=Web%20Design%20Quotation%20Request"
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

