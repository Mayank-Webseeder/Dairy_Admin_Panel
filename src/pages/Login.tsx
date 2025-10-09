import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll use react-router-dom

// Import your images from the new assets folder
import Image1 from '../assets/HEADER-IMAGE 1.png';
import Image2 from '../assets/laptop-displaying-graphs-stockcake.jpg';
import Image3 from '../assets/photo-1758874383467-9aead920c794.jpg';
import WebSeederLogo from '../assets/WebSeeder Favicon 2.jpg';

// Import the CSS file
import '../styles/login.css';

const slidesData = [
  {
    image: Image1,
    title: "Welcome Back",
    subtitle: "Sign in to access your dashboard",
    features: [
      { icon: "🛡️", heading: "Secure Access", description: "Your data is protected with enterprise-grade security" },
      { icon: "📊", heading: "Real-time Analytics", description: "Monitor your performance with live data insights" }
    ]
  },
  {
    image: Image2,
    title: "Modern Interface",
    subtitle: "Experience our redesigned, intuitive platform",
    features: [
      { icon: "🎨", heading: "Intuitive Design", description: "Navigate effortlessly with a user-friendly layout" },
      { icon: "🚀", heading: "Boost Productivity", description: "Streamline your workflows and achieve more" }
    ]
  },
  {
    image: Image3,
    title: "Seamless Integration",
    subtitle: "Connect with your favorite tools effortlessly",
    features: [
      { icon: "🔗", heading: "Easy Connectivity", description: "Integrate with third-party services seamlessly" },
      { icon: "☁️", heading: "Cloud-Powered", description: "Access your data anytime, anywhere with cloud support" }
    ]
  }
];

interface LoginProps {
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (formData.email && formData.password) {
      // Simulate API call
      setTimeout(() => {
        onLogin();
        setLoading(false);
      }, 1000);
    } else {
      setError('Please enter email and password');
      setLoading(false);
    }
  };

  const currentSlide = slidesData[currentSlideIndex];

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="illustrationSection">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`slide-background ${index === currentSlideIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          ))}
          <div className="slideshow-content">
            <div className="logo">
              <h1>DairyDash</h1>
            </div>
            <div className="welcomeMessage">
              <h2 className="slide-title">{currentSlide.title}</h2>
              <p className="slide-subtitle">{currentSlide.subtitle}</p>
            </div>
            <div className="features">
              {currentSlide.features.map((feature, index) => (
                <div className="feature" key={index}>
                  <div className="featureIcon">{feature.icon}</div>
                  <div className="featureContent">
                    <h4>{feature.heading}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="formSection">
          <div className="formContent">
            <div className="header">
              <img src={WebSeederLogo} alt="WebSeeder Logo" className="login-logo" />
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue</p>
            </div>

            {error && <div className="errorMessage">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="inputGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="inputGroup">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="formOptions">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgotPassword">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="loginButton"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="signupRedirect">
              <p>
                Don't have an account?{" "}
                <button onClick={() => onNavigate('signup')} className="link">
                  Create Account
                </button>
              </p>
            </div>

            <div className="securityFooter">
              <p>Secured by DairyDash Technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};