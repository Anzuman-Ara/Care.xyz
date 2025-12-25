import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <Link href="/" className="flex items-center space-x-2">
          <div className="bg-accent rounded-lg flex items-center justify-center px-2 py-1">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-primary">Care.xyz</span>
          </div>
          </Link>
          <p className="footer-text">
            Your trusted partner for professional caregiving services. We connect families with qualified caretakers for babies, elderly, and medical care.
          </p>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Services</h3>
          <Link href="/service/baby-care" className="footer-link">Baby Care</Link>
          <Link href="/service/elderly-care" className="footer-link">Elderly Care</Link>
          <Link href="/service/sick-people-care" className="footer-link">Sick People Care</Link>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/auth/login" className="footer-link">Login</Link>
          <Link href="/auth/register" className="footer-link">Register</Link>
          <Link href="/admin" className="footer-link">Admin</Link>
        </div>

        {/* Contact & Social */}
        <div className="footer-section">
          <h3 className="footer-heading">Connect With Us</h3>
          <p className="footer-text">
            Email: support@care.xyz
          </p>
          <p className="footer-text">
            Phone: +1 (555) 123-4567
          </p>

          <div className="footer-social">
            <a href="https://www.facebook.com/carebangladesh.xyz/" className="social-icon" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://x.com/CAREGlobal" className="social-icon" aria-label="X (formerly Twitter)">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/xyz-care/" className="social-icon" aria-label="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/sheba.xyz.official/?hl=en" className="social-icon" aria-label="Instagram">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C8.396 0 7.609.034 6.298.154 4.987.274 4.014.598 3.223.99c-.791.392-1.46.96-2.051 1.551-.591.591-1.159 1.26-1.551 2.051-.392.791-.716 1.764-.836 3.075C.034 7.391 0 8.178 0 11.799s.034 4.408.154 5.719c.12 1.311.444 2.284.836 3.075.392.791.96 1.46 1.551 2.051.591.591 1.26 1.159 2.051 1.551.791.392 1.764.716 3.075.836 1.311.12 2.098.154 5.719.154s4.408-.034 5.719-.154c1.311-.12 2.284-.444 3.075-.836.791-.392 1.46-.96 2.051-1.551.591-.591 1.159-1.26 1.551-2.051.392-.791.716-1.764.836-3.075.12-1.311.154-2.098.154-5.719s-.034-4.408-.154-5.719c-.12-1.311-.444-2.284-.836-3.075-.392-.791-.96-1.46-1.551-2.051-.591-.591-1.26-1.159-2.051-1.551-.791-.392-1.764-.716-3.075-.836C16.425.034 15.638 0 12.017 0zm0 2.163c3.574 0 3.997.014 5.409.078 1.412.064 2.19.29 2.709.486.582.218 1.002.478 1.44.916.438.438.698.858.916 1.44.196.519.422 1.297.486 2.709.064 1.412.078 1.835.078 5.409s-.014 3.997-.078 5.409c-.064 1.412-.29 2.19-.486 2.709-.218.582-.478 1.002-.916 1.44-.438.438-.858.698-1.44.916-.519.196-1.297.422-2.709.486-1.412.064-1.835.078-5.409.078s-3.997-.014-5.409-.078c-1.412-.064-2.19-.29-2.709-.486-.582-.218-1.002-.478-1.44-.916-.438-.438-.698-.858-.916-1.44-.196-.519-.422-1.297-.486-2.709C2.03 15.414 2.016 14.991 2.016 11.417s.014-3.997.078-5.409c.064-1.412.29-2.19.486-2.709.218-.582.478-1.002.916-1.44.438-.438.858-.698 1.44-.916.519-.196 1.297-.422 2.709-.486 1.412-.064 1.835-.078 5.409-.078zm0 3.789a6.228 6.228 0 100 12.456 6.228 6.228 0 000-12.456zm0 2.163c-3.407 0-6.065 2.658-6.065 6.065s2.658 6.065 6.065 6.065 6.065-2.658 6.065-6.065-2.658-6.065-6.065-6.065zm7.866-2.163a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Care.xyz. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}