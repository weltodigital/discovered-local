import type { Metadata } from "next";

import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Discovered Local collects, uses and protects the information creators share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="September 2025">
      <section>
        <h2>Who we are</h2>
        <p>
          Discovered Local connects creators in Portsmouth with local restaurants,
          cafés, bars and independent businesses. You can reach us at{" "}
          <a className="text-ink underline underline-offset-2" href="mailto:hello@discoveredlocal.com">
            hello@discoveredlocal.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>
          When you apply to become a creator we collect the details you give us in
          the application form:
        </p>
        <ul>
          <li>Your name, email address and (optionally) phone number</li>
          <li>Your Instagram and TikTok usernames and approximate follower counts</li>
          <li>Where you&rsquo;re based and the kinds of content you make</li>
          <li>Links to your content, portfolio or website</li>
          <li>Your collaboration preferences and anything else you tell us</li>
        </ul>
      </section>

      <section>
        <h2>Why we use it</h2>
        <p>
          We use it to review your application, to match you with local
          opportunities and to contact you about those opportunities. We rely on
          your consent, which you give when you submit the form and can withdraw at
          any time.
        </p>
      </section>

      <section>
        <h2>Who sees it</h2>
        <p>
          Your application is visible to the Discovered Local team. Applications are
          stored with Supabase, our database provider, and the site is hosted on
          Vercel. We don&rsquo;t sell your data. If you&rsquo;re matched with a local
          business we&rsquo;ll share only what that business needs to host you — your
          name and social handles.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          We keep applications while we&rsquo;re actively running the creator
          community. Ask us to delete yours and we will.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Under UK GDPR you can ask for a copy of your data, ask us to correct or
          delete it, or withdraw your consent. Email us and we&rsquo;ll sort it. You
          can also complain to the Information Commissioner&rsquo;s Office.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>
          We use Vercel Web Analytics to count page views and understand how people
          move through the site. It doesn&rsquo;t use cookies and doesn&rsquo;t track
          you across other websites.
        </p>
      </section>
    </LegalPage>
  );
}
