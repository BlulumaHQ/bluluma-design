import { useState } from "react";
import { useLang } from "@/lib/i18n";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", business: "", projectType: "", message: "" });
  const { t } = useLang();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("form.submit-thanks"));
  };

  return (
    <div>
      <section className="section-border">
        <div className="section-container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold">{t("contact.title")}</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">
            {t("contact.intro")}
          </p>
        </div>
      </section>
      <section>
        <div className="section-container section-padding">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-2">{t("form.name")}</label>
                <input
                  type="text" id="name" name="name" value={form.name} onChange={handleChange} required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2">{t("form.email")}</label>
                <input
                  type="email" id="email" name="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="business" className="text-sm font-medium block mb-2">{t("form.business")}</label>
                <input
                  type="text" id="business" name="business" value={form.business} onChange={handleChange}
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="text-sm font-medium block mb-2">{t("form.project-type")}</label>
                <select
                  id="projectType" name="projectType" value={form.projectType} onChange={handleChange}
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">{t("form.select-type")}</option>
                  <option value="website">Website Platform</option>
                  <option value="brand">Brand Identity</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="marketing">Marketing Collateral</option>
                  <option value="automation">AI Business Automation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium block mb-2">{t("form.message")}</label>
              <textarea
                id="message" name="message" rows={4} value={form.message} onChange={handleChange} required
                className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {t("cta.request-quote")}
            </button>
          </form>

          <div className="mt-16 pt-16 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-label mb-2">{t("form.email")}</h3>
              <p className="font-medium">hello@blulumadesign.com</p>
            </div>
            <div>
              <h3 className="text-label mb-2">Location</h3>
              <p className="font-medium">Vancouver, BC, Canada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
