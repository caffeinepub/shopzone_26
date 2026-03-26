import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page } from "../types";

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

function saveContactMessage(msg: ContactMessage) {
  try {
    const existing: ContactMessage[] = JSON.parse(
      localStorage.getItem("shopzone_contact_messages") || "[]",
    );
    existing.push(msg);
    localStorage.setItem("shopzone_contact_messages", JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export default function ContactPage({
  onNavigate: _onNavigate,
}: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const msg: ContactMessage = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };
    saveContactMessage(msg);
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Get In Touch
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          We'd love to hear from you. Reach out for orders, wholesale enquiries,
          or just to say hello!
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Info */}
        <aside className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5">Email</p>
                <a
                  href="mailto:shopzone@pahadi.in"
                  className="text-sm text-primary hover:underline"
                >
                  shopzone@pahadi.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5">Phone</p>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5">Address</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mallital, Nainital
                  <br />
                  Uttarakhand — 263001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm mb-0.5">Working Hours</p>
                <p className="text-sm text-muted-foreground">
                  Mon–Sat, 9 AM – 6 PM IST
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <section className="md:col-span-3">
          <div className="bg-card border border-border rounded-2xl p-6">
            {submitted && (
              <div
                data-ocid="contact.success_state"
                className="mb-4 bg-green-50 text-green-700 border border-green-200 rounded-lg px-4 py-3 text-sm font-medium"
              >
                ✓ Your message has been received. We'll respond within 24 hours!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">Your Name</Label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.input"
                    type="text"
                    placeholder="Ramesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    data-ocid="contact.input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  data-ocid="contact.input"
                  type="text"
                  placeholder="How can we help?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.textarea"
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
                data-ocid="contact.submit_button"
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
