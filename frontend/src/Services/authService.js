import { createClient } from "@supabase/supabase-js";

// -------------------------
// SUPABASE CONFIG
// -------------------------
const SUPABASE_URL = "https://icnfvdmnicbmkopvbgpn.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljbmZ2ZG1uaWNibWtvcHZiZ3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTg0MDIsImV4cCI6MjA3ODQzNDQwMn0.AfgQf98y7iTYqHCVf69HfJbL3I4w7QFOvnrgQ80EEG0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// -------------------------
// SIGN UP (WITH ROLE)
// -------------------------
export async function signUpUser(email, password, role) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: role },     // store role in user_metadata
      emailRedirectTo: window.location.origin
    }
  });

  if (error) throw error;

  return data;
}



// -------------------------
// SIGN IN
// -------------------------
export async function signInUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    console.error("Login error:", error.message);
    throw error;
  }

  localStorage.setItem("sb_token", data.session.access_token);
  localStorage.setItem("studentId", data.user?.id); // optional

  return data;
}


// -------------------------
// LOGOUT
// -------------------------
export async function signOutUser() {
  await supabase.auth.signOut();
  localStorage.removeItem("sb_token");
}

// -------------------------
// GET USER ROLE
// -------------------------
export function getUserRole() {
  const token = localStorage.getItem("sb_token");
  if (!token) return "student";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    console.log("JWT Payload:", payload);

    if (payload?.user_metadata?.role) {
      return payload.user_metadata.role;
    }

    return "student";
  } catch (err) {
    console.error("Role decode failed:", err);
    return "student";
  }
}


export default supabase;
