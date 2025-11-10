"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + "/me" } });
    if (error) alert(error.message);
    else setSent(true);
  }
  return (
    <main>
      <h2>Connexion par e-mail</h2>
      {sent ? <p>Vérifie tes mails.</p> : (
        <form onSubmit={sendLink} style={{display:"grid", gap:8, maxWidth:360}}>
          <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <button type="submit">Recevoir le lien</button>
        </form>
      )}
    </main>
  );
}
