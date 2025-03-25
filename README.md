
# URL Quick Snap - URL Shortener

URL Quick Snap is a simple, easy-to-use URL shortener that allows you to create shorter, custom links that redirect to your original URLs.

## Features

- Shorten any URL with a randomly generated 5-character code
- Create custom short links with personalized names
- Track click statistics for your shortened URLs
- Automatic expiration after 3 days
- Responsive design for desktop and mobile use

## Live Demo

You can access the live demo at: [https://3523cb40-7828-44eb-88a6-1f79952eb48e.lovableproject.com](https://3523cb40-7828-44eb-88a6-1f79952eb48e.lovableproject.com)

## How to Use

1. **Shorten a URL**:
   - Enter any long URL in the input field
   - Optionally, add a custom name for your short link
   - Click "Shorten URL"
   - Copy the generated short URL to share with others

2. **Using Custom Names**:
   - When shortening a URL, enter a custom name in the "Custom Name (optional)" field
   - Custom names can contain letters, numbers, and hyphens
   - Spaces will be converted to hyphens
   - Maximum length is 20 characters

3. **Viewing Statistics**:
   - Click on "View Stats" on any shortened URL card
   - Or navigate to the /stats page to see all your URLs and their click counts

## Running Locally

To run URL Quick Snap on your local machine:

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. Clone the repository:
   ```sh
   git clone <YOUR_REPOSITORY_URL>
   cd url-quick-snap
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Building for Production

1. Create a production build:
   ```sh
   npm run build
   # or
   yarn build
   ```

2. Preview the production build locally:
   ```sh
   npm run preview
   # or
   yarn preview
   ```

3. The built files will be in the `dist` directory, which you can deploy to any static hosting service.

## Technical Implementation

- This application is built with React, TypeScript, and Vite
- Uses localStorage for data persistence (in a production environment, you would use a database)
- Styled with Tailwind CSS and shadcn/ui components
- URL data expires after 3 days
- All shortening and redirection happens on the client-side

## License

This project is open source and available under the MIT License.
