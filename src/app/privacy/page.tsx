import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Discovered Local collects, uses and protects the information creators and businesses share with us.",
  alternates: { canonical: "/privacy" },
};

const CONTACT_EMAIL = "info@weltodigital.com";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="September 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          Discovered Local connects local businesses in Portsmouth with creators
          who live nearby. Discovered Local is operated by Welto Limited, which is
          the data controller for the information described here. You can reach us
          at{" "}
          <a
            className="text-ink underline underline-offset-2"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          The short version: the only personal information we hold is what you
          type into our two forms. We don&rsquo;t track you around the web, we
          don&rsquo;t set cookies on the public site and we don&rsquo;t sell data.
        </p>
      </section>

      <section>
        <h2>If you apply as a creator</h2>
        <p>
          When you apply through the creator application we collect the details
          you give us:
        </p>
        <ul>
          <li>Your name, email address and (optionally) phone number</li>
          <li>
            Your Instagram and/or TikTok username, approximate follower counts and
            which platform you mainly create on
          </li>
          <li>Where you&rsquo;re based and the kinds of content you make</li>
          <li>Links to your content, portfolio or website</li>
          <li>
            Your collaboration preferences, how often you&rsquo;d like to work with
            businesses and whether you&rsquo;re happy with complimentary experiences
          </li>
          <li>Anything else you tell us in the free-text answers</li>
          <li>
            That you ticked the consent and commitment boxes, and when you
            submitted the form
          </li>
        </ul>
        <p>
          We use this to review your application, to match you with local
          opportunities and to contact you about those. Our legal basis is your
          consent, which you give by ticking the box on the form and can withdraw
          at any time by emailing us.
        </p>
        <p>
          If we match you with a business, we share only what that business needs
          to host you: your name and your social handles.
        </p>
      </section>

      <section>
        <h2>If you enquire as a business</h2>
        <p>
          When you get in touch through the business enquiry form we collect the
          business name, your name and email address, and, if you give them, your
          phone number, website, Instagram handle, business type, location and
          anything you add in the notes.
        </p>
        <p>
          We use this to reply to your enquiry and to talk to you about the
          Discovered Local service. You tick a box on the form to confirm
          you&rsquo;re happy for us to do that; we also have a legitimate interest
          in responding to someone who has asked to hear from us. Tell us to stop
          and we will.
        </p>
      </section>

      <section>
        <h2>What we collect automatically</h2>
        <p>Very little.</p>
        <ul>
          <li>
            Our hosting provider, Vercel, keeps standard server logs, which include
            IP addresses, for a short period for security and to keep the site
            running.
          </li>
          <li>
            The forms include a simple check to filter out automated spam
            submissions (a hidden field and how long the form was open). This
            isn&rsquo;t stored and isn&rsquo;t used for anything else.
          </li>
          <li>
            We use Vercel Web Analytics to count page views and see how people move
            through the site. It doesn&rsquo;t use cookies, doesn&rsquo;t track you
            across other websites and doesn&rsquo;t give us a way to identify you.
          </li>
        </ul>
        <p>
          The public site sets no cookies. See our{" "}
          <Link href="/cookies" className="text-ink underline underline-offset-2">
            cookies policy
          </Link>{" "}
          for the details.
        </p>
      </section>

      <section>
        <h2>Who sees it and where it&rsquo;s stored</h2>
        <p>
          Applications and enquiries are visible only to the Discovered Local
          team, through a private, password-protected admin area. They&rsquo;re
          stored with Supabase, our database provider, and the site is hosted on
          Vercel. Where a provider processes data outside the UK, that transfer is
          covered by the UK&rsquo;s international data transfer safeguards
          (standard contractual clauses or an adequacy decision).
        </p>
        <p>
          We don&rsquo;t sell your data and we don&rsquo;t share it with anyone
          else except as described above, or if the law requires it.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <ul>
          <li>
            Creator applications: while you&rsquo;re an active Discovered Local
            creator, and for 12 months after your last contact with us if
            you&rsquo;re not accepted or stop taking part.
          </li>
          <li>
            Business enquiries: 12 months after our last contact with you, or for
            as long as you&rsquo;re a customer.
          </li>
        </ul>
        <p>Ask us to delete your details sooner and we will.</p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>Under UK GDPR you can:</p>
        <ul>
          <li>Ask for a copy of the information we hold about you</li>
          <li>Ask us to correct or delete it</li>
          <li>Withdraw your consent at any time</li>
          <li>Object to, or ask us to restrict, how we use it</li>
        </ul>
        <p>
          Email us at{" "}
          <a
            className="text-ink underline underline-offset-2"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and we&rsquo;ll sort it, normally within a few days and always within a
          month. If you&rsquo;re unhappy with how we&rsquo;ve handled your data you
          can complain to the Information Commissioner&rsquo;s Office at{" "}
          <a
            className="text-ink underline underline-offset-2"
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            ico.org.uk
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If we start collecting or using information in a new way, we&rsquo;ll
          update this page first. The date at the top shows the latest version.
        </p>
      </section>
    </LegalPage>
  );
}
