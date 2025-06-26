# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in AllAiTools, please report it responsibly:

- **Email**: riyassajeed233@gmail.com
- **Subject**: [SECURITY] Vulnerability Report

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

We will respond within 48 hours and work to address the issue promptly.

## Security Measures

- JWT authentication for admin access
- Environment variable protection
- SQL injection prevention via Supabase RLS
- HTTPS enforced in production
- Regular dependency updates
- Input validation and sanitization

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Headers

The application includes security headers configured in `next.config.js`:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
