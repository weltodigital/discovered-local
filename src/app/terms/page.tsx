import type { Metadata } from "next";

import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The basics of how creator collaborations work with Discovered Local.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="September 2025">
      <section>
        <h2>Applying</h2>
        <p>
          Applying to become a Discovered Local creator is free and doesn&rsquo;t
          guarantee you&rsquo;ll be accepted or that you&rsquo;ll receive
          opportunities. Opportunities depend on what local businesses are looking
          for at the time.
        </p>
      </section>

      <section>
        <h2>Collaborations</h2>
        <p>
          Creator collaborations are usually based around a complimentary
          experience — a meal, a drink, an activity — rather than payment. The
          details of each opportunity, including what the business expects and what
          you&rsquo;ll receive, are agreed before you visit. You&rsquo;re free to
          decline any opportunity.
        </p>
      </section>

      <section>
        <h2>What we ask of creators</h2>
        <ul>
          <li>Turn up when you say you will, or give reasonable notice</li>
          <li>Create and post the content you agreed to</li>
          <li>Treat the businesses you visit and their staff well</li>
          <li>Follow the ASA rules on disclosing gifted content</li>
        </ul>
        <p>
          Repeated no-shows or failure to post may mean we stop sending you
          opportunities.
        </p>
      </section>

      <section>
        <h2>Your content</h2>
        <p>
          The content you create is yours. Where a business asks for permission to
          reuse it, we&rsquo;ll agree that with you as part of the opportunity.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          Discovered Local is new and still taking shape. We may update these terms
          as we go; the date at the top shows the latest version.
        </p>
      </section>
    </LegalPage>
  );
}
