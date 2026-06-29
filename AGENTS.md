# AGENTS.md — Sunset Ride

Guide pour tout agent IA / développeur intervenant sur ce dépôt.

## Ce qu'est ce projet

Site vitrine **Sunset Ride** (location de voitures de collection) :
**Next.js 15 App Router + TinaCMS**, dépôt unique Git-backed. Direction
artistique **Luxe / Classique** (voir `README.md`).

## Règles d'or (NE PAS casser)

1. **Schema-first.** Toute évolution du contenu se modélise d'abord dans les
   templates Tina (`tina/collection/page.ts`, `tina/collection/global.ts`),
   PUIS dans les composants. Lancer Tina régénère `tina/__generated__/`
   (client + types) — **ne jamais éditer ces fichiers à la main**.
2. **`data-tina-field` partout.** Chaque élément éditable porte
   `data-tina-field={tinaField(data, 'champ')}` (ou `tinaField(item)` pour un
   item de liste / un bloc). C'est ce qui active le click-to-edit. L'oublier
   est le bug n°1.
3. **Rendre `data` de `useTina`, pas `props.data`.** Sinon l'aperçu temps réel
   ne se met pas à jour. Voir `app/[...urlSegments]/client-page.tsx`.
4. **`alt` obligatoire sur chaque image.** Les images sont modélisées en objet
   `{ src, alt }` via `imageField()` (`tina/fields/shared.ts`). Pour une image
   optionnelle, `imageField(name, label, { required: false })` + un **nom de
   champ distinct** (voir gotcha ci-dessous).
5. **Pas de HTML/CSS libre pour le client.** Les variantes passent par des
   champs `options` (ex. `tone` de section, `variant` de bouton).
6. **Couleurs via variables CSS.** Jamais de hex codé en dur dans un bloc :
   utiliser les tokens de `styles.css` (`bg-cream`, `text-ink`, `bg-sunset`,
   `text-gold`, `bg-sand`…).
7. **Tout en français** côté admin (labels + `description`) et côté contenu.

## Architecture

```
app/
  layout.tsx                 # polices next/font + <html lang="fr"> + métadonnées
  page.tsx                   # home (relativePath home.mdx) + generateMetadata
  [...urlSegments]/          # autres pages (catch-all) + generateMetadata
    page.tsx                 # server fetch + generateStaticParams
    client-page.tsx          # useTina → <Blocks>
tina/
  config.tsx                 # collections [Page, Global], media → public/uploads
  collection/page.ts         # page : titre + seo + blocks (6 templates)
  collection/global.ts       # header / footer / settings
  fields/shared.ts           # imageField() (alt requis) + linkField()
components/
  blocks/                    # hero, services, gallery, testimonial,
                             # call-to-action, contact  (+ index.tsx = RenderBlocks)
  util/                      # section-shell, cta-link, media, contact-form
  layout/                    # layout, layout-context, nav/header, nav/footer
content/
  pages/home.mdx             # contenu de la page d'accueil (blocs en frontmatter)
  global/index.json          # réglages globaux
styles.css                   # design system (tokens + base typo)
```

Un bloc = **un fichier** dans `components/blocks/` exportant à la fois le
composant React **et** son `Template` (`xxxBlockSchema`). Pour ajouter un bloc :
créer le fichier, l'importer dans `tina/collection/page.ts` (tableau
`templates`) et dans `components/blocks/index.tsx` (`switch` sur `__typename`).

## Gotchas rencontrés (à connaître)

- **Conflit GraphQL « fields image conflict ».** Tina fusionne les champs objet
  portant le **même nom** à travers les templates. Deux champs `image` avec une
  exigence `required` différente (`String!` vs `String`) → erreur de codegen.
  Solution appliquée : les images **optionnelles** ont un nom distinct
  (`backgroundImage` pour le CTA, `ogImage` pour le SEO) ; les images requises
  s'appellent toutes `image`.
- **`tone` / `variant` typés `string`.** Tina type les champs `options` en
  `string`, pas en union. `SectionShell` et `CtaLink` acceptent `string | null`
  et bornent en interne. Ne pas re-typer en union stricte côté props.
- **Build de prod local.** `npm run build` (= `tinacms build && next build`)
  exige des identifiants TinaCloud. Pour un build **hors-ligne** :
  `npm run build-local` (= `tinacms build --local --skip-cloud-checks -c "next build"`).
  Si `next build` est lancé via `-c` sans `NODE_ENV=production`, il choisit le
  runtime React **dev** et plante au prerender de `/_not-found`
  (`Cannot read properties of undefined (reading 'env')`). Exporter
  `NODE_ENV=production` corrige (le vrai build Vercel le fait automatiquement).

## Vérifs avant commit

```bash
npx tsc --noEmit         # types
npm run build-local      # build de prod hors-ligne (NODE_ENV=production conseillé)
```

(Voir `README.md` pour le déploiement Vercel, les variables d'env et le handoff.)
