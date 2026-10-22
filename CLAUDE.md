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

- Dark theme: near-black `#07070d` background, white `#f4f3fb` text, muted `#a3a0ba`
- Electric violet accent `#8b7cff` with a blue secondary `#6ea8ff` (gradient text/buttons, glow effects)
- Fluid typography using `clamp()` for responsive sizing
- System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- Glass-style cards on a faint grid/glow background — no frameworks or libraries
