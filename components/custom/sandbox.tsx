'use client';

import { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

interface SandboxProps {
  generatedCode: string;
}

export default function Sandbox({ generatedCode = '' }: SandboxProps) {
  const [sandpackFiles, setSandpackFiles] = useState<
    Record<string, { code: string; active?: boolean }>
  >({ ...initialSandpackFilesBase });

  useEffect(() => {
    if (generatedCode) {
      setSandpackFiles((prevFiles) => ({
        ...prevFiles,
        '/Component.tsx': {
          code: generatedCode,
          active: true,
        },
      }));
    }
  }, [generatedCode]);

  const height = 'h-[calc(100vh-(16rem+4px))]';

  return (
    <SandpackProvider
      template='react-ts'
      theme={'dark'}
      files={sandpackFiles}
      options={{
        autorun: true,
        autoReload: true,
        externalResources: ['https://cdn.tailwindcss.com'],
        visibleFiles: ['/Component.tsx'],
        classes: {
          'sp-wrapper': `${height} w-full border-none`,
          'sp-layout': `${height} flex flex-col bg-transparent dark:bg-transparent  border-none`,
          'sp-preview': `${height} flex-1 border-none outline-none`,
        },
      }}
      customSetup={{
        dependencies,
        devDependencies,
      }}
    >
      <SandpackLayout style={{ border: 'none' }}>
        <SandpackPreview
          showRefreshButton
          showOpenInCodeSandbox={false}
          style={{ border: 'none' }}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export const initialSandpackFilesBase = {
  '/index.tsx': {
    active: false,
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css"; // Import Tailwind styles + CSS Vars

import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  '/App.tsx': {
    active: false,
    code: `import React from 'react';
import Component from './Component'; // Import the dynamically generated component

export default function App() {
  // Apply theme class based on SandpackProvider's theme or parent context
  const theme = 'dark'; // or 'dark', or get dynamically

  return (
    <div className={\`p-4 \${theme}\`}> {/* Ensure theme class is applied */}
      <Component />
    </div>
  );
}`,
  },
  '/Component.tsx': {
    // Use the placeholder code here in the base constant
    code: `// No code generated yet
import React from 'react';

const PlaceholderComponent = () => {
  return (
    <div>
    </div>
  );
};

export default PlaceholderComponent;`,
    active: true,
  },
  '/styles.css': {
    active: false,
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}`,
  },

  '/tailwind.config.js': {
    active: false,
    code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./*.{ts,tsx}", "./**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`,
  },
  '/postcss.config.js': {
    active: false,
    code: `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  },
  '/tsconfig.json': {
    active: false,
    code: `{
  "include": [
    "./**/*"
  ],
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
    '/components.json': {
      active: false,
      code: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
`,
    },
  },
};

const dependencies = {
  '@react-email/components': '0.0.36',
  motion: '^12.7.4',
  react: '^19.1.0',
  'react-dom': '^19.1.0',
  'tailwind-merge': '^3.2.0',
  'tw-animate-css': '^1.2.5',
  'class-variance-authority': '^0.7.1',
  clsx: '^2.1.1',
  cmdk: '^1.1.1',
};

const devDependencies = {
  '@eslint/eslintrc': '^3',
  '@tailwindcss/postcss': '^4',
  '@types/node': '^20',
  '@types/react': '^19',
  '@types/react-dom': '^19',
  eslint: '^9',
  'eslint-config-next': '15.3.0',
  'react-email': '4.0.7',
  tailwindcss: '^4',
  typescript: '^5',
};
