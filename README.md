# PulseCheck MVP

Cette application Next.js 14 permet un suivi hebdomadaire de lénergie, du stress et du sommeil via Supabase.

## Installation locale

Clonez le dépôt puis installez les dépendances :

```bash
npm install
npm run dev
```

## Variables d'environnement

Configurez les variables d'environnement dans Vercel ou dans un fichier `.env.local` :

- `NEXT_PUBLIC_SUPABASE_URL` : l'URL de votre projet Supabase.  
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : la clé anonyme de Supabase.  
- `NEXT_PUBLIC_SITE_URL` : l'URL publique du site (par exemple : https://pulsecheck-mvp.vercel.app).

## Modifier les questions

Pour modifier ou ajouter des questions (par exemple les notes, lénergie, le stress ou le sommeil), éditez le fichier `app/me/page.tsx`. Les contrôles (sliders et textarea) sont définis dans ce fichier. Si vous ajoutez des champs, pensez à mettre à jour le schéma Supabase en conséquence.
