"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Signup State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }
    
    // Simulate successful login
    router.push("/dashboard");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError("Please fill out all fields.");
      return;
    }

    if (!signupEmail.includes("@")) {
      setSignupError("Please enter a valid email format.");
      return;
    }

    if (signupPassword.length < 8) {
      setSignupError("Password must be at least 8 characters long.");
      return;
    }

    // Simulate successful signup
    router.push("/dashboard");
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen p-container-padding selection:bg-primary-fixed selection:text-on-primary-fixed bg-background">
      <div className="w-full max-w-md">
        
        {isLogin ? (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05),_0_1px_2px_0_rgba(0,0,0,0.03)] p-8">
            <div className="flex items-center justify-center mb-8 gap-2">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}
              >
                task_alt
              </span>
              <span className="font-h2 text-h2 text-on-surface">TaskFlow</span>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="font-h1 text-h1 text-on-surface mb-2">Welcome back</h1>
              <p className="font-body-base text-body-base text-on-surface-variant">
                Log in to your account to continue.
              </p>
            </div>
            
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div className="space-y-1.5">
                <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="login-email">
                  Email Address
                </label>
                <input
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-base text-body-base placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  id="login-email"
                  placeholder="name@company.com"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="login-password">
                    Password
                  </label>
                  <button type="button" className="font-body-sm text-body-sm text-primary hover:text-surface-tint hover:underline transition-colors">
                    Forgot password?
                  </button>
                </div>
                <input
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-base text-body-base placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  id="login-password"
                  placeholder="••••••••"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              {loginError && (
                <p className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>error</span>
                  {loginError}
                </p>
              )}
              
              <button type="submit" className="w-full mt-2 py-2.5 bg-primary text-on-primary font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-surface-tint active:scale-[0.98] transition-all">
                  Log in
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary font-h3 text-body-sm hover:underline hover:text-surface-tint transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05),_0_1px_2px_0_rgba(0,0,0,0.03)] p-8">
            <div className="flex items-center justify-center mb-8 gap-2">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}
              >
                group_add
              </span>
              <span className="font-h2 text-h2 text-on-surface">TaskFlow</span>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="font-h1 text-h1 text-on-surface mb-2">Create an account</h1>
              <p className="font-body-base text-body-base text-on-surface-variant">
                Start managing your team's tasks today.
              </p>
            </div>
            
            <form className="space-y-5" onSubmit={handleSignupSubmit}>
              <div className="space-y-1.5">
                <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="signup-name">
                  Full Name
                </label>
                <input
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-base text-body-base placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  id="signup-name"
                  type="text"
                  placeholder="Priya Sharma"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              
              <div className="space-y-1.5 relative">
                <label className={`block font-label-caps text-label-caps ${signupError && !signupEmail.includes("@") ? "text-error" : "text-on-surface-variant"}`} htmlFor="signup-email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-3 py-2 bg-surface-container-lowest border rounded text-on-surface font-body-base text-body-base focus:outline-none transition-shadow ${
                      signupError && !signupEmail.includes("@") 
                        ? "pr-10 bg-error-container/10 border-error focus:border-error focus:ring-1 focus:ring-error" 
                        : "border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline"
                    }`}
                    id="signup-email"
                    type="email"
                    placeholder="priya.sharma@company.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  {signupError && !signupEmail.includes("@") && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1", fontSize: "18px" }}>
                        error
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="signup-password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-base text-body-base placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  id="signup-password"
                  placeholder="Create a strong password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Must be at least 8 characters long.
                </p>
              </div>

              {signupError && (
                <p className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>error</span>
                  {signupError}
                </p>
              )}
              
              <button type="submit" className="w-full mt-4 py-2.5 bg-primary text-on-primary font-label-caps text-label-caps rounded flex items-center justify-center gap-2 hover:bg-surface-tint active:scale-[0.98] transition-all">
                  Create Account
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary font-h3 text-body-sm hover:underline hover:text-surface-tint transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
