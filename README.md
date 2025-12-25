# Care.xyz 🏥

A modern, full-stack care services booking platform built with Next.js, MongoDB, and Stripe. Connect families with professional caregivers for baby care, elderly care, and sick people care services.

## ✨ Features

### 🏠 **For Customers**
- **Easy Booking**: Simple, intuitive booking process for all care services
- **Multiple Services**: Baby care, elderly care, and sick people care
- **Secure Payments**: Integrated Stripe payment processing
- **Real-time Updates**: Live booking status tracking
- **Email Notifications**: Automatic confirmation emails after booking
- **User Dashboard**: Manage all bookings in one place

### 👨‍💼 **For Administrators**
- **Admin Dashboard**: Comprehensive booking management
- **Real-time Monitoring**: Live updates of all bookings
- **User Management**: View customer information and booking history
- **Status Tracking**: Monitor booking statuses (pending, paid, completed)

### 🔐 **Authentication & Security**
- **Google OAuth**: One-click login with Google
- **Email/Password**: Traditional authentication
- **Session Management**: Secure JWT-based sessions
- **Protected Routes**: Role-based access control

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hot Toast** - User notifications
- **Swiper** - Image carousels

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication framework

### **Payments & Communication**
- **Stripe** - Payment processing
- **Nodemailer** - Email services
- **Gmail SMTP** - Email delivery

### **Deployment**
- **Netlify** - Hosting and deployment
- **Environment Variables** - Secure configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9.0 or higher
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials
- Stripe account
- Gmail account for email services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/care-xyz.git
   cd care-xyz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/care-xyz

   # Authentication
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Stripe Payments
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key

   # Email Service
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
care-xyz/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── bookings/      # Booking CRUD operations
│   │   │   ├── stripe/        # Payment processing
│   │   │   └── admin/         # Admin-only endpoints
│   │   ├── booking/           # Booking pages
│   │   │   ├── baby-care/     # Baby care booking
│   │   │   ├── elderly-care/  # Elderly care booking
│   │   │   └── sick-people-care/ # Sick care booking
│   │   ├── auth/              # Authentication pages
│   │   └── my-bookings/       # User bookings dashboard
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility functions
│   │   ├── db.ts              # Database connection
│   │   ├── email.ts           # Email utilities
│   │   └── models/            # MongoDB schemas
│   └── middleware.ts          # Next.js middleware
├── public/                    # Static assets
├── netlify.toml              # Netlify configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXTAUTH_SECRET` | JWT secret for sessions | ✅ |
| `NEXTAUTH_URL` | Base URL for the app | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `EMAIL_USER` | Gmail address for notifications | ✅ |
| `EMAIL_PASSWORD` | Gmail app password | ✅ |

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. For production: Add your Netlify URL + `/api/auth/callback/google`

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your secret key from the dashboard
3. For production, set up webhooks for payment confirmations

### Email Setup

1. Use a Gmail account
2. Enable 2-factor authentication
3. Generate an App Password (not regular password)
4. Use the App Password in `EMAIL_PASSWORD`

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20.9.0`

3. **Set Environment Variables**
   - Add all environment variables from your `.env.local`
   - Update `NEXTAUTH_URL` to your Netlify site URL

4. **Deploy**
   - Netlify will automatically build and deploy
   - Your site will be live at `https://your-site-name.netlify.app`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth.js handler
- `POST /api/auth/register` - User registration

### Bookings
- `GET /api/bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Payments
- `POST /api/stripe` - Create Stripe checkout session

### Admin
- `GET /api/admin/bookings` - Get all bookings (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-username/care-xyz/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Stripe](https://stripe.com) - Payment processing
- [MongoDB](https://mongodb.com) - Database
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Netlify](https://netlify.com) - Hosting platform
