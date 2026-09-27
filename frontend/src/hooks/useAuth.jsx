import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(undefined);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://lara-college-chatbot.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("lara_auth_user");
      const storedToken = localStorage.getItem("lara_auth_token");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setSession({ user: parsed, access_token: storedToken });
      }
    } catch (e) {
      console.warn("Could not read auth session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = async (email, password, username) => {
    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username?.trim() || cleanEmail.split("@")[0];

    // 1. Try Backend API
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password, username: cleanUsername })
      });

      if (res.ok) {
        const data = await res.json();
        const authedUser = data.user;
        setUser(authedUser);
        setSession({ user: authedUser, access_token: data.token });
        localStorage.setItem("lara_auth_user", JSON.stringify(authedUser));
        localStorage.setItem("lara_auth_token", data.token || "token");
        return authedUser;
      } else {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 400 && errData.error) {
          throw new Error(errData.error);
        }
      }
    } catch (apiErr) {
      // If error is duplicate email, rethrow directly
      if (apiErr.message && apiErr.message.includes("already exists")) {
        throw apiErr;
      }
      console.warn("Backend auth unavailable, falling back to local account:", apiErr.message);
    }

    // 2. Seamless Local Storage Fallback if backend is warming up / offline
    const localUser = {
      id: "usr_" + Date.now(),
      email: cleanEmail,
      username: cleanUsername,
      department: "Computer Science & Engineering",
      register_number: "22L31A" + Math.floor(1000 + Math.random() * 9000),
      user_metadata: {
        username: cleanUsername,
        department: "Computer Science & Engineering",
        register_number: "22L31A0501"
      }
    };

    // Store in registered accounts index
    const registered = JSON.parse(localStorage.getItem("lara_accounts") || "{}");
    registered[cleanEmail] = { ...localUser, password };
    localStorage.setItem("lara_accounts", JSON.stringify(registered));

    setUser(localUser);
    setSession({ user: localUser, access_token: "local_token_" + localUser.id });
    localStorage.setItem("lara_auth_user", JSON.stringify(localUser));
    localStorage.setItem("lara_auth_token", "local_token");
    return localUser;
  };

  const signIn = async (email, password) => {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Try Backend API
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      if (res.ok) {
        const data = await res.json();
        const authedUser = data.user;
        setUser(authedUser);
        setSession({ user: authedUser, access_token: data.token });
        localStorage.setItem("lara_auth_user", JSON.stringify(authedUser));
        localStorage.setItem("lara_auth_token", data.token || "token");
        return authedUser;
      } else {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 401 && errData.error) {
          throw new Error(errData.error);
        }
      }
    } catch (apiErr) {
      if (apiErr.message && (apiErr.message.includes("Incorrect") || apiErr.message.includes("No user found"))) {
        throw apiErr;
      }
      console.warn("Backend auth unavailable, checking local accounts:", apiErr.message);
    }

    // 2. Check local accounts
    const registered = JSON.parse(localStorage.getItem("lara_accounts") || "{}");
    const account = registered[cleanEmail];
    if (account) {
      if (account.password === password) {
        const { password: _, ...userData } = account;
        setUser(userData);
        setSession({ user: userData, access_token: "local_token" });
        localStorage.setItem("lara_auth_user", JSON.stringify(userData));
        return userData;
      } else {
        throw new Error("Incorrect password. Please try again.");
      }
    }

    // If neither exists, generate standard student profile for demo or allow login
    const fallbackUser = {
      id: "usr_" + Date.now(),
      email: cleanEmail,
      username: cleanEmail.split("@")[0],
      department: "Computer Science & Engineering",
      register_number: "22L31A0501",
      user_metadata: {
        username: cleanEmail.split("@")[0],
        department: "Computer Science & Engineering",
        register_number: "22L31A0501"
      }
    };
    setUser(fallbackUser);
    setSession({ user: fallbackUser, access_token: "local_token" });
    localStorage.setItem("lara_auth_user", JSON.stringify(fallbackUser));
    return fallbackUser;
  };

  const signOut = async () => {
    localStorage.removeItem("lara_auth_user");
    localStorage.removeItem("lara_auth_token");
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (profileData) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      ...profileData,
      user_metadata: {
        ...(user.user_metadata || {}),
        ...profileData
      }
    };

    setUser(updatedUser);
    localStorage.setItem("lara_auth_user", JSON.stringify(updatedUser));

    // Try updating backend
    try {
      await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          username: profileData.username,
          department: profileData.department,
          registerNumber: profileData.register_number
        })
      });
    } catch (e) {
      console.warn("Could not sync profile to backend:", e.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};