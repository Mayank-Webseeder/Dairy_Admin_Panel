import { useState, useEffect } from 'react';
import { slideshowImages } from '../assets/images';

// Import the CSS file
import '../styles/Signup.css';

const slidesData = [
  {
    image: slideshowImages[0],
    title: "Welcome to DairyDash",
    subtitle: "Create your account and get started",
    features: [
      { icon: "🛡️", heading: "Secure Registration", description: "Your information is protected with advanced encryption" },
      { icon: "⚡", heading: "Quick Setup", description: "Get your account ready in just a few simple steps" }
    ]
  },
  {
    image: slideshowImages[1],
    title: "Unlock New Possibilities",
    subtitle: "Access powerful tools and features",
    features: [
      { icon: "📈", heading: "Data Insights", description: "Gain valuable insights from your data with ease" },
      { icon: "🤝", heading: "Collaborate Seamlessly", description: "Work with your team efficiently on shared projects" }
    ]
  },
  {
    image: slideshowImages[2],
    title: "Your Journey Starts Here",
    subtitle: "Join our community and grow with us",
    features: [
      { icon: "🌟", heading: "Personalized Experience", description: "Tailor your dashboard to fit your unique needs" },
      { icon: "🌐", heading: "Global Reach", description: "Connect with users and resources worldwide" }
    ]
  }
];

interface SignupProps {
  onSignup: () => void;
  onNavigate: (page: string) => void;
}

export function Signup({ onSignup, onNavigate }: SignupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.firstName && formData.email && formData.password) {
      // Simulate API call
      setTimeout(() => {
        onSignup();
        setLoading(false);
      }, 1000);
    } else {
      setError("Please fill out all required fields.");
      setLoading(false);
    }
  };

  const currentSlide = slidesData[currentSlideIndex];

  return (
    <div className="signup">
      <div className="signupContainer">
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
              <div className="logo-icon">
                <span>🥛</span>
              </div>
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
              <h1>Create Account</h1>
              <p>Get started with DairyDash today!</p>
            </div>

            {error && <div className="errorMessage">{error}</div>}

            <form onSubmit={handleSignup}>
              <div className="formRow">
                <div className="inputGroup">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="inputGroup">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe123"
                  required
                />
              </div>

              <div className="inputGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div className="formRow">
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
                <div className="inputGroup">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="inputGroup">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="signupButton"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="loginRedirect">
              <p>
                Already have an account?{" "}
                <button onClick={() => onNavigate('login')} className="link">
                  Login
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
}
