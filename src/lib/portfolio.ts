/**
 * Homepage portfolio. Add one entry per real project you want to show.
 *
 * - `service` must match a service id in site-content.ts
 *   (websites | platforms | apps | mini-apps | video).
 * - `href` is where the card links to (for a client site: "/pettoronto").
 * - `preview` (optional): a path to a page shown as a live thumbnail inside the card.
 * - `image` (optional): a screenshot, used when there is no preview.
 *
 * Only list work that is real. Services without an entry simply have no sample yet.
 */
export type PortfolioItem = {
  service: "websites" | "platforms" | "apps" | "mini-apps" | "video";
  title: string;
  note: string;
  href: string;
  preview?: string;
  image?: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  // Add the Pet Spa card back once its files exist in public/demos/pettoronto/index.html:
  // {
  //   service: "websites",
  //   title: "Pet Spa Toronto",
  //   note: "Website for a dog and cat grooming studio in Toronto.",
  //   href: "/pettoronto",
  //   preview: "/demos/pettoronto/index.html",
  // },
];
