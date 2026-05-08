"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<{email?: string, password?: string}>({});
  const [loginError, setLoginError] = useState("");

  // Signup State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("Member");
  const [signupErrors, setSignupErrors] = useState<{name?: string, email?: string, password?: string}>({});
  const [signupError, setSignupError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const errors: any = {};
    
    if (!loginEmail) errors.email = "Email is required";
    if (!loginPassword) errors.password = "Password is required";
    
    setLoginErrors(errors);

    if (Object.keys(errors).length > 0) return;
    
    // Simulate successful login
    // In a real app: await signIn('credentials', { email, password });
    router.push("/dashboard");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    const errors: any = {};

    if (!signupName) errors.name = "Full name is required";
    if (!signupEmail) {
      errors.email = "Email is required";
    } else if (!signupEmail.includes("@")) {
      errors.email = "Please enter a valid email format";
    }
    if (!signupPassword) {
      errors.password = "Password is required";
    } else if (signupPassword.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setSignupErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Simulate successful signup and saving role to Postgres
    // In a real app: await fetch('/api/signup', { method: 'POST', body: JSON.stringify({ name, email, password, role }) });
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen p-container-padding selection:bg-primary selection:text-on-primary bg-background">
      <div className="w-full max-w-md">
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] shadow-sm overflow-hidden">
          
          {/* Tab Switcher */}
          <div className="flex border-b border-outline-variant p-2 gap-2 bg-surface">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center text-[14px] font-medium rounded-md transition-colors ${isLogin ? 'bg-[#1A1A1A] text-white' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              Log in
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center text-[14px] font-medium rounded-md transition-colors ${!isLogin ? 'bg-[#1A1A1A] text-white' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              Sign up
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-6 gap-2">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
              <span className="font-medium text-[22px] text-on-surface">TaskFlow</span>
            </div>
            
            <div className="text-center mb-6">
              <h1 className="font-medium text-[18px] text-on-surface mb-1">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-[13px] text-on-surface-variant">
                {isLogin ? "Enter your credentials to access your workspace." : "Start managing your team's tasks today."}
              </p>
            </div>
            
            {isLogin ? (
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="login-email">
                    Email Address
                  </label>
                  <input
                    className={`w-full px-3 h-[36px] bg-surface-container-lowest border rounded-[8px] text-on-surface text-[15px] placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors ${loginErrors.email ? 'border-error' : 'border-outline-variant'}`}
                    id="login-email"
                    placeholder="name@company.com"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginErrors.email) setLoginErrors({...loginErrors, email: undefined});
                    }}
                  />
                  {loginErrors.email && (
                    <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                      <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {loginErrors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="login-password">
                      Password
                    </label>
                  </div>
                  <input
                    className={`w-full px-3 h-[36px] bg-surface-container-lowest border rounded-[8px] text-on-surface text-[15px] placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors ${loginErrors.password ? 'border-error' : 'border-outline-variant'}`}
                    id="login-password"
                    placeholder="••••••••"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginErrors.password) setLoginErrors({...loginErrors, password: undefined});
                    }}
                  />
                  {loginErrors.password && (
                    <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                      <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {loginErrors.password}
                    </p>
                  )}
                </div>

                {loginError && (
                  <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                    <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {loginError}
                  </p>
                )}
                
                <button type="submit" className="w-full mt-2 h-[36px] bg-[#1A1A1A] text-white font-medium text-[14px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#333] transition-colors">
                  Enter workspace
                </button>
                <div className="text-center mt-2">
                  <span className="text-[12px] text-on-surface-variant">Secure JWT session · Role-based access</span>
                </div>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="signup-name">
                    Full Name
                  </label>
                  <input
                    className={`w-full px-3 h-[36px] bg-surface-container-lowest border rounded-[8px] text-on-surface text-[15px] placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors ${signupErrors.name ? 'border-error' : 'border-outline-variant'}`}
                    id="signup-name"
                    type="text"
                    placeholder="Priya Sharma"
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value);
                      if (signupErrors.name) setSignupErrors({...signupErrors, name: undefined});
                    }}
                  />
                  {signupErrors.name && (
                    <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                      <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {signupErrors.name}
                    </p>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="signup-email">
                    Email Address
                  </label>
                  <input
                    className={`w-full px-3 h-[36px] bg-surface-container-lowest border rounded-[8px] text-on-surface text-[15px] placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors ${signupErrors.email ? 'border-error' : 'border-outline-variant'}`}
                    id="signup-email"
                    type="email"
                    placeholder="priya.sharma@company.com"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      if (signupErrors.email) setSignupErrors({...signupErrors, email: undefined});
                    }}
                  />
                  {signupErrors.email && (
                    <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                      <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {signupErrors.email}
                    </p>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    className={`w-full px-3 h-[36px] bg-surface-container-lowest border rounded-[8px] text-on-surface text-[15px] placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors ${signupErrors.password ? 'border-error' : 'border-outline-variant'}`}
                    id="signup-password"
                    placeholder="Create a strong password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      if (signupErrors.password) setSignupErrors({...signupErrors, password: undefined});
                    }}
                  />
                  {signupErrors.password && (
                    <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                      <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {signupErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="signup-role">
                    Role
                  </label>
                  <select
                    id="signup-role"
                    className="w-full px-3 h-[36px] bg-surface-container-lowest border border-outline-variant rounded-[8px] text-on-surface text-[15px] focus:outline-none focus:border-primary transition-colors"
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                {signupError && (
                  <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                    <i className="ti-alert-circle material-symbols-outlined text-[14px]">error</i> {signupError}
                  </p>
                )}
                
                <button type="submit" className="w-full mt-4 h-[36px] bg-[#1A1A1A] text-white font-medium text-[14px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#333] transition-colors">
                  Create Account
                </button>
                <div className="text-center mt-2">
                  <span className="text-[12px] text-on-surface-variant">Secure JWT session · Role-based access</span>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="px-3 py-1 text-[12px] text-on-surface-variant border border-outline-variant rounded-[20px] bg-transparent">JWT Sessions</span>
          <span className="px-3 py-1 text-[12px] text-on-surface-variant border border-outline-variant rounded-[20px] bg-transparent">Postgres DB</span>
          <span className="px-3 py-1 text-[12px] text-on-surface-variant border border-outline-variant rounded-[20px] bg-transparent">Role-based Access</span>
        </div>

      </div>
    </div>
  );
}
