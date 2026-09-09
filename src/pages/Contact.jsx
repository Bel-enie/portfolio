import { useState } from "react";
import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import Label from "../components/Label";
import SocialLinks from "../components/SocialLinks";
import Reveal from "../components/Reveal";
import CvLink from "../components/CvLink";
import { profile, availability } from "../data/site";

const empty = { name: "", email: "", subject: "", message: "" };

// Web3Forms access key (https://web3forms.com). Set VITE_WEB3FORMS_KEY in
// .env locally and in Vercel's environment settings. Without it, the form
// falls back to handing the message to the visitor's email client.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That does not look like a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 20) {
    errors.message = "A little more detail would help, please.";
  }
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[11px] tracking-wider text-muted uppercase"
        >
          {label}
        </label>
        {error && (
          <span className="text-[12px] text-accent" id={`${id}-error`}>
            {error}
          </span>
        )}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// Inputs sit a shade darker than the card so they read as fields.
const inputClass =
  "w-full rounded-md border bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors duration-150 placeholder:text-muted/70 hover:border-muted focus:border-accent";

const primaryButton =
  "inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-accent-hover";

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  // idle | sending | sent | fallback (no key) | failed (request error)
  const [status, setStatus] = useState("idle");

  const update = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Honeypot: real visitors never see this field, bots fill it in.
    if (event.target.elements.botcheck?.value) {
      setStatus("sent");
      return;
    }

    if (!ACCESS_KEY) {
      setStatus("fallback");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: "Portfolio contact form",
          subject: values.subject.trim() || `New message from ${values.name.trim()}`,
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      const data = await response.json();
      setStatus(data.success ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    values.subject || `Message from ${values.name}`,
  )}&body=${encodeURIComponent(
    `${values.message}\n\nFrom: ${values.name} (${values.email})`,
  )}`;

  const border = (field) =>
    errors[field] ? "border-accent" : "border-line-strong";

  return (
    <>
      <PageHeader
        label="Contact"
        title="Start a conversation"
        intro="Open to internships, freelance work, and collaborations."
      />

      <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
        <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
          {/* Direct channels + availability */}
          <Reveal as="aside">
            <Label>Find me</Label>
            <SocialLinks size={28} className="mt-6" />
            <CvLink className="mt-6" />

            <dl className="mt-8 space-y-5 border-t border-line pt-7">
              {availability.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[11px] tracking-wider text-muted uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-[15px] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Form */}
          <Reveal
            as="section"
            delay={120}
            className="card-highlight rounded-xl border border-line bg-surface p-7 sm:p-9"
          >
            {status === "sent" && (
              <div>
                <Label>Message sent</Label>
                <h2 className="mt-4 text-2xl font-semibold">
                  Thanks, {values.name.trim().split(" ")[0]}.
                </h2>
                <p className="mt-3 max-w-md text-muted text-pretty">
                  Your message is on its way to my inbox. I will get back to
                  you at {values.email.trim()}.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 text-[15px] text-muted underline-offset-4 hover:text-accent hover:underline"
                >
                  Send another
                </button>
              </div>
            )}

            {(status === "fallback" || status === "failed") && (
              <div>
                <Label>
                  {status === "failed" ? "Could not send" : "Ready to send"}
                </Label>
                <h2 className="mt-4 text-2xl font-semibold">
                  Thanks, {values.name.trim().split(" ")[0]}.
                </h2>
                <p className="mt-3 max-w-md text-muted text-pretty">
                  {status === "failed"
                    ? "Something went wrong on the way to my inbox. Your message is still here — send it through your email client instead."
                    : "This form is not connected to a mail server yet. Send it through your email client and it will reach me directly."}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <a href={mailtoFallback} className={primaryButton}>
                    Open in email client
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[15px] text-muted underline-offset-4 hover:text-accent hover:underline"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}

            {(status === "idle" || status === "sending") && (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot — hidden from people, tempting to bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={update}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`${inputClass} ${border("name")}`}
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={update}
                      placeholder="you@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`${inputClass} ${border("email")}`}
                    />
                  </Field>
                </div>

                <Field id="subject" label="Subject (optional)">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={update}
                    placeholder="Freelance project, internship, collaboration"
                    className={`${inputClass} border-line-strong`}
                  />
                </Field>

                <Field id="message" label="Message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={update}
                    placeholder="What are you building, and where do you need a hand?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputClass} resize-y ${border("message")}`}
                  />
                </Field>

                <div className="border-t border-line pt-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`${primaryButton} disabled:cursor-wait disabled:opacity-60`}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>

                  {/* Secondary option, stacked under the primary action */}
                  <p className="mt-4 font-mono text-[12px] text-muted">
                    Prefer email?{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {profile.email}
                    </a>
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </>
  );
}
