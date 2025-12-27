import React from 'react';
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logoImg from "../assets/img/Contact_Us-removebg-preview.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Using hard-coded EmailJS keys as requested
  const SERVICE_ID = 'service_krd6n9a';
  const TEMPLATE_ID = 'template_gxwuc0e';
  const PUBLIC_KEY = '5V_g0JFaNPlm8BVtM';

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required('First name is required'),
    lastName: Yup.string().trim().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
      .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Phone number is not valid')
      .required('Phone number is required'),
    message: Yup.string().min(10, 'Please enter at least 10 characters').required('Message is required'),
  });

  const sendEmail = (values, { setSubmitting, resetForm, setStatus }) => {
    const emailData = {
      to_name: 'Venkatesh Pujari',
      from_name: `${values.firstName} ${values.lastName}`,
      reply_to: values.email,
      phone: values.phone,
      message: values.message,
    };

    const serviceID = SERVICE_ID;
    const templateID = TEMPLATE_ID;
    const publicKey = PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      const hint = 'Create a `.env.local` in the project root with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` (no quotes), then restart the dev server.';
      setStatus({ error: `Email service is not configured. ${hint}` });
      toast.error('Contact service is not configured. Check .env.local');
      setSubmitting(false);
      return;
    }

    emailjs.send(serviceID, templateID, emailData, publicKey)
      .then(() => {
        setStatus({ success: 'Your message has been sent successfully!' });
        resetForm();
        toast.success('Your message has been sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setStatus({ error: 'Failed to send your message. Please try again later.' });
        toast.error('Failed to send your message.');
      })
      .finally(() => setSubmitting(false));
  };

  const contactDetails = [
    { icon: faEnvelope, label: 'Email', value: 'venkateshpujari333@gmail.com', href: 'mailto:venkateshpujari333@gmail.com' },
    { icon: faPhone, label: 'Phone', value: '9008439330', href: 'tel:9008439330' },
  ];

  const socialLinks = [
    { icon: faLinkedin, href: '#', label: 'LinkedIn' },
    { icon: faGithub, href: '#', label: 'GitHub' },
    { icon: faTwitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section id="contact" className={`py-12 px-4 md:px-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto max-w-6xl">
        <TrackVisibility>
          {({ isVisible }) => (
            <div className={`${isVisible ? 'animate__animated animate__fadeInUp' : ''} grid gap-8 md:grid-cols-2 items-start`}> 

              {/* Left: Contact information card */}
              <div className={`rounded-lg p-8 shadow-lg transform transition hover:scale-[1.01] ${darkMode ? 'bg-gradient-to-br from-indigo-800 to-purple-800 text-white' : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'}`}>
                <img src={logoImg} alt="Logo" className="w-20 h-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Hi — I'm a Software Developer</h3>
                <p className="mb-6 opacity-90">I'm actively seeking new opportunities and available for hire. Message me here or contact me directly at <a href="mailto:venkateshpujari333@gmail.com" className="underline">venkateshpujari333@gmail.com</a> or <a href="tel:9008439330" className="underline">9008439330</a>.</p>

                <ul className="space-y-4 mb-6">
                  {contactDetails.map((item) => (
                    <li key={item.label} className="flex items-start gap-3 group">
                      <span className="text-xl w-10 h-10 flex items-center justify-center rounded-md bg-white/10 transition-colors group-hover:bg-white/20">
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <div>
                        <div className="text-sm opacity-90">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="font-medium hover:underline">{item.value}</a>
                        ) : (
                          <div className="font-medium">{item.value}</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition transform hover:scale-110 hover:bg-white/20">
                      <FontAwesomeIcon icon={s.icon} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: Contact form */}
              <div className={`rounded-lg p-8 shadow-lg ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
                <h3 className="text-2xl font-semibold mb-1">Send a message</h3>
                <p className="mb-6 text-sm opacity-80">Or email me directly at <a href="mailto:venkateshpujari333@gmail.com" className="underline">venkateshpujari333@gmail.com</a></p>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={sendEmail}>
                  {({ isSubmitting, status }) => (
                    <Form aria-live="polite">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label className="sr-only" htmlFor="firstName">First name</label>
                        <Field id="firstName" name="firstName" placeholder="First name" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent" />
                        <label className="sr-only" htmlFor="lastName">Last name</label>
                        <Field id="lastName" name="lastName" placeholder="Last name" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent" />

                        <label className="sr-only" htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email" placeholder="Email" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent col-span-1 sm:col-span-1" />

                        <label className="sr-only" htmlFor="phone">Phone</label>
                        <Field id="phone" name="phone" placeholder="Phone" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent" />
                      </div>

                      <div className="mt-4">
                        <label className="sr-only" htmlFor="message">Message</label>
                        <Field id="message" name="message" as="textarea" rows="5" placeholder="How can I help?" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent" />
                        <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
                      </div>

                      <div className="mt-5 flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow transition transform hover:-translate-y-0.5">
                          <FontAwesomeIcon icon={faPaperPlane} />
                          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                        </button>

                        {status && status.success && <div className="text-green-400 font-medium">{status.success}</div>}
                        {status && status.error && <div className="text-red-400 font-medium">{status.error}</div>}
                      </div>
                    </Form>
                  )}
                </Formik>

                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
              </div>

            </div>
          )}
        </TrackVisibility>
      </div>
    </section>
  );
}

export default Contact;
