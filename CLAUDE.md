# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **cofounder.run** — an AI co-founder product. Static site hosted on GitHub Pages with custom domain (`CNAME` → `cofounder.run`).

## Architecture

Single-file static site: `index.html` with inline CSS and minimal inline JS. No dependencies, no build step. Deployment is automatic via GitHub Pages on push to `main`.

The waitlist form in `index.html` posts to a Google Apps Script web app endpoint. The backend code lives in `apps-script/Code.gs` (deployed separately via Google Apps Script, not via GitHub Pages). It saves emails to a Google Sheet and sends Telegram notifications.

## Development

No build or test commands — open `index.html` in a browser to preview. To deploy, push to `main`.

## Design Conventions

- Strict monochrome: black `#050505` background, white `#f5f5f5` text, gray `#8f8f98` accents — no color hues anywhere
- The accent is white itself: white button, white focus ring, white ::selection
- Fluid typography using `clamp()` for responsive sizing
- System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- One screen = one offer: headline, description, scannable facts, price, one form. Minimal and quiet.
