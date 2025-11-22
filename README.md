# Quantum Vault

A secure, cross-platform password manager built with Electron and React, featuring military-grade encryption to keep your credentials safe.

## Features

- **AES-256 GCM Encryption** — Industry-standard authenticated encryption for your passwords
- **PBKDF2-HMAC-SHA256 Key Derivation** — Secure key derivation with configurable iterations to protect against brute-force attacks
- **SQLite Database** — Lightweight, reliable local storage for your encrypted vault
- **Cross-Platform** — Works on Windows, macOS, and Linux
- **Modern UI** — Built with React and Vite for a fast, responsive experience
- **Offline-First** — Your data stays on your device; no cloud required

## Tech Stack

- **Frontend:** React + Vite
- **Desktop Framework:** Electron
- **Database:** SQLite
- **Encryption:** AES-256 GCM
- **Key Derivation:** PBKDF2-HMAC-SHA256

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/jagathkiran/quantum-vault.git
cd quantum-vault

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## Usage

1. **Create a Master Password** — On first launch, create a strong master password. This is the only password you'll need to remember.

2. **Add Credentials** — Store your website logins, secure notes, and other sensitive information.

3. **Access Anytime** — Your encrypted vault is always available offline.

## Security Architecture

### Encryption Flow

```
Master Password
      ↓
PBKDF2-HMAC-SHA256 (100,000+ iterations)
      ↓
256-bit Encryption Key
      ↓
AES-256 GCM Encryption
      ↓
Encrypted Vault (SQLite)
```

### Security Features

- **Zero-Knowledge Architecture** — Your master password never leaves your device
- **Authenticated Encryption** — AES-GCM provides both confidentiality and integrity
- **Salt & IV** — Unique salt and initialization vector for each encryption operation
- **Memory Protection** — Sensitive data is cleared from memory after use

## Development

```bash
# Run development server with hot reload
npm run dev

# Run ESLint
npm run lint

# Build Electron app
npm run electron:build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is provided "as-is" without warranty. While every effort has been made to ensure security, users are responsible for their own data. Always maintain backups of important credentials.

## Author

**Jagath Kiran**

---

*Built with ❤️ and strong cryptography*
