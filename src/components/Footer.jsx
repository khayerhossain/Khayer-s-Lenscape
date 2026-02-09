"use client";

import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import Container from "./ui/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] pt-12 pb-12 overflow-hidden">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 mb-6">
          {/* Brand & Socials Column */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
                Khayer&apos;s <span className="text-red-600">Lenscape</span>
              </h2>
              <p className="text-[var(--color-dim)] text-lg leading-relaxed max-w-md mb-4">
                Wandering the world to capture the raw, the beautiful, and the
                fleeting. Every image tells a story <br /> thank you for being
                part of mine.
              </p>
              <a
                href="mailto:hello.khayerslendscape@gmail.com"
                className="text-white/60 hover:text-red-500 transition-colors text-sm font-medium mb-8 block"
              >
                hello.khayerslendscape@gmail.com
              </a>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              {[
                {
                  Icon: Facebook,
                  href: "https://www.facebook.com/profile.php?id=61570257675905",
                  color: "#1877F2",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/",
                  color: "#E4405F",
                },
                {
                  Icon: Twitter,
                  href: "https://x.com/khayerhossain45",
                  color: "#000000",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/khayer-hossain/",
                  color: "#0A66C2",
                },
              ].map(({ Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--brand-color": color }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-[12px] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 group hover:border-[var(--brand-color)] hover:bg-[var(--brand-color)] hover:shadow-[0_0_15px_var(--brand-color)]/30"
                >
                  <Icon
                    size={18}
                    className="group-hover:scale-110 transition-transform md:size-[20px]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter/Action Column */}
          <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right">
            <h3 className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 md:mb-8">
              Stay <span className="text-red-600">Updated</span>
            </h3>
            <p className="text-[var(--color-dim)] text-xs md:text-sm mb-6 max-w-sm md:max-w-md">
              Join the journey. No spam, just stories and updates from the road.
            </p>
            <form className="relative max-w-sm md:max-w-md w-full">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-red-900 focus:bg-white/10 transition-all text-xs md:text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition-colors">
                <ArrowUpRight size={14} className="md:size-[16px]" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-dim)]">
          <p>
            &copy; {currentYear} Khayer&apos;s Lenscape. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
