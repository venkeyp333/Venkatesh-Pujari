import React, { useState } from 'react'; // Import useState for managing modal visibility
import { useSelector } from "react-redux"; // Access dark mode state from Redux
import { Formik, Field, Form, ErrorMessage } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation
import logoImg from "../assets/img/Contact_Us-removebg-preview.png"; // Import the logo
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import emailjs from 'emailjs-com'; // Import EmailJS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import close icon
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toasts

function Contact() {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state from Redux
  const [isModalOpen, setIsModalOpen] = useState(true); // State for modal visibility

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid').required('Phone number is required'),
    message: Yup.string().required('Message is required'),
  });

  const sendEmail = (values, { setSubmitting, resetForm, setStatus }) => {
    const emailData = {
      to_name: 'Venkatesh Pujari',
      from_name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setStatus({ error: 'Email service is not configured. Please set env variables.' });
      toast.error('Contact service is not configured.');
      setSubmitting(false);
      return;
    }

    emailjs.send(serviceID, templateID, emailData, publicKey)
      .then(() => {
        setStatus({ success: 'Your message has been sent successfully!' });
        resetForm();
        toast.success('Your message has been sent successfully!'); // Show toast notification
        closeModal(); // Close modal after successful submission
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setStatus({ error: 'Failed to send your message. Please try again later.' });
        toast.error('Failed to send your message. Please try again later.'); // Show error toast
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`container mx-auto px-4 flex justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`} id="contact">
      {isModalOpen && (
        <div className={`w-full lg:w-[40%] md:w-[60%] sm:w-[80%] p-8 shadow-2xl rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} fixed top-1/2 transform -translate-y-1/2 transition-transform duration-300`}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                {/* Close Button with Icon */}
                <button 
                  onClick={closeModal} 
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 hover:bg-red-500 hover:text-white ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  title="Close"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" /> {/* Close icon */}
                </button>
                
                {/* Logo at the top of the form */}
                <div className="text-center mb-6">
                  <img src={logoImg} alt="Logo" className="w-24 h-auto mx-auto" />
                </div>
                <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Get In Touch</h2>

                {/* Formik Form */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={sendEmail}
                >
                  {({ isSubmitting, status }) => (
                    <Form>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <Field
                            name="firstName"
                            placeholder="First Name"
                            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-400' : 'border-gray-300 focus:ring-indigo-500'}`}
                          />
                          <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Last Name */}
                        <div>
                          <Field
                            name="lastName"
                            placeholder="Last Name"
                            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-400' : 'border-gray-300 focus:ring-indigo-500'}`}
                          />
                          <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Email */}
                        <div>
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-400' : 'border-gray-300 focus:ring-indigo-500'}`}
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Phone */}
                        <div>
                          <Field
                            name="phone"
                            placeholder="Phone No."
                            className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-400' : 'border-gray-300 focus:ring-indigo-500'}`}
                          />
                          <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="mt-4">
                        <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}><strong>Feedback</strong></label>
                        <Field
                          name="message"
                          as="textarea"
                          rows="6"
                          placeholder="Your feedback here..."
                          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-indigo-400' : 'border-gray-300 focus:ring-indigo-500'}`}
                        />
                        <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className={`mt-6 w-full py-3 font-bold rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Feedback'}
                      </button>

                      {/* Success/Error Messages */}
                      {status && status.success && <div className="mt-4 text-green-500">{status.success}</div>}
                      {status && status.error && <div className="mt-4 text-red-500">{status.error}</div>}
                    </Form>
                  )}
                </Formik>
              </div>
            }
          </TrackVisibility>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Contact;
