# Composely ⚡️ Your AI Copilot for Crafting React Email Templates ⚡️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Choose your license -->
[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Yes-black?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-▲-black)](https://sdk.vercel.ai/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-Used-4285F4?logo=google)](https://ai.google.dev/)

Tired of manually coding email templates? Composely leverages the power of AI (specifically Google's Gemini model via the Vercel AI SDK) to generate clean, production-ready React Email templates directly from your prompts. Describe the email you need, and watch Composely generate the TSX code using `@react-email/components` and Tailwind CSS, complete with a live preview!

**[➡️ Live Demo Link ([Composely](https://composely.vercel.app/))]**

---

## ✨ Key Features

- **AI-Powered Generation:** Describe your desired email template, and let the AI generate the TSX code.
- **React Email Focused:** Generates code specifically using `@react-email/components`.
- **Tailwind CSS Styling:** Leverages Tailwind CSS utility classes for easy styling and customization.
- **Live Preview:** Instantly see how your generated template looks using an integrated CodeSandbox Sandpack instance.
- **Code Inspector:** View the generated TSX source code alongside the preview.
- **Resizable Preview:** Simulate different screen sizes (Desktop, Tablet, Mobile) for responsive checks.
- **Streaming Responses:** Get code generated in real-time as the AI thinks.
- **Clean Output:** Produces self-contained, prop-less components ready for integration.
- **Tech Stack:** Built with Next.js App Router, TypeScript, and shadcn/ui.
- **Dark Mode:** Sleek interface with theme support.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15 w/ App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) integrating with [Google Gemini](https://ai.google.dev/) (`gemini-2.0-flash-thinking-exp`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Email Components:** [@react-email/components](https://react.email/docs/components/overview)
- **Live Preview:** [CodeSandbox Sandpack](https://sandpack.codesandbox.io/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation:** [Motion](https://motion.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

---

## 🚀 Getting Started

Follow these steps to get Composely running locally:

**1. Prerequisites:**

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/installation) (v10.7.0 or compatible)
- [Git](https://git-scm.com/)
- A **Google AI API Key**: Obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

**2. Clone the Repository:**

git clone https://github.com/SteveAlden/composely.git
cd composely
pnpm install

**3. Install Dependencies:**
pnpm install
Use code with caution.
Bash
**4. Set Up Environment Variables:**
Create a .env.local file in the root of the project.
Add your Google AI API key:

#### .env.local

GOOGLE_GENERATIVE_AI_API_KEY=YOUR_API_KEY_HERE
Use code with caution.
Env
(The Vercel AI SDK automatically picks up this variable for the Google provider).
**5. Run the Development Server:**
pnpm dev
Use code with caution.
Bash
**6. Open Your Browser:**
Navigate to http://localhost:3000. You should see Composely ready to generate email templates!

⚙️ How It Works
User Input: You provide a description of the email template you want in the chat input.
API Request: The Next.js frontend sends the prompt (and conversation history) to the /api/chat API route.
AI Interaction: The API route uses the Vercel AI SDK to stream a request to the configured Google Gemini model, including the system prompt that guides the AI to generate React Email TSX with Tailwind.
Streaming Response: The Gemini model streams back the generated TSX code.
Frontend Update: The Vercel AI SDK hook (useChat) updates the UI with the incoming code stream.
Live Preview: The Sandbox component (using Sandpack) receives the generated code and renders a live preview.
Code Display: The ComponentView also displays the formatted source code in a code editor view.
🤝 Contributing
Contributions are welcome! If you have suggestions, bug reports, or want to add features:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a Pull Request.
Happy Composing! ✨
