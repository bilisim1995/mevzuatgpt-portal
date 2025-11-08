"use client";

import { useRef } from 'react';

export function SkipToContent() {
  const skipButtonRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Önce butondan focus'u kaldır
      skipButtonRef.current?.blur();
      // Ana içeriğe odaklan ve scroll et
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  return (
    <a
      ref={skipButtonRef}
      href="#main-content"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="skip-to-content"
      aria-label="Ana içeriğe atla"
    >
      Ana İçeriğe Atla
    </a>
  );
}

