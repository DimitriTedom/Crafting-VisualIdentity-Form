# 🎨 Visual Identity & Brand Form

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.8-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.13-cyan?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**A comprehensive client onboarding form for collecting detailed brand identity information, automatically generating Excel reports and sending email notifications.**

[🚀 Quick Start](#-quick-start) • [📖 Features](#-features) • [⚙️ Setup](#️-setup) • [🚢 Deploy](#-deployment)

</div>

---

## 🎯 Overview

This application provides a professional, comprehensive form for collecting all necessary information to create a complete visual identity for clients, including:

- **Brand Strategy** - Mission, values, positioning
- **Visual Identity** - Logo, colors, typography
- **Digital Presence** - Website, social media, SEO
- **Market Analysis** - Target audience, competitors
- **Project Details** - Budget, timeline, deliverables

## ✨ Key Features

### 📋 18 Comprehensive Sections
- **Contact Information** - Client details and preferences (Includes option to send file to client)
- **Company Information** - Business DNA and unique value proposition
- **Target Audience** - Customer demographics and pain points
- **Visual Identity** - Colors, logo styles, typography preferences
- **Brand Positioning** - Personality, voice, key messages
- **Social Media** - Platform strategy and content plans
- **Website Needs** - Goals, features, technical requirements
- **Budget & Timeline** - Project constraints and priorities
- **Market Analysis** - Competitors and differentiation strategy
- **Marketing Materials** - Print and digital asset needs
- **Customer Experience** - Journey mapping and service approach
- **Content & Communication** - Topics, languages, accessibility
- **SEO & Digital Marketing** - Keywords, advertising budget
- **Analytics & Metrics** - Success KPIs and reporting
- **Brand Inspiration** - Loved and disliked brand examples
- **Additional Notes** - Special requests and concerns

### 🎨 Modern UI/UX
- ✨ Animated gradient headers with icons
- 🎨 Color-coded sections with hover effects
- 📱 Fully responsive design
- 🌙 Dark mode support
- 🔍 Icon-enhanced form fields
- ⚡ Real-time form validation

### 📊 Automated Excel Generation
- Automatically downloads complete Excel file
- All 80+ fields organized by section
- Ready for immediate use in project planning

### 📧 Email Notifications
- Sends summary to admin (dimitritedom@gmail.com)
- **NEW:** Optional email copy to client
- Checkbox to receive Excel file via email
- Separate email field for file delivery

---

## 📁 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [⚙️ Setup](#️-setup)
- [📧 Email Configuration](#-email-configuration)
- [🎨 Customization](#-customization)
- [🚢 Deployment](#-deployment)
- [🐳 Docker Support](#-docker-support)
- [📜 Available Scripts](#-available-scripts)
- [🛠️ Tech Stack](#️-tech-stack)
- [📄 License](#-license)

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/visual-identity-form.git
   cd visual-identity-form
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

---

## ⚙️ Setup

### Environmental Variables

Create a `.env.local` file in the root directory if you want to use real email sending functionality:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 📧 Email Configuration (EmailJS)

To enable real email sending (instead of the current simulation mode):

1. **Create an account** on [EmailJS](https://www.emailjs.com/)
2. **Add a Service** (e.g., Gmail)
3. **Create an Email Template** containing these variables:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{company_name}}`
   - `{{message}}`
4. **Update `src/lib/email-service.ts`** with your keys or use environment variables.

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com).
3. Import your project from GitHub.
4. Vercel will automatically detect Vite and settings.
5. Click **Deploy**.

### Docker

Build and run using Docker:

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run
```

The application will be available at `http://localhost:80`.

---

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Excel Generation:** [SheetJS (XLSX)](https://sheetjs.com/)
- **Email:** [EmailJS](https://www.emailjs.com/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br />

<div align="center">
  <sub>Built with ❤️ by SnowDev</sub>
</div>

