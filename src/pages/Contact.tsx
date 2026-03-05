import { useLang } from "@/lib/i18n";

const Contact = () => {
  const { t } = useLang();

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
          <form
            action="https://formspree.io/f/xlgprnry?redirect=https%3A%2F%2Fbluluma.com%2Fthank-you"
            method="POST"
            className="space-y-6 max-w-4xl"
          >
            <input type="hidden" name="_next" value="https://bluluma.com/thank-you" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-2">Name</label>
                <input
                  type="text" id="name" name="name" required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2">Email</label>
                <input
                  type="email" id="email" name="email" required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium block mb-2">Company</label>
                <input
                  type="text" id="company" name="company" required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="current_url" className="text-sm font-medium block mb-2">Current Website (Optional)</label>
                <input
                  type="text" id="current_url" name="current_url"
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="project_type" className="text-sm font-medium block mb-2">Project Type</label>
                <select
                  id="project_type" name="project_type" required
                  className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select Your Project Type</option>
                  <option value="Website Design & Development">Website Design & Development</option>
                  <option value="Brand Identity & Visual System">Brand Identity & Visual System</option>
                  <option value="Ecommerce Platform">Ecommerce Platform</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                  <option value="AI Business Automation">AI Business Automation</option>
                  <option value="Graphic Design & Marketing Materials">Graphic Design & Marketing Materials</option>
                  <option value="Other / Not Sure Yet">Other / Not Sure Yet</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium block mb-2">Message</label>
              <textarea
                id="message" name="message" rows={4} required
                className="w-full border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Request a Quote
            </button>
          </form>

          <div className="mt-16 pt-16 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-label mb-2">{t("form.email")}</h3>
              <p className="font-medium">support@bluluma.com</p>
            </div>
            <div>
              <h3 className="text-label mb-2">{t("contact.location")}</h3>
              <p className="font-medium">Vancouver, BC, Canada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
