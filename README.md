# Sunset Ride — Site web (Next.js 15 + TinaCMS)

Refonte du site de **Sunset Ride**, location de voitures de collection sur la
Côte d'Azur et au Pays Basque (mariages, événements, shootings, rallyes).

- **Stack :** Next.js 15 (App Router) · React 18 · TypeScript · Tailwind v4 · TinaCMS.
- **Direction artistique :** « Luxe / Classique » — Bodoni Moda (titres),
  EB Garamond (corps), Jost (eyebrow/nav), palette crème + encre + accent
  « sunset » (corail/or), grille éditoriale, photos plein cadre.
- **CMS :** TinaCMS, dépôt unique Git-backed. Le contenu vit dans `content/`
  (Markdown/JSON), les images dans `public/uploads`. Édition visuelle sur `/admin`.

---

## Démarrage rapide (local)

```bash
cp .env.example .env          # (laisser vide pour le mode local hors-ligne)
npm install
npm run dev                   # → http://localhost:3000  +  /admin
```

`npm run dev` lance le serveur GraphQL local de Tina **et** Next.js. Ouvrez
`http://localhost:3000/admin` pour l'édition visuelle (click-to-edit + aperçu
temps réel).

> En mode local, aucune connexion à TinaCloud n'est requise : le contenu est lu
> directement depuis `content/`.

---

## Scripts

| Script                | Rôle                                                            |
|-----------------------|-----------------------------------------------------------------|
| `npm run dev`         | Dev Tina + Next (édition `/admin`, aperçu temps réel).          |
| `npm run build`       | **Build de production** : `tinacms build && next build`.        |
| `npm run start`       | Build puis démarre le serveur de production.                    |
| `npm run build-local` | Build de prod hors-ligne (serveur Tina local, sans TinaCloud).  |
| `npm run start-local` | `next start` seul (sert un build déjà généré).                  |
| `npm run lint`        | Lint Biome.                                                     |

---

## Modèle de contenu

**Collection `page`** (`content/pages/*.mdx`) — chaque page est composée en
empilant des **sections** (blocs) :

| Bloc          | `_template`     | Usage                                            |
|---------------|-----------------|--------------------------------------------------|
| Hero          | `hero`          | Bannière plein écran (image **ou vidéo** + titre + 2 boutons) |
| Prestations   | `services`      | Liste éditoriale alternée (image + texte)        |
| Collection    | `collection`    | Grille de voitures (photo + année + nom + texte) |
| Histoire      | `story`         | À propos : texte + portrait + 3 points numérotés |
| Galerie       | `gallery`       | Mosaïque photos                                  |
| Témoignages   | `testimonials`  | Citations clients                                |
| FAQ           | `faq`           | Accordéon questions / réponses (accessible)      |
| Instagram     | `instagram`     | Galerie sociale + lien profil                    |
| CTA           | `cta`           | Appel à l'action (fond image ou encre)           |
| Contact       | `contact`       | Coordonnées + formulaire (mailto)                |

### Pages

- **Accueil** : `content/pages/home.mdx` → `/`
- **Prestations dédiées** : `content/pages/prestations/*.mdx` →
  `/prestations/mariages`, `/prestations/conduite-libre`,
  `/prestations/rallyes`, `/prestations/photo-video`.
  (La route catch-all `app/[...urlSegments]` mappe automatiquement tout
  fichier `content/pages/**.mdx` sur son URL.)

### Vidéo de fond du Hero

Le bloc Hero accepte un champ **« Vidéo de fond »** : le chemin d'un `.mp4`
dans `public/uploads` (ex. `/uploads/hero-speed-cote-dazur.mp4`). La vidéo est
muette, en boucle, et l'image reste l'aperçu (poster) + repli pour le LCP.

### Bilingue (EN / FR)

Le site est **bilingue**, **anglais par défaut**. `/` redirige vers `/en`.

- **Routes** : `app/[lang]/…` (`lang` = `en` | `fr`).
- **Contenu par langue** : `content/pages/en/…` et `content/pages/fr/…` ;
  réglages globaux `content/global/en.json` et `content/global/fr.json`.
- **Sélecteur de langue** dans l'en-tête (bascule EN/FR en gardant la page
  courante).
- **Liens & libellés** : les liens internes sont préfixés par la langue
  automatiquement (`lib/i18n.ts` → `localizeHref`) ; les libellés d'interface
  (formulaire, pied de page…) viennent du dictionnaire `tr()` dans `lib/i18n.ts`.
- **Ajouter une langue** : ajouter le code dans `LOCALES` (`lib/i18n.ts`) et
  `LANGS` (`app/[lang]/page.tsx`), créer `content/pages/<lang>/…` +
  `content/global/<lang>.json`, et une entrée dans le dictionnaire `tr()`.
- Les slugs de pages sont communs aux deux langues (`prestations/…`).

**Globaux** (`content/global/index.json`, doc unique) : `header` (logo, nom,
navigation, bouton), `footer` (accroche, réseaux sociaux, mention légale),
`settings` (e-mail, téléphone, zones).

Chaque bloc a (a) un **template Tina typé** (`tina/collection/page.ts`) et
(b) son **composant React** dans `components/blocks/`.
`components/blocks/index.tsx` (`RenderBlocks`) aiguille sur `block.__typename`.

### Règles d'édition (garde-fous client)

- Libellés et aides **en français** sur chaque champ.
- Champs **requis**, **valeurs par défaut** et **validation** : impossible de
  casser la mise en page.
- **`alt` obligatoire** sur chaque image (accessibilité + SEO).
- Variantes uniquement via des listes d'options (fond de section, style de
  bouton) — **pas de HTML/CSS libre**.
- `data-tina-field` sur chaque élément éditable → **click-to-edit**.

### Images / médias

Médias **dans le dépôt** (`media.tina` → `public/uploads`), versionnés avec le
contenu. Pas de service externe. Limites Tina : pas de renommage via le Media
Manager, 100 Mio/fichier.

---

## Données (App Router)

Le pattern suivi partout :

1. **Server Component** (`app/page.tsx`, `app/[...urlSegments]/page.tsx`) :
   `client.queries.page(...)` + `generateStaticParams`.
2. Passe `{ query, variables, data }` au **Client Component**
   (`client-page.tsx`) qui appelle **`useTina`** et rend `data` (pas `props`)
   → aperçu temps réel dans `/admin`.
3. `export const revalidate = 300` (ISR) sur les routes.

Types et client GraphQL : **générés** dans `tina/__generated__/` (ne pas
éditer à la main).

---

## Design system

Tokens dans `styles.css` (variables CSS `--cream`, `--ink`, `--sunset`,
`--gold`, et polices `--font-heading/body/accent`). Les blocs lisent ces
variables — **aucune couleur n'est codée en dur** dans un bloc, ce qui permet
de faire évoluer la charte au même endroit. Polices auto-hébergées via
`next/font/google` (RGPD-clean, `app/fonts.ts`).

---

## Déploiement (Vercel)

1. Créer un projet **TinaCloud** isolé pour ce client → `app.tina.io`.
2. Définir les variables d'environnement **dans Vercel** (avant le build) :
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `NEXT_PUBLIC_TINA_BRANCH` (ex. `main`)
3. Build command : `npm run build` (= `tinacms build && next build`).
4. `/admin` sert l'éditeur visuel.
5. La **protection par mot de passe Vercel** (preview avant signature) reste au
   niveau Vercel, indépendante du CMS.

---

## Handoff client (après signature)

1. Inviter le client comme utilisateur sur le **projet TinaCloud**.
2. Lui donner l'accès à **`/admin`** sur son site.
3. Lui transmettre le mini-guide d'édition (sections, images, alt obligatoire).

---

## ⚠️ À personnaliser avant la mise en production

- **Téléphone** : `+33 6 12 34 56 78` est un **placeholder** — remplacer par le
  vrai numéro (`content/global/index.json` → `settings.phone`, le bloc Contact
  et le CTA `tel:`).
- **E-mail** : vérifier `contact@sunset-ride.com`.
- **Formulaire de contact** : il ouvre le client mail (mailto). Pour des envois
  sans messagerie, brancher un service (Formspree, Resend…) dans
  `components/util/contact-form.tsx`.
- **Favicon / logo HD** : le logo fourni est la version 192px ; remplacer par
  une version haute résolution si disponible.
