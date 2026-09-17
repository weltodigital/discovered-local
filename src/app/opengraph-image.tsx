import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { PRICE_FOUNDING } from "@/lib/constants";

export const alt =
  "Discovered Local, get discovered by local creators in Portsmouth";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    headline: "Get discovered by local creators.",
    supporting: `4 local creator collaborations every month. ${PRICE_FOUNDING}/month for founding businesses.`,
    cta: "Get started",
  });
}
