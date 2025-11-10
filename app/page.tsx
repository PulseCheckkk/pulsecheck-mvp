import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>PulseCheck</h1>
      <p>Suivi hebdo : énergie, stress, sommeil.</p>
      <div style={{display:"flex", gap:12, marginTop:16}}>
        <Link href="/login">Se connecter</Link>
        <Link href="/me">Mon espace</Link>
      </div>
    </main>
  );
}
