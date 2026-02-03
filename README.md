# Retro Portfolio

A retro-themed portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) (for Guestbook)
- **Email**: [EmailJS](https://www.emailjs.com/) (for Contact Form)

## EmailJS Setup

To set up the contact form with EmailJS:

1. **Create an EmailJS account** at [EmailJS.com](https://www.emailjs.com/)
2. **Create a new service** in your EmailJS dashboard (Gmail, Outlook, etc.)
3. **Create an email template** with the following template variables:
   - `{{from_name}}` - The name of the person sending the message
   - `{{from_email}}` - The email address of the sender
   - `{{message}}` - The message content
4. **Get your credentials**:
   - `Service ID` - Found in the EmailJS dashboard under "Email Services"
   - `Template ID` - Found in your email template settings
   - `Public Key` - Found in your EmailJS account settings
5. **Update environment variables**:
   - Add these to your `.env.local` file for local development:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - Add them to Vercel environment variables when deploying

## Deployment on Vercel

### Prerequisites

- A [Vercel](https://vercel.com/) account
- A [Supabase](https://supabase.com/) project
- [EmailJS](https://www.emailjs.com/) credentials (for contact form)

### Steps to Deploy

1. **Prepare your repository**

   - Make sure your code is in a Git repository
   - Push your code to GitHub, GitLab, or Bitbucket

2. **Import your project to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your repository
   - Configure project settings

3. **Environment Variables**

   - Add the following environment variables in Vercel's project settings:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS service ID
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
     - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS public key

4. **Deploy**
   - Click "Deploy" and Vercel will build and deploy your project
   - Once deployment is complete, you can visit your site at the provided URL

### Manual Deployment

If you prefer to deploy from your local machine, you can use the Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Site URL (Required for SEO metadata, sitemap, and canonical URLs)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Supabase Configuration (Required for Guestbook functionality)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration (Required for Contact form functionality)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## License

This project is licensed under the MIT License.
