import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt =
  "Discovered Local, Portsmouth creators wanted";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    headline: "Discover local. Create content. Get invited back.",
    supporting: "Portsmouth creators wanted.",
    cta: "Become a creator",
  });
}
