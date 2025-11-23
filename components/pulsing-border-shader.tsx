"use client";

import { PulsingBorder } from "@paper-design/shaders-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getInstitutions, Institution } from "@/lib/data";
import { Building } from "lucide-react";

interface PulsingBorderShaderProps {
  className?: string;
}

export default function PulsingBorderShader({ className = "" }: PulsingBorderShaderProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Hydration hatası önlemek için
  useEffect(() => {
    setMounted(true);
  }, []);

  // Kurum logolarını yükle
  useEffect(() => {
    async function loadInstitutions() {
      try {
        const data = await getInstitutions();
        // Logosu olan kurumları filtrele
        const institutionsWithLogos = data.filter(
          (inst) => inst.logo && inst.logo.trim() !== ""
        );
        // En az 5 kurum olacak şekilde ayarla
        const finalInstitutions =
          institutionsWithLogos.length >= 5
            ? institutionsWithLogos.slice(0, 20) // En fazla 20 kurum göster
            : data.slice(0, 20);
        setInstitutions(finalInstitutions);
      } catch (error) {
        console.error("Kurumlar yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    }

    if (mounted) {
      loadInstitutions();
    }
  }, [mounted]);

  // 3 saniyede bir logo değiştir
  useEffect(() => {
    if (institutions.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % institutions.length);
    }, 3000); // 3 saniye

    return () => clearInterval(interval);
  }, [institutions.length]);

  // Gece/gündüz moduna göre renkler
  const isDark = resolvedTheme === "dark" || theme === "dark";

  // Gündüz modu renkleri (daha parlak)
  const lightColors = ["#5800FF", "#BEECFF", "#E77EDC", "#FF4C3E"];
  // Gece modu renkleri (daha yumuşak ve koyu)
  const darkColors = ["#7C3AED", "#60A5FA", "#A78BFA", "#F87171"];

  const colors = isDark ? darkColors : lightColors;
  const colorBack = isDark ? "#1F2937" : "#FFFFFF";

  const currentInstitution = institutions[currentLogoIndex];

  if (!mounted) {
    // SSR için placeholder - mobil uyumlu
    return (
      <div
        className={`w-full h-full rounded-full ${className}`}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(31, 41, 55, 0.5) 100%)"
            : "radial-gradient(circle, rgba(88, 0, 255, 0.1) 0%, rgba(255, 255, 255, 0.5) 100%)",
        }}
        aria-label="MevzuatGPT Yapay Zeka Animasyonu"
      />
    );
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      aria-label="MevzuatGPT Yapay Zeka Animasyonu"
    >
      {/* Yuvarlak dönen animasyon için wrapper */}
      <div className="w-full h-full rounded-full animate-spin-slow relative">
        <PulsingBorder
          colors={colors}
          colorBack={colorBack}
          speed={1.5}
          roundness={1}
          thickness={0.05}
          softness={0.1}
          intensity={1}
          spotSize={0.1}
          pulse={0.2}
          smoke={0.5}
          smokeSize={2}
          scale={0.65}
          rotation={0}
          frame={9161408.251009725}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundImage: isDark
              ? "radial-gradient(circle in oklab, oklab(0% 0 -.0001 / 0%) 25.22%, oklab(20% 0.029 -0.184) 43.89%, oklab(0% 0 -.0001 / 0%) 60.04%)"
              : "radial-gradient(circle in oklab, oklab(0% 0 -.0001 / 0%) 25.22%, oklab(30.5% 0.029 -0.184) 43.89%, oklab(0% 0 -.0001 / 0%) 60.04%)",
          }}
        />
      </div>

      {/* Merkezde kurum logosu - sabit, dönmeyen, animasyonun üzerinde */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div 
          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center select-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'auto' }}
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center animate-pulse pointer-events-none">
              <Building className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 dark:text-gray-500" />
            </div>
          ) : currentInstitution ? (
            <div
              key={currentInstitution.id}
              className="w-full h-full flex items-center justify-center p-2 sm:p-3 lg:p-4 logo-fade-animation relative"
            >
              {currentInstitution.logo &&
              currentInstitution.logo.trim() !== "" ? (
                <>
                  <Image
                    src={currentInstitution.logo}
                    alt={`${currentInstitution.name} logosu`}
                    width={160}
                    height={160}
                    className="w-full h-full object-contain pointer-events-none relative z-0"
                    loading="lazy"
                    unoptimized={true}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className =
                          "w-full h-full flex items-center justify-center pointer-events-none";
                        fallback.innerHTML =
                          '<svg class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Transparent overlay - ekstra koruma */}
                  <div 
                    className="absolute inset-0 cursor-not-allowed z-10"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ pointerEvents: 'auto' }}
                  />
                </>
              ) : (
                <Building className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 dark:text-gray-500 pointer-events-none" />
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              <Building className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

