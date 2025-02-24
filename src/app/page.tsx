import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { HeroSection } from "@/components/custom/HeroSection";
const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
});
async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;
  console.log(url.href);
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    const flattenData = flattenAttributes(data);
    console.dir(flattenData, { depth: null });
    return flattenData;
  } catch (error) {
    console.error;
  }
}
export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  console.log(strapiData, "------strapi data");
  const { title, description, blocks } = strapiData;
  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
