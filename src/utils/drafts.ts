// Drafts are visible in dev and in preview builds (PUBLIC_SHOW_DRAFTS=true), hidden in production.
export const showDrafts =
  !import.meta.env.PROD || import.meta.env.PUBLIC_SHOW_DRAFTS === "true";
