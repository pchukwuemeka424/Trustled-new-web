"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeInProps } from "./motionPresets";
import { ContactForm } from "./ContactForm";

type Channel = {
  label: string;
  value: string;
  note: string;
  href?: string;
};

const CHANNELS: Channel[] = [
  {
    label: "Email",
    value: "hello@trustledai.com",
    href: "mailto:hello@trustledai.com",
    note: "We aim to reply within two working days.",
  },
  {
    label: "United Kingdom",
    value: "Liverpool",
    note: "TrustLed AI Ltd · Company No. 17174921",
  },
  {
    label: "Nigeria",
    value: "Abuja",
    note: "CAC No. 9613640",
  },
];

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="contact-panel" id="enquire" aria-labelledby="contact-panel-title">
      <div className="contact-panel__glow" aria-hidden="true" />
      <div className="contact-panel__inner">
        <motion.aside className="contact-aside" {...fadeInProps("left", 0.1, reduceMotion)}>
          <p className="contact-aside__eyebrow">Get in touch</p>
          <h2 id="contact-panel-title" className="contact-aside__title">
            How can we help?
          </h2>
          <p className="contact-aside__lead">
            Share a little about your organisation and the outcome you want. We will follow up with
            next steps.
          </p>

          <ul className="contact-channels">
            {CHANNELS.map((item) => (
              <li key={item.label} className="contact-channel">
                <span className="contact-channel__label">{item.label}</span>
                {item.href ? (
                  <a className="contact-channel__value" href={item.href}>
                    {item.value}
                  </a>
                ) : (
                  <span className="contact-channel__value">{item.value}</span>
                )}
                <span className="contact-channel__note">{item.note}</span>
              </li>
            ))}
          </ul>
        </motion.aside>

        <motion.div className="contact-form-wrap" {...fadeInProps("right", 0.18, reduceMotion)}>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
