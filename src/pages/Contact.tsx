import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", business: "", projectType: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TBD: form submission logic
    alert("Thank you for your message. We'll be in touch.");
  };

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">Contact</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Tell us about your business and the digital platform you want to build.
          </p>
        </div>
      </section>
      <section>
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-2">Name</label>
                <input
                  type="text" id="name" name="name" value={form.name} onChange={handleChange} required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2">Email</label>
                <input
                  type="email" id="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="business" className="text-sm font-medium block mb-2">Business Name</label>
                <input
                  type="text" id="business" name="business" value={form.business} onChange={handleChange}
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="text-sm font-medium block mb-2">Project Type</label>
                <select
                  id="projectType" name="projectType" value={form.projectType} onChange={handleChange}
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a project type</option>
                  <option value="website">Website Platform</option>
                  <option value="brand">Brand Identity</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="marketing">Marketing Collateral</option>
                  <option value="automation">AI Business Automation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-2">Message</label>
                <textarea
                  id="message" name="message" rows={5} value={form.message} onChange={handleChange} required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="space-y-8">
              <div>
                <h3 className="text-label mb-2">Email</h3>
                <p className="font-medium">hello@blulumadesign.com</p>
              </div>
              <div>
                <h3 className="text-label mb-2">Location</h3>
                <p className="font-medium">Vancouver, BC, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
