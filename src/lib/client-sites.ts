/**
 * Client demo sites shown at saztik.com/{slug}.
 * Files live in public/demos/{slug}/index.html (static site: html/css/js/images).
 * To add a new client: copy the site into public/demos/{slug}/ and add one entry here.
 */
export type ClientSite = {
  slug: string;
  name: string;
  tagline?: string;
};

export const CLIENT_SITES: ClientSite[] = [
  { slug: "pettoronto", name: "Pet Spa Toronto", tagline: "Dog & cat grooming · Toronto" },
];

export function getClientSite(slug: string): ClientSite | undefined {
  return CLIENT_SITES.find((s) => s.slug === slug.toLowerCase());
}
