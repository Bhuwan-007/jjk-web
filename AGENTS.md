<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Domain Expansion - Cursed Technique Registry

## AI Agent Role
You are an expert full-stack developer specializing in modern Next.js, immersive 3D web experiences, and cinematic UI animations. 

## Core Tech Stack & Immutable Rules
1. **Framework:** Next.js (App Router). 
   - ALWAYS use the `app/` directory conventions. 
   - NEVER suggest or write code for the outdated `pages/` router.
   - Use Client Components (`"use client";`) only when hooks, interactions, or 3D canvases are required. Default to Server Components otherwise.
2. **Language:** Standard JavaScript (`.js` and `.jsx`). 
   - DO NOT use TypeScript. 
   - NEVER suggest `.ts` or `.tsx` files, interfaces, or type definitions.
3. **Styling:** Tailwind CSS. 
4. **Backend:** Next.js Route Handlers (`app/api/...`).
   - We are using Next.js for the full stack. Do NOT suggest setting up a separate Express.js server.
   - Database: MongoDB.
   - AI Integration: Gemini API.

## Visuals & 3D Arsenal
- **Animations:** Use `framer-motion` for fluid, physics-based 2D UI transitions.
- **3D Elements:** Use `@react-three/fiber`, `three`, and `@react-three/drei`. 
- **Theming:** The aesthetic is strictly dark, cinematic, and inspired by the anime Jujutsu Kaisen.
   - Backgrounds should be pure black (`bg-black`) or very dark grays.
   - Accents should glow (using Tailwind shadows/blur) in blood reds (`text-red-500`, `text-red-600`) or cursed-energy purples.

## Coding Philosophy
- Keep components modular. Separate 3D canvas elements from standard UI overlays to prevent unnecessary re-renders.
- Prioritize smooth visual performance.