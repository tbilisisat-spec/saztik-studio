/**
 * Everything the public homepage says lives here, so it is easy to edit
 * without touching layout code.
 */
import { CONTACT_EMAIL } from "@/lib/contact";

export const SERVICES = [
  {
    id: "websites",
    title: "Website design",
    text: "Fast, modern websites for businesses, cafés, restaurants, clinics and personal brands. Looks good on every phone, easy to update, ready to be found on Google.",
    icon: "globe",
  },
  {
    id: "platforms",
    title: "Platforms & web apps",
    text: "Booking systems, dashboards, online shops, customer areas. A custom platform that takes repeated work off your hands.",
    icon: "layers",
  },
  {
    id: "apps",
    title: "Mobile apps",
    text: "Android and iOS apps for your customers or your own team, from a simple first version to a full product.",
    icon: "phone",
  },
  {
    id: "mini-apps",
    title: "Mini apps",
    text: "Small, focused apps for Android and iOS. Quicker and cheaper to build than a full app, and just as easy for people to use.",
    icon: "grid",
  },
  {
    id: "video",
    title: "Promo videos",
    text: "Short promotional videos and reels for your product, place or brand.",
    icon: "film",
  },
] as const;

export const STEPS = [
  {
    title: "Tell us what you need",
    text: "Send a short message. A few lines about your business is enough.",
  },
  {
    title: "Get a clear plan and price",
    text: "We reply with what we would build, how long it takes and what it costs.",
  },
  {
    title: "We build, you approve",
    text: "You see the work as it grows. We launch once you are happy.",
  },
] as const;

export const FORM_SERVICES = [
  ...SERVICES.map((service) => service.title),
  "Not sure yet, advise me",
] as const;

export { CONTACT_EMAIL };
