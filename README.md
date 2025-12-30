# Lumen Trio Portfolio

Modern, single-page portfolio landing site for a three-person development studio. Built with Next.js App Router, TypeScript, and Tailwind CSS, featuring restrained motion and a lightweight 3D accent.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion (scroll-based motion)
- @react-three/fiber + @react-three/drei (3D accent)

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Notes on Motion and 3D

- Motion is applied sparingly in the hero and the ambient motion section using Framer Motion scroll transforms.
- The contact section uses a lightweight Three.js scene (single geometry + simple lighting) to keep performance sharp.
- Most sections are static and content-focused to maintain clarity and readability.

## Project Structure

- `src/app` - Next.js layout and page shell
- `src/features/landing` - Feature-based components and data for the landing page
