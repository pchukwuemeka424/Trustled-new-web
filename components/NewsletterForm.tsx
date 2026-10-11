"use client";

import { FormSubmitFields } from "./FormSubmitFields";

export function NewsletterForm() {
  return (
    <form
      data-form
      action="https://formsubmit.co/hello@trustledai.com"
      method="POST"
    >
      <FormSubmitFields subject="Newsletter sign-up from trustledai.com" />
      <label className="small" htmlFor="footer-email">
        Stay updated
      </label>
      <div className="inline-form" style={{ maxWidth: 340 }}>
        <input
          id="footer-email"
          type="email"
          name="Email"
          placeholder="Your email"
          required
          autoComplete="email"
        />
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </div>
    </form>
  );
}
