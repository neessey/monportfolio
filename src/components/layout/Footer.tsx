"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultSocials, defaultSettings, getSingleton, type SocialsContent, type SettingsContent } from "@/lib/cms";

export function Footer() {
  const pathname = usePathname();
  const [socials, setSocials] = useState<SocialsContent>(defaultSocials);
  const [settings, setSettings] = useState<SettingsContent>(defaultSettings);
  useEffect(() => { Promise.all([getSingleton<SocialsContent>("site","socials"), getSingleton<SettingsContent>("site","settings")]).then(([s,st]) => { if(s) setSocials({...defaultSocials,...s}); if(st) setSettings({...defaultSettings,...st}); }).catch(()=>{}); }, []);
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-mist/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 text-sm text-mist/45 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} {settings.footerText}</p>
        <div className="flex gap-8">
          <Link href="/" className="transition hover:text-mist">Home</Link>
          <a href={socials.github || "https://github.com/neessey"} target="_blank" rel="noreferrer" className="transition hover:text-mist">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
