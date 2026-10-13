import { defineAstroPaperConfig } from "./src/types/config";

/* Funny */
export function shuffle(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements using destructuring assignment
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
/* Funny */

export default defineAstroPaperConfig({
  site: {
    url: "https://blog.sira.tongsima.com/",
    title: shuffle(["B", "L", "O", "G"]).join(''),
    description: "A site for rambling about incredibly stupid projects.",
    author: "Sira Tongsima",
    profile: "https://satna.ing",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Bangkok",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/theme222" },
    { name: "mail",     url: "mailto:sira.tongsima@yahoo.com" },
  ],
  shareLinks: [
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});