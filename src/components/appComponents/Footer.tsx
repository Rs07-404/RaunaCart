import React from "react";
import Brand from "./brand";
import { APP_NAME } from "@/config/app/constants";

const footerLinks = [
    {
        title: "Customer Service",
        links: ["Contact Us", "Order Tracking", "Returns", "FAQs"],
    },
    {
        title: "About Us",
        links: ["Our Story", "Careers", "Blog", "Press"],
    },
    {
        title: "Shop",
        links: ["Men", "Women", "Kids", "Sale"],
    },
];

const socialIcons = [
    { name: "Facebook", url: "#", icon: "🌐" },
    { name: "Instagram", url: "#", icon: "📸" },
    { name: "Twitter", url: "#", icon: "🐦" },
];


/**
 * Footer component for the RaunaCart e-commerce application.
 *
 * Renders the site footer, including brand information, a brief description,
 * social media icons, and categorized navigation links.
 *
 * @component
 * @returns {JSX.Element} The rendered footer section.
 */
const Footer: React.FC = () => (
    <footer
        style={{
            background: "#23272f",
            color: "#fff",
            padding: "2.5rem 0 1rem 0",
            marginTop: "3rem",
            fontFamily: "inherit",
        }}
    >
        <div
            style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "2rem",
                padding: "0 1rem",
            }}
        >
            <div className="flex flex-col items-start">
                <Brand />
                <p style={{ maxWidth: 300, color: "#b0b0b0", fontSize: 15 }}>
                    Your one-stop shop for the latest trends and best deals. Shop smart, shop on {APP_NAME}!
                </p>
                <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                    {socialIcons.map((icon) => (
                        <a
                            key={icon.name}
                            href={icon.url}
                            aria-label={icon.name}
                            style={{
                                color: "#fff",
                                fontSize: 22,
                                textDecoration: "none",
                                transition: "color 0.2s",
                            }}
                            onMouseOver={e => (e.currentTarget.style.color = "#ff6f61")}
                            onMouseOut={e => (e.currentTarget.style.color = "#fff")}
                        >
                            {icon.icon}
                        </a>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", gap: "3rem" }}>
                {footerLinks.map((section) => (
                    <div key={section.title}>
                        <h4 style={{ fontWeight: 600, marginBottom: 10 }}>{section.title}</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {section.links.map((link) => (
                                <li key={link} style={{ marginBottom: 8 }}>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-all text-[15px] text-background/70"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <div
            style={{
                borderTop: "1px solid #393e46",
                marginTop: 32,
                paddingTop: 16,
                textAlign: "center",
                color: "#b0b0b0",
                fontSize: 14,
            }}
        >
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
    </footer>
);

export default Footer;