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

  // Signup State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("Member");
  const [signupErrors, setSignupErrors] = useState<{name?: string, email?: string, password?: string}>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};
    if (!loginEmail) errors.email = "Email is required";
    if (!loginPassword) errors.password = "Password is required";
    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;
    router.push("/dashboard");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    router.push("/dashboard");
  };

  return (
    <div className="theme-auth min-h-screen flex flex-col md:flex-row bg-white font-body-base text-text-primary selection:bg-primary selection:text-white">
      {/* Left Side: Marketing / Hero */}
      <div 
        className="hidden md:flex md:w-1/2 p-12 flex-col justify-between rounded-r-3xl my-4 ml-4"
        style={{ background: 'linear-gradient(135deg, #FDF8F5 0%, #EBD4C9 100%)' }}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#C66B3D] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>landscape</span>
          <span className="font-h1 text-[24px] font-bold text-[#C66B3D]">Sahara</span>
        </div>
        
        <div className="max-w-md">
          <h1 className="font-h1 text-[48px] md:text-[64px] font-bold text-[#1A1513] mb-6 leading-[1.1]">
            Sun-Baked<br/>Simplicity.
          </h1>
          <p className="text-[18px] text-[#6B625E] leading-relaxed">
            Experience a new era of team management. Luxurious warmth meets disciplined minimalism in every interaction.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img alt="User 1" className="w-10 h-10 rounded-full border-2 border-[#EBD4C9] object-cover" src="https://ui-avatars.com/api/?name=V+S&background=181412&color=fff" />
            <img alt="User 2" className="w-10 h-10 rounded-full border-2 border-[#EBD4C9] object-cover" src="https://ui-avatars.com/api/?name=A+G&background=3E3733&color=fff" />
            <div className="w-10 h-10 rounded-full border-2 border-[#EBD4C9] bg-[#D97746] flex items-center justify-center text-[12px] font-medium text-white">
              +12
            </div>
          </div>
          <span className="text-[14px] text-[#6B625E] font-medium">Join premium teams worldwide</span>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="font-h1 text-[36px] font-bold text-[#1A1513] mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-[15px] text-[#6B625E]">
              {isLogin ? "Sign in to manage your team." : "Start managing your team's tasks today."}
            </p>
          </div>
            
          {isLogin ? (
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#1A1513]" htmlFor="login-email">
                  Work Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9A908A] text-[20px]">mail</span>
                  <input
                    className={`w-full pl-10 pr-3 h-[44px] bg-[#F9F6F4] border rounded-[8px] text-[#1A1513] text-[15px] placeholder:text-[#9A908A] focus:outline-none focus:border-[#C66B3D] focus:bg-white transition-colors ${loginErrors.email ? 'border-error' : 'border-[#E5DCD6]'}`}
                    id="login-email"
                    placeholder="jane@company.com"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginErrors.email) setLoginErrors({...loginErrors, email: undefined});
                    }}
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">error</span> {loginErrors.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#1A1513]" htmlFor="login-password">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9A908A] text-[20px]">lock</span>
                  <input
                    className={`w-full pl-10 pr-3 h-[44px] bg-[#F9F6F4] border rounded-[8px] text-[#1A1513] text-[15px] placeholder:text-[#9A908A] focus:outline-none focus:border-[#C66B3D] focus:bg-white transition-colors ${loginErrors.password ? 'border-error' : 'border-[#E5DCD6]'}`}
                    id="login-password"
                    placeholder="••••••••"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginErrors.password) setLoginErrors({...loginErrors, password: undefined});
                    }}
                  />
                </div>
                {loginErrors.password && (
                  <p className="text-[12px] text-error flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">error</span> {loginErrors.password}
                  </p>
                )}
              </div>
              
              <button type="submit" className="w-full mt-6 h-[44px] bg-[#C66B3D] text-white font-medium text-[15px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#B35F35] transition-colors shadow-sm">
                Sign In
              </button>

              <div className="text-center mt-6">
                <p className="text-[14px] text-[#6B625E]">
                  Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="text-[#C66B3D] font-medium hover:underline">Create one</button>
                </p>
              </div>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleSignupSubmit}>
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#1A1513]" htmlFor="signup-name">
                  Full Name
                </label>
                <input
                  className={`w-full px-3 h-[44px] bg-[#F9F6F4] border rounded-[8px] text-[#1A1513] text-[15px] placeholder:text-[#9A908A] focus:outline-none focus:border-[#C66B3D] focus:bg-white transition-colors ${signupErrors.name ? 'border-error' : 'border-[#E5DCD6]'}`}
                  id="signup-name"
                  type="text"
                  placeholder="Jane Doe"
                  value={signupName}
                  onChange={(e) => {
                    setSignupName(e.target.value);
                    if (signupErrors.name) setSignupErrors({...signupErrors, name: undefined});
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#1A1513]" htmlFor="signup-email">
                  Work Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9A908A] text-[20px]">mail</span>
                  <input
                    className={`w-full pl-10 pr-3 h-[44px] bg-[#F9F6F4] border rounded-[8px] text-[#1A1513] text-[15px] placeholder:text-[#9A908A] focus:outline-none focus:border-[#C66B3D] focus:bg-white transition-colors ${signupErrors.email ? 'border-error' : 'border-[#E5DCD6]'}`}
                    id="signup-email"
                    type="email"
                    placeholder="jane@company.com"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                      if (signupErrors.email) setSignupErrors({...signupErrors, email: undefined});
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#1A1513]" htmlFor="signup-password">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9A908A] text-[20px]">lock</span>
                  <input
                    className={`w-full pl-10 pr-3 h-[44px] bg-[#F9F6F4] border rounded-[8px] text-[#1A1513] text-[15px] placeholder:text-[#9A908A] focus:outline-none focus:border-[#C66B3D] focus:bg-white transition-colors ${signupErrors.password ? 'border-error' : 'border-[#E5DCD6]'}`}
                    id="signup-password"
                    placeholder="••••••••"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                      if (signupErrors.password) setSignupErrors({...signupErrors, password: undefined});
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#1A1513]" htmlFor="signup-role">
                  Role
                </label>
                <select
                  id="signup-role"
                  className="w-full px-3 h-[44px] bg-[#F9F6F4] border border-[#E5DCD6] rounded-[8px] text-[#1A1513] text-[15px] focus:outline-none focus:border-[#C66B3D] focus:bg-white transition-colors"
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>
              </div>
              
              <button type="submit" className="w-full mt-6 h-[44px] bg-[#C66B3D] text-white font-medium text-[15px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#B35F35] transition-colors shadow-sm">
                Create Account
              </button>

              <div className="text-center mt-6">
                <p className="text-[14px] text-[#6B625E]">
                  Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-[#C66B3D] font-medium hover:underline">Sign in</button>
                </p>
              </div>
            </form>
          )}

          <div className="mt-12 text-center text-[12px] text-[#9A908A]">
            By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <br/><a href="#" className="underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
