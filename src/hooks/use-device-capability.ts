"use client";

import { useEffect, useState } from "react";

/**
 * Detects whether heavy GPU effects should be enabled.
 * Disables 3D on: reduced-motion preference, low core counts,
 * low device memory, or missing WebGL support.
 */
export function useDeviceCapability(): { enable3D: boolean; ready: boolean } {
  const [state, setState] = useState({ enable3D: false, ready: false });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }

    setState({
      enable3D: !prefersReducedMotion && webgl && cores >= 4 && memory >= 4,
      ready: true,
    });
  }, []);

  return state;
}
