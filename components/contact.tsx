"use client";

import { motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px -100px 0px",
  });

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};

    const fullName = formData.get("fullName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    // Name validation: required + letters only
    if (!fullName) {
      newErrors.fullName = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      newErrors.fullName = "Name can only contain letters and spaces.";
    }

    // Email validation: required + proper format
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation: required + numbers only
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+()\-\s]*$/.test(phone)) {
      newErrors.phone =
        "Phone number can only contain numbers and symbols +, -, ().";
    }

    // Message validation: required
    if (!message) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    if (!validateForm(formData)) {
      setStatus("Please fix the errors before submitting.");
      return;
    }

    setStatus("Sending...");

    const data = {
      service_id: "service_6jybba9",
      template_id: "template_yaup53k",
      user_id: "2IuW0Sj0bTx8RGlan",
      template_params: {
        from_name: formData.get("fullName"),
        from_email: formData.get("email"),
        message: formData.get("message"),
      },
    };

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setStatus("Message sent!");
        formRef.current.reset();
        setErrors({});
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err) {
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <div
      ref={ref}
      className="mx-auto px-6 sm:px-8 md:px-10 lg:px-16 mt-36"
      id="contact"
    >
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Outer Container */}
          <div className="flex flex-col lg:flex-row gap-10 max-w-full lg:max-w-[1328px] mx-auto rounded-[24px] p-3 sm:p-6 lg:p-5 items-stretch justify-between">
            {/* LEFT SIDE - CONTACT DETAILS */}
            <div className="flex flex-col gap-8 lg:w-1/2">
              {/* Heading */}
              <div className="flex flex-col gap-6">
                <h2 className="font-poppins font-bold text-2xl lg:text-[32px] text-[#604D37]">
                  Ready to Transform Your Space?
                </h2>
                <p className="font-poppins font-medium text-sm lg:text-[16px] text-[#0A0A0A]">
                  Talk to our team to explore how we can bring clarity, comfort,
                  and character to your space.
                </p>
              </div>

              {/* Contact Info */}
              <div className="border-t border-b border-[#D4B896] py-6 flex flex-col gap-8">
                {/* Row 1 */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
                  <ContactInfo
                    title="Contact Us"
                    text="+94 11 255 6333"
                    bgColor="#4F4F4F"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        fill="none"
                        stroke="#FFFFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5" />
                      </svg>
                    }
                  />

                  <ContactInfo
                    title="WhatsApp Us"
                    text="+94 76 481 1474"
                    bgColor="#4F4F4F"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        fill="none"
                        stroke="#FFFFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5" />
                      </svg>
                    }
                  />
                </div>

                {/* Row 2 */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
                  <ContactInfo
                    title="Send an Email"
                    text="hello@ultracraft.lk"
                    bgColor="#4F4F4F"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full h-full"
                      >
                        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                      </svg>
                    }
                  />
                  <ContactInfo
                    title="Head Office"
                    text="19A, Visaka Road, Colombo 04"
                    bgColor="#4F4F4F"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        fill="none"
                        stroke="#FFFFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" />
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" />
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col gap-3">
                <h3 className="font-poppins font-semibold text-[20px] text-black">
                  Follow us on social media:
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#604d37] hover:text-[#977C5A] transition-colors"
                  >
                    <FaFacebookF size={24} />
                  </a>
                  <a
                    href="https://instagram.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#604d37] hover:text-[#977C5A] transition-colors"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#604d37] hover:text-[#977C5A] transition-colors"
                  >
                    <FaLinkedinIn size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - CONTACT FORM */}
            <div className="lg:w-1/2 w-full flex flex-col gap-11 rounded-[32px] p-6 lg:p-8 bg-[#FAFAFA]">
              <div className="flex flex-col gap-2">
                <h3 className="font-poppins font-bold text-xl lg:text-[24px] text-black">
                  Send us a message
                </h3>
                <p className="font-poppins font-medium text-sm lg:text-[16px] text-[#0A0A0A]">
                  Feel free to send us any questions, feedback, or suggestions
                  you might have.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <InputField
                    label="Your Name"
                    name="fullName"
                    placeholder="John Doe"
                    error={errors.fullName}
                  />
                  <InputField
                    label="Company"
                    name="company"
                    placeholder="Company Name"
                    error={errors.company}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <InputField
                    label="Email"
                    name="email"
                    placeholder="johndoe@example.com"
                    type="email"
                    error={errors.email}
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    placeholder="+94 77 123 4567"
                    error={errors.phone}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-poppins font-semibold text-[16px] text-black">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us how you would like to collaborate"
                    className={`w-full h-[178px] rounded-[12px] bg-[#FAFAFA] border ${
                      errors.message ? "border-red-600" : "border-[#D4B896]"
                    } text-black placeholder:text-gray-400 outline-none resize-none p-4`}
                  />
                  {errors.message && (
                    <span className="text-red-600 text-sm">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-[48px] rounded-[999px] flex justify-center items-center gap-2 font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(180deg, #C3A37C 0%, #977C5A 100%)",
                  }}
                >
                  Send Message
                </button>

                {status && (
                  <p
                    className={`mt-2 font-poppins text-sm ${
                      status === "Message sent!"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      ) : (
        <div style={{ minHeight: "600px" }} />
      )}
    </div>
  );
};

// Helper InputField
const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  error,
}: any) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="font-poppins font-semibold text-[16px] text-black">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full h-[48px] rounded-[12px] bg-[#FAFAFA] border ${
        error ? "border-red-600" : "border-[#D4B896]"
      } text-black placeholder:text-gray-400 outline-none px-4`}
    />
    {error && <span className="text-red-600 text-sm">{error}</span>}
  </div>
);

// Contact Info Component
const ContactInfo = ({ title, text, icon, bgColor }: any) => (
  <div className="flex flex-row items-center gap-3 w-full">
    <div
      className="w-[48px] h-[48px] flex items-center justify-center rounded-full flex-shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-[24px] h-[24px]">{icon}</div>
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="font-poppins font-semibold text-[20px] leading-[28px]">
        {title}
      </h3>
      <p className="font-poppins font-medium text-[20px] leading-[28px]">
        {text}
      </p>
    </div>
  </div>
);

export default ContactUs;
