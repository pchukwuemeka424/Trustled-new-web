"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ContactForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("Name"),
          email: data.get("Email"),
          organisation: data.get("Organisation"),
          sector: data.get("Sector"),
          topic: data.get("Topic"),
          message: data.get("Message"),
          _honey: data.get("_honey"),
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send message");
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send message");
      setPending(false);
    }
  }

  return (
    <form className="form form-card reveal" data-form onSubmit={onSubmit}>
      <input
        type="text"
        name="_honey"
        className="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-name">Full name</label>
          <input id="c-name" type="text" name="Name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="c-email">Work email</label>
          <input id="c-email" type="email" name="Email" required autoComplete="email" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="c-org">Organisation</label>
          <input id="c-org" type="text" name="Organisation" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="c-sector">Sector</label>
          <select id="c-sector" name="Sector" defaultValue="University or research institute">
            <option>University or research institute</option>
            <option>Business</option>
            <option>Public sector body</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-topic">How can we help?</label>
        <select id="c-topic" name="Topic" defaultValue="AI governance advisory">
          <option data-key="advisory">AI governance advisory</option>
          <option data-key="training">Training and certification</option>
          <option data-key="tools">Custom AI solutions</option>
          <option data-key="garil">GARIL AI demo or quote</option>
          <option data-key="uaicip">UAICIP for my institution</option>
          <option data-key="grc">AI GRC Practitioner Training Programme</option>
          <option data-key="career">AI career guidance</option>
          <option data-key="tracking">Responsible AI Tracking results</option>
          <option data-key="speaking">Speaking invitation</option>
          <option data-key="other">Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="Message" required />
      </div>
      {error ? (
        <p className="form-note" style={{ color: "var(--orange-dark)" }}>
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Send message"}{" "}
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      <p className="form-note">
        Your message goes straight to hello@trustledai.com. See our{" "}
        <a href="/privacy">privacy policy</a>.
      </p>
    </form>
  );
}
