"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
type Row = { id:string; week_start:string; score_energy:number|null; score_stress:number|null; score_sleep:number|null; notes:string|null; created_at:string; };
export default function Me() {
  const [userId, setUserId] = useState<string|null>(null);
  const [weekStart, setWeekStart] = useState<string>(() => {
    const d = new Date();
    const day = d.getUTCDay();
    const diff = (day + 6) % 7;
    d.setUTCDate(d.getUTCDate() - diff);
    return d.toISOString().slice(0,10);
  });
  const [energy, setEnergy] = useState(5), [stress, setStress] = useState(5), [sleep, setSleep] = useState(5);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<Row[]>([]);
  useEffect(()=>{ supabase.auth.getUser().then(({data})=>setUserId(data.user?.id ?? null)); },[]);
  useEffect(()=>{ if(!userId) return; supabase.from("weekly_responses").select("*").eq("user_id", userId).order("week_start",{ascending:false}).limit(12)
    .then(({data})=>setItems((data as Row[]) ?? [])); },[userId]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if(!userId){ alert("Connecte-toi via /login"); return; }
    const { error } = await supabase.from("weekly_responses").insert({ user_id: userId, week_start: weekStart, score_energy: energy, score_stress: stress, score_sleep: sleep, notes });
    if (error) alert(error.message);
    else {
      setNotes("");
      const { data } = await supabase.from("weekly_responses").select("*").eq("user_id", userId).order("week_start",{ascending:false}).limit(12);
      setItems((data as Row[]) ?? []);
      alert("Réponse enregistrée ✅");
    }
  }
  return (
    <main>
      <h2>Mon suivi hebdo</h2>
      {!userId && <p>Non connecté. Va sur <a href="/login">/login</a>.</p>}
      <form onSubmit={submit} style={{display:"grid", gap:8, maxWidth:420}}>
        <label>Semaine (lundi) : <input type="date" value={weekStart} onChange={e=>setWeekStart(e.target.value)} required/></label>
        <label>Énergie : <input type="range" min={0} max={10} value={energy} onChange={e=>setEnergy(+e.target.value)}/> {energy}</label>
        <label>Stress : <input type="range" min={0} max={10} value={stress} onChange={e=>setStress(+e.target.value)}/> {stress}</label>
        <label>Sommeil : <input type="range" min={0} max={10} value={sleep} onChange={e=>setSleep(+e.target.value)}/> {sleep}</label>
        <label>Notes : <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}/></label>
        <button type="submit" disabled={!userId}>Enregistrer</button>
      </form>
      <h3 style={{marginTop:24}}>Mes 12 dernières semaines</h3>
      <ul>{items.map(r=> (<li key={r.id}>{r.week_start} — É:{r.score_energy ?? "-"} / S:{r.score_stress ?? "-"} / D:{r.score_sleep ?? "-"}</li>))}</ul>
    </main>
  );
}
