import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";

const contactInfo = [
  {
    icon: FiMapPin,
    title: "Farm Address",
    lines: ["1247 Green Valley Road", "Fresno, California 93706", "United States"],
  },
  {
    icon: FiPhone,
    title: "Phone",
    lines: ["+1 (555) 234-5678"],
    subtitle: "Mon – Fri, 7am – 5pm PST",
  },
  {
    icon: FiMail,
    title: "Email",
    lines: ["hello@unogreenharvest.com"],
  },
];

function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > 500) return; // enforce 500 char limit
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
  };

  return (
    <div>

      <PageHero
        badge="Get in Touch"
        title="Contact Us"
        description="We would love to hear from you. Whether you have a question about our products, want to visit the farm, or just want to say hello — reach out anytime."
        bgImage="/images/contact(1).jpeg"
      />

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">

        {/* Send Us a Message */}
        <div className= "lg:col-span-2">
          <h2 className="font-dm text-3xl mb-8">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F4F8F1] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-[#F4F8F1] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#F4F8F1] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#F4F8F1] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2D7A0F] focus:ring-1 focus:ring-[#2D7A0F] transition resize-none"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                {form.message.length}/500 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-fit flex items-center gap-2 bg-[#D69B06] hover:bg-[#c38d04] transition text-white px-6 py-2.5 text-sm rounded-full font-semibold mt-2"
            >
              Send Message
              <FiSend size={14} />
            </button>

          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="font-dm text-3xl mb-8 lg:col-span-1">Contact Information</h2>

          <div className="flex flex-col gap-6 mb-8">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#2D7A0F]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-gray-600 text-sm">{line}</p>
                    ))}
                    {item.subtitle && (
                      <p className="text-gray-400 text-xs mt-1">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 relative">
            <a
              href="https://www.google.com/maps?q=1247+Green+Valley+Road,+Fresno,+CA+93706"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 z-10 bg-white text-[#2D7A0F] text-xs font-semibold px-3 py-1.5 rounded-lg shadow flex items-center gap-1 hover:bg-gray-50"
            >
              Open in Maps ↗
            </a>

            <iframe
              title="Farm location map"
              src="https://www.google.com/maps?q=1247+Green+Valley+Road,+Fresno,+CA+93706&output=embed"
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;