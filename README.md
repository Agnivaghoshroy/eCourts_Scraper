
  # eCourts Scraper Script

  This is a code bundle for eCourts Scraper Script. The original project is available at https://www.figma.com/design/qQ0brPeP22anHo6eY3OCND/eCourts-Scraper-Script.

  ## Running the code

    # eCourts Scraper Script

    This is a React + Vite UI for the eCourts Scraper Script.

    The original project design is available at:
    https://www.figma.com/design/qQ0brPeP22anHo6eY3OCND/eCourts-Scraper-Script

    ## Prerequisites

    - Node.js (recommended v18 or later). Check with:
      ```powershell
      node -v
      ```
    - npm (comes with Node.js). Check with:
      ```powershell
      npm -v
      ```

    ## Quick start (development)

    1. Open PowerShell and change into the project folder:
       ```powershell
       cd D:\\Internship
       ```
    2. Install dependencies:
       ```powershell
       npm install
       ```
    3. Start the dev server (Vite):
       ```powershell
       npm run dev
       ```
    4. Open the app in your browser:
       - Visit: http://localhost:3000/

    The dev server is configured in `vite.config.ts` (default port 3000). Vite will automatically reload the page when you edit source files.

    ## Build for production

    Create an optimized production build:
    ```powershell
    npm run build
    ```

    The output will be placed in the `build/` directory (see `vite.config.ts`). Serve the `build/` folder with any static server for production testing.

    ## Project structure (important files)

    - `index.html` — HTML entry that loads `/src/main.tsx` and mounts the React app into `<div id="root">`.
    - `src/main.tsx` — React entry point.
    - `src/App.tsx` — main application component.
    - `vite.config.ts` — Vite configuration (dev server port, build output, aliases).
    - `package.json` — npm scripts and dependencies.

    ## Troubleshooting

    - If `npm install` fails or you see strange errors:
      - Remove `node_modules` and `package-lock.json`, then run `npm install` again:
        ```powershell
        Remove-Item -Recurse -Force node_modules; Remove-Item package-lock.json; npm install
        ```
        (On PowerShell the `Remove-Item` command removes files/folders.)
    - If the dev server won't start or exits with an error:
      - Confirm your Node.js version (v18+ recommended).
      - Read the terminal output for the error. Common fixes include reinstalling dependencies or updating incompatible packages.
    - If the browser shows a blank page:
      - Open DevTools (F12) and check the console for runtime errors.
      - Ensure `#root` exists in `index.html` and that `src/main.tsx` imports and mounts `App`.

    ## Useful commands

    - Install dependencies: `npm install`
    - Start dev server: `npm run dev`
    - Build production bundle: `npm run build`

    ## Notes

    - Vite shows `Local: http://localhost:3000/` when it starts. If you need the dev server to be accessible from other devices on your network, start it with `npm run dev -- --host` or modify `vite.config.ts`.
    - This README focuses on local development on Windows using PowerShell. For other shells (bash, zsh, etc.) commands are the same except for Windows-specific `Remove-Item` usage.