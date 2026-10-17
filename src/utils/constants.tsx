import { strapi } from "@strapi/client";
import {
  IconBrandCss3,
  IconBrandFirebase,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandSass,
  IconBrandSupabase,
  type Icon,
} from "@tabler/icons-react";

export const strapiClient = strapi({
  baseURL: `${import.meta.env.VITE_STRAPI_URL}/api/`,
});

export const SOCIALS: Social[] = [
  {
    name: "twitter",
    url: "https://x.com/hellogirls_DEV",
  },
  {
    name: "instagram",
    url: "https://instagram.com/hellogirls.info",
  },
  {
    name: "bluesky",
    url: "https://bsky.app/profile/hellogirls.info",
  },
  {
    name: "github",
    url: "https://github.com/hellogirls-js",
  },
  {
    name: "coffee",
    url: "https://buymeacoffee.com/hellogirls",
  },
];

export const STACK_ICONS = {
  React: IconBrandReact,
  "Next.js": IconBrandNextjs,
  "Mantine UI": IconBrandMantine,
  "Google Firebase": IconBrandFirebase,
  HTML: IconBrandHtml5,
  CSS: IconBrandCss3,
  JavaScript: IconBrandJavascript,
  SCSS: IconBrandSass,
  Supabase: IconBrandSupabase,
} satisfies Record<string, Icon>;

export type StackItem = keyof typeof STACK_ICONS;

export const PROJECTS: {
  name: string;
  url: string;
  stack: StackItem[];
  description: React.ReactNode;
}[] = [
  {
    name: "MakoTools",
    url: "https://stars.ensemble.moe",
    stack: ["React", "Next.js", "Mantine UI", "Google Firebase"],
    description: (
      <>
        <p>
          An open-source website made to store data related to the mobile game{" "}
          <em>Ensemble Stars! Music!!</em> The website has over 80 contributors
          such as data maintainers, designers, and translators. I had a lot of
          fun assisting as a developer and admin.
        </p>
        <p>
          MakoTools has over 7000 registered users and 23000 monthly views.
          Although it is still in beta, it's almost ready to leave the beta
          stage.
        </p>
      </>
    ),
  },
  {
    name: "Cafe Shiinamon",
    url: "https://cafeshiinamon.hellogirls.info",
    stack: ["HTML", "CSS", "JavaScript"],
    description: (
      <>
        <p>
          Niki finally quits being an idol, hoping to stay dedicated to cooking.
          However, he's fired from Cafe Cinnamon due to his past as an idol.
          Driven by his desire to stay in the food industry, he opens a new
          restaurant by himself. Now, he must work from the bottom up to sustain
          himself!
        </p>
        <p>
          An incremental browser game with a story line. Game play requires
          serving customers and earning money while making sure Niki's stomach
          doesn't become empty.
        </p>
      </>
    ),
  },
  {
    name: "Ensemble Stars Personality Quiz",
    url: "https://hellogirls.info/projects/enstars-fan-quiz",
    stack: ["React", "SCSS", "Supabase"],
    description: (
      <>
        <p>
          A personality quiz run by Dr. Sakasaki that determines what kind of
          Enstars fan a quiz taker is. Stores the results in a database and
          shows which results are the most common and what the average score is
          for each personality type.
        </p>
        <p>
          Over 1000 fans have taken the quiz so far, reflecting a very diverse
          fanbase.
        </p>
      </>
    ),
  },
  //{
  // name: "Ensemble Stars Favorites Picker",
  // url: "https://hellogirls.info/projects/enstars-faves-picker",
  // stack: ["React", "SCSS", "Konva.js"],
  // description: (
  // 	<>
  // 		<p>
  // 			A website that allows users to pick their favorite Ensemble Stars
  // 			characters from each unit and save their output as a clean, beautiful
  // 			image created with Konva.js
  // 		</p>
  // 		<p>
  // 			The Twitter post showcasing this webpage has over 1 million views and
  // 			over 10000 impressions.
  // 		</p>
  // 	</>
  // ),
  //},
];

export const STOPS = Array.from(
  { length: PROJECTS.length + 1 },
  (_, k) => k / PROJECTS.length,
);

export const HOLD = 0.2;
export const HOLD_RADIUS = HOLD / (2 * PROJECTS.length);
