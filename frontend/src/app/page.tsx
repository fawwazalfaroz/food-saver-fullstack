"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/landing/hero/hero";
import HowItWorks from "@/components/landing/how-it-works";
import StatsStrip from "@/components/landing/stats-strip";
import Testimonials from "@/components/landing/testimonials";
import Faq from "@/components/landing/faq";
import DownloadCta from "@/components/landing/download-cta";
import SiteFooter from "@/components/landing/site-footer";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsLoggedIn(true);
        setUserRole(payload.role || null);
      } catch {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    }
  }, []);

  return (
    <div className="fs-landing">
      {/* ── Sticky Nav ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#F7F0E1",
          paddingTop: "22px",
          paddingBottom: "12px",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FFFCF4",
            borderRadius: "999px",
            border: "1.5px solid #1F2A1B",
            boxShadow: "0 4px 0 #1F2A1B",
            padding: "10px 14px 10px 22px",
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <span className="fs-brand-mark" style={{ background: "#FFFCF4" }}>
              <Image src="/FoodSaver_Green.png" alt="Food Saver" width={20} height={20} className="object-contain" />
            </span>
            <span
              style={{
                fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
                fontSize: "22px",
                fontWeight: 800,
                color: "#1F2A1B",
                letterSpacing: "-0.02em",
              }}
            >
              Food Saver
            </span>
          </Link>

          {/* Nav links (hidden below 980px) */}
          <nav
            className="nav-links"
            style={{ display: "flex", gap: "4px" }}
          >
            {[
              { label: "Cara Kerja", href: "#how" },
              { label: "Cerita", href: "#testi" },
              { label: "FAQ", href: "#faq" },
              { label: "Download", href: "#download" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#1F2A1B",
                  textDecoration: "none",
                  transition: "background 150ms",
                  fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.background = "#D9E5BE")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.background = "transparent")
                }
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: auth buttons */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="fs-btn fs-btn-ghost" style={{ fontSize: "15px", padding: "8px 16px" }}>
                  Masuk
                </Link>
                <Link href="/register" className="fs-btn fs-btn-primary" style={{ fontSize: "15px", padding: "8px 18px" }}>
                  Download App
                </Link>
              </>
            ) : userRole === "PENYEDIA" ? (
              <Link href="/dashboard" className="fs-btn fs-btn-primary" style={{ fontSize: "15px", padding: "8px 18px" }}>
                Ke Dashboard Toko
              </Link>
            ) : (
              <Link href="/marketplace" className="fs-btn fs-btn-primary" style={{ fontSize: "15px", padding: "8px 18px" }}>
                Buka Marketplace
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main>
        <Hero />
        <HowItWorks />
        <StatsStrip />
        <Testimonials />
        <Faq />
        <DownloadCta />
        <SiteFooter />
      </main>

      <style>{`
        @media (max-width: 980px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 560px) {
          .fs-btn-ghost { display: none !important; }
        }
      `}</style>
    </div>
  );
}
