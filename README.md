# Logos Agency — Website

Website istituzionale editoriale per Logos Agency, con portfolio dinamico e pannello admin.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + SQLite (persistente in locale; sostituibile con Postgres)
- Upload file in `public/uploads`
- Auth admin con cookie HTTP-only (JWT via `jose`)

## Setup

```bash
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

Apri:

- Sito: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Credenziali iniziali (da `.env`):

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

**Cambia subito la password** in produzione.

## Variabili d’ambiente

| Variabile | Descrizione |
|---|---|
| `DATABASE_URL` | Default `file:./dev.db` (SQLite in `prisma/`) |
| `AUTH_SECRET` | Segreto JWT (lungo e casuale in produzione) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Primo amministratore (seed) |
| `CONTACT_EMAIL` | Email mostrata / di contatto |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico del sito |
| `NEXT_PUBLIC_WHATSAPP` | Opzionale, solo cifre con prefisso paese |

## Flusso operativo

1. Accedi a `/admin`
2. Crea **clienti** e carica i loghi reali
3. Attiva `Mostra nella fascia loghi` per la marquee
4. Crea **progetti**, carica cover/gallery, pubblica
5. Configura email, WhatsApp, social e dati legali in **Impostazioni**

I progetti in bozza non compaiono sul sito pubblico. Quelli pubblicati alimentano home, portfolio e pagine `/progetti/[slug]`.

## Note

- Non sono stati inventati loghi clienti né immagini di lavori: i 4 stub iniziali restano in **draft** finché non carichi i contenuti reali.
- Per Postgres: aggiorna `DATABASE_URL` e `provider` in `prisma/schema.prisma`, poi `npm run db:push`.
- Gli upload restano in `public/uploads` (persistenti sul filesystem del server).
