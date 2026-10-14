# Sparout — 3D website prototype

A cinematic, responsive martial arts landing page for Sparout with a real-time animated Three.js scene.

## Run locally

Use a local web server (ES modules do not reliably run from file://):

```bash
python -m http.server 5173
```

Open http://localhost:5173.

## Current implementation

- Responsive hero, navigation, student/master/parent/school sections and CTAs.
- Procedurally generated **3D martial arts character**, moving arms, floating stance, lighting, particles, platform and rings.
- Pointer-responsive character and camera.
- Reduced-motion support and a graceful message if WebGL is unavailable.
- No build step or paid 3D asset dependency. Three.js is loaded from a CDN, so internet is required.

## Next steps

- Replace procedural fighter with an original rigged GLB/GLTF ninja/kung-fu character and professionally authored combat animations.
- Connect Sparout's real authentication, signup flows, verified masters and student data.
- Add additional 3D sections, image assets, loading strategy, automated browser tests and production hosting.
- Review content, brand guidelines and final accessibility/performance with stakeholders.

## Deployment

This repository is not automatically deployed by these commits. Point your static hosting service at the repository root and serve index.html over HTTPS. Existing sparout.com remains unchanged until hosting/domain configuration is updated.
