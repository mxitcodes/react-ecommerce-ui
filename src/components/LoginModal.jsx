import { useState } from "react";
import { FiX, FiMail, FiLock } from "react-icons/fi";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate login
      onLogin({
        email,
        name: isLogin ? email.split('@')[0] : name,
      });
      // Reset form
      setEmail("");
      setPassword("");
      setName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="login-overlay" onClick={onClose} />
      <div className="login-modal">
        <button className="login-close" onClick={onClose}>
          <FiX size={24} />
        </button>
        
        <div className="login-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Sign in to access your account" : "Join us to get the best deals"}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="login-input-group">
              <div className="login-input-icon">👤</div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          <div className="login-input-group">
            <div className="login-input-icon"><FiMail /></div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <div className="login-input-icon"><FiLock /></div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              className="login-toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
