# Frontend Contribution Guide

Welcome to the frontend repository.

This document defines the development standards, structure, and workflow for all contributors.

---

# Tech Stack

- React
- Vite
- TailwindCSS
- Axios
- React Router

---

# Folder Structure

src/
│
├── assets/           # Images, icons, static files
├── components/       # Reusable UI components
│   ├── common/
│   ├── forms/
│   └── layout/
│
├── pages/            # Route pages
├── services/         # API calls
├── hooks/            # Custom hooks
├── context/          # Context providers
├── utils/            # Helper functions
├── constants/        # Static constants
├── styles/           # Global styles
└── main.jsx

---

# Naming Conventions

## Components
- Use PascalCase
- Example:
  - UserCard.jsx
  - DashboardLayout.jsx

## Hooks
- Must start with `use`
- Example:
  - useAuth.js
  - useDebounce.js

## Utility Files
- Use camelCase
- Example:
  - formatDate.js
  - validateEmail.js

## CSS Classes
- Prefer Tailwind utilities
- Avoid unnecessary custom CSS

---

# Component Rules

## Keep Components Small
A component should do one thing well.

## Reusability
If repeated more than twice:
→ Move into reusable component.

## API Calls
Do NOT directly call APIs inside UI components.

Use:
- services/
- hooks/

## State Management
- Local state first
- Context only when necessary

---

# Branch Naming

Use:

feature/<feature-name>
fix/<bug-name>
refactor/<module-name>

Examples:
- feature/login-page
- feature/attendance-dashboard
- fix/navbar-mobile
- refactor/auth-flow

---

# Commit Message Style

Format:

type: short description

Examples:
- feat: added login api integration
- fix: corrected sidebar responsiveness
- refactor: cleaned dashboard components
- chore: updated dependencies

Allowed Types:
- feat
- fix
- refactor
- chore
- docs
- style

---

# Pull Request Rules

Before creating PR:

✅ Code compiles  
✅ No console errors  
✅ Responsive checked  
✅ API integration tested  
✅ No unused imports  
✅ No commented dead code

PR title format:

[type] Short Description

Example:
[FEAT] Add assessment dashboard

---

# Environment Setup

## Installation

```bash
npm install
