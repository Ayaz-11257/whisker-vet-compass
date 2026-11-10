<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Provider listings and categories live in `src/lib/providers.ts` as static demo data; every listing must stay visibly labelled as demo with placeholder phone numbers until a real data source replaces it — the product must never imply real businesses, reviews or credentials.
- Explore page filters (`q`, `location`, `category`, `emergency`) are URL search params validated in `src/routes/explore.tsx` and filtered by `filterProviders`, so results are shareable and covered by `src/lib/providers.test.ts`.
- Shared layout (header, footer, toaster) wraps `<Outlet />` in `src/routes/__root.tsx`; site-wide pieces live in `src/components/site/`.
- The listing and correction forms are front-end previews only and must say so on screen until a backend is connected.
