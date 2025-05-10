# Job Application Frontend

This is a frontend web application built with TypeScript and React (using Vite) that allows job applicants to submit their personal information and upload their resumes in PDF format.

## Features

-   Input personal information (Name, Phone, Email).
-   Upload a resume in PDF format via drag-and-drop or file selection.
-   Submit the collected information to a backend API endpoint (`/api/application`).
-   Provides form validation and submission status feedback.

## Tech Stack

-   React
-   TypeScript
-   Vite (Build tool)
-   Fetch API (for network requests)

## Prerequisites

Before you begin, you'll need to have Node.js and a package manager (npm or Yarn) installed on your system.

### 1. Installing Node.js and npm

Node.js is a JavaScript runtime environment. npm (Node Package Manager) is included with Node.js and is used to manage project dependencies.

*   **Download Node.js:**
    *   Go to the official Node.js website: [https://nodejs.org/](https://nodejs.org/)
    *   Download the installer for your operating system. It is generally recommended to download the **LTS (Long-Term Support)** version for stability.
*   **Install Node.js:**
    *   Run the downloaded installer and follow the on-screen instructions. This will install both Node.js and npm.
*   **Verify Installation:**
    *   Open your terminal or command prompt and type the following commands to check if Node.js and npm are installed correctly:
        ```bash
        node -v
        npm -v
        ```
    *   You should see the version numbers printed for both.

### 2. (Optional but Recommended) Installing NVM (Node Version Manager)

NVM allows you to manage multiple active Node.js versions on the same machine. This is very useful if you work on different projects requiring different Node.js versions.

*   **For macOS and Linux:**
    *   Open your terminal and run the nvm installation script (check the [official nvm repository](https://github.com/nvm-sh/nvm) for the latest version of the command):
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        ```
    *   **Important:** After installation, you might need to close and reopen your terminal or run the command suggested by the installer to load nvm (e.g., `source ~/.bashrc`, `source ~/.zshrc`, or `source ~/.profile`, depending on your shell). If `nvm: command not found` occurs, ensure the nvm script is correctly sourced in your shell's startup file (`.bashrc`, `.zshrc`, etc.) and that you've restarted your terminal. The installer usually adds these lines automatically:
        ```bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
        ```
*   **For Windows:**
    *   Use [nvm-windows](https://github.com/coreybutler/nvm-windows). Download and run the installer from its releases page.
*   **Using NVM:**
    *   To install the latest LTS version of Node.js:
        ```bash
        nvm install --lts
        nvm use --lts
        ```
    *   To verify nvm installation:
        ```bash
        nvm --version
        ```
    *   Then verify Node.js installation:
        ```bash
        node -v
        npm -v
        ```

### 3. (Optional) Installing Yarn

Yarn is an alternative package manager to npm. If you prefer to use Yarn:

*   Install Yarn globally using npm (which you installed with Node.js):
    ```bash
    npm install --global yarn
    ```
*   Verify Yarn installation:
    ```bash
    yarn --version
    ```

## Getting Started

Follow these steps to get the application running on your local machine.

1.  **Clone the Repository (if applicable):**
    If the code is in a Git repository, clone it:
    ```bash
    git clone <repository-url>
    cd job-application-frontend 
    ```
    (Replace `<repository-url>` with the actual URL and `job-application-frontend` with the project's directory name if different).
    If you have the code as a ZIP file, extract it and navigate into the project directory.

2.  **Navigate to the Project Directory:**
    Open your terminal and change to the project's root directory:
    ```bash
    cd path/to/your/job-application-frontend
    ```

3.  **Install Dependencies:**
    You can use either npm or Yarn to install the project dependencies listed in `package.json`. Choose one:

    *   **Using npm:**
        ```bash
        npm install
        ```
    *   **Or, using Yarn:**
        ```bash
        yarn install
        ```

## Running the Development Server

Once the dependencies are installed, you can start the local development server:

*   **Using npm:**
    ```bash
    npm run dev
    ```
*   **Or, using Yarn:**
    ```bash
    yarn dev
    ```

This will typically start the application, and you should see a message in your terminal like:
`VITE vX.X.X  ready in XXXms`
`➜  Local:   http://localhost:5173/`

Open your web browser and navigate to the provided local URL (usually `http://localhost:5173`).

## Building for Production

To create an optimized build of the application for deployment:

*   **Using npm:**
    ```bash
    npm run build
    ```
*   **Or, using Yarn:**
    ```bash
    yarn build
    ```

The production-ready files will be generated in the `dist` folder. You can deploy the contents of this folder to any static file hosting service.

## Backend API

This frontend application expects a backend REST endpoint at the path `/api/application` that accepts `POST` requests. The request will contain a `FormData` object with the following fields:

-   `name` (string): Applicant's name
-   `phone` (string): Applicant's phone number
-   `email` (string): Applicant's email address
-   `resume` (File): The resume file in PDF format

Ensure your backend API gateway is configured correctly for the frontend to access this endpoint. If the frontend and backend are deployed on different domains or ports, you might need to configure CORS (Cross-Origin Resource Sharing) on your backend.

## Important Notes

-   **API Path:** The `fetch` URL in `src/services/api.ts` is set to a relative path `/api/application`. If your API is deployed on a different domain or has a specific prefix, modify this path accordingly.
-   **Node.js Version Compatibility:** While the steps above guide you to install the latest LTS, some projects might have specific Node.js version requirements defined in their `package.json` (under the `engines` field). If you encounter issues during dependency installation or runtime, ensure your Node.js version is compatible. NVM is very helpful for managing this.
-   **Styling:** Basic styling is provided in `src/index.css`. Feel free to customize it according to your branding and design requirements.

## AWS API Gateway Configuration Guide

This frontend application requires AWS API Gateway configuration to handle application submissions. Here are the setup steps:

### 1. Create API

1. Log in to AWS Console and navigate to API Gateway service
2. Click "Create API"
3. Select "REST API" (not private or HTTP API)
4. Click "Build"
5. Fill in API information:
   - API name: `JobApplicationAPI`
   - Description: (optional)
   - Endpoint Type: Regional
6. Click "Create API"

### 2. Create Resource and Method

1. Select root path (/) in the left resource tree
2. Click "Actions" dropdown menu, select "Create Resource"
3. Fill in resource information:
   - Resource Name: `applications`
   - Resource Path: `/applications`
   - Check "Enable API Gateway CORS"
4. Click "Create Resource"
5. Select the newly created `/applications` resource
6. Click "Actions", select "Create Method"
7. Select "POST" from the dropdown menu, click the checkmark
8. Configure POST method:
   - Integration type: `Lambda Function`
   - Lambda Region: Select your region
   - Lambda Function: Select your function (create one if not exists)
   - Use Lambda Proxy integration: Yes
   - Click "Save"
   - Click "OK" when prompted to give API Gateway permission to invoke your Lambda

### 3. Configure CORS

1. Select the `/applications` resource
2. Click "Actions", select "Enable CORS"
3. Configure CORS:
   - Access-Control-Allow-Methods: `POST,OPTIONS`
   - Access-Control-Allow-Headers: `Content-Type`
   - Access-Control-Allow-Origin: `*` (use specific domain for production)
4. Click "Enable CORS and replace existing CORS headers"

### 4. Deploy API

1. Click "Actions", select "Deploy API"
2. Create new deployment stage:
   - Deployment stage: `dev` (or other name)
   - Stage description: (optional)
3. Click "Deploy"

### 5. Get API URL

1. In the Stages page, select your deployment stage
2. Copy the "Invoke URL", it looks like:
   `https://xxxxxx.execute-api.region.amazonaws.com/dev`
3. Use this base URL in your frontend code:
   - Complete API endpoint will be: `{Invoke URL}/applications`
