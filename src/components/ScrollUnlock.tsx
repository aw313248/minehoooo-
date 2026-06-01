"use client";

import { useEffect } from "react";

/**
 * Global `html` has `overflow: hidden` set in globals.css (because the homepage
 * PageScroll component manages its own snap-page scrolling). Sub-routes like
 * /field-notes need normal browser scrolling — this component reverses the
 * lock on mount and restores it on unmount.
 */
export default function ScrollUnlock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight   = html.style.height;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight   = body.style.height;

    html.style.overflow = "auto";
    html.style.height   = "auto";
    body.style.overflow = "auto";
    body.style.height   = "auto";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.height   = prevHtmlHeight;
      body.style.overflow = prevBodyOverflow;
      body.style.height   = prevBodyHeight;
    };
  }, []);

  return null;
}
