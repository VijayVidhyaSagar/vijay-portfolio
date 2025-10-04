import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const inputVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  isTextArea?: boolean;
  delay: number;
  rows?: number; // Add rows to the interface
}

const FormInput: React.FC<FormInputProps> = React.memo(({ isTextArea, delay, ...props }) => {
  const commonClasses = "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  
  const InputElement = isTextArea 
    ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={commonClasses}
        />
      )
    : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={commonClasses}
        />
      );

  return (
    <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ delay }}>
      <label htmlFor={props.id} className="sr-only">{props.placeholder}</label>
      {InputElement}
    </motion.div>
  );
});

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [captchaInput, setCaptchaInput] = useState('');

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: num1 + num2 });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setStatus('error');
      setResponseMessage('Incorrect captcha answer. Please try again.');
      generateCaptcha(); // Generate a new question
      setCaptchaInput(''); // Clear the input
      return;
    }

    setStatus('loading');
    setResponseMessage('');

    // --- Google Apps Script Integration ---
    // IMPORTANT: Replace with your actual Google Apps Script Web App URL
    /*const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; */
    
    // The URL is stored in an environment variable for better configuration management.
    // const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    // const SECRET_TOKEN = import.meta.env.VITE_CONTACT_SCT_TOKEN;
    const scriptURL = "https://script.google.com/macros/s/AKfycbyvWIdeKse_55VlpDoc8oIMCENGgmyy0_Grl2nZuwAH-W5uTgRfeEsbY4OZrplWx1rs/exec";
    const SECRET_TOKEN = "Vj@py5Git4Cop3%SnowF3$Td3Ai25x";


    const form = e.target as HTMLFormElement;
    const formDataToSend = new FormData(form);
    formDataToSend.append('secret_token', SECRET_TOKEN);
    
    try {
      // We use 'no-cors' mode here. This means we can't read the response,
      // but it helps bypass CORS issues with Google Apps Script.
      await fetch(scriptURL, { 
        method: 'POST',
        mode: 'no-cors', // Important for CORS
        body: formDataToSend,
      });

      // Since we can't read the response in 'no-cors' mode,
      // we optimistically assume success.
      setStatus('success');
      setResponseMessage('Your message has been sent successfully! I will be in touch within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      setCaptchaInput(''); // Clear captcha input
      generateCaptcha(); // Generate a new captcha for the next submission

    } catch (error) {
      setStatus('error');
      setResponseMessage('An unexpected error occurred. Please try again later.');
      console.error('Contact form submission error:', error);
    }
    // --- End of Google Apps Script Integration ---
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Contact & Collaboration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information Section */}
        <motion.div
          className="flex flex-col space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Start a Professional Engagement</h2>
  
  <p className="text-lg text-gray-700 dark:text-gray-300">
    Whether you are an organization looking to optimize current infrastructure, or a project lead seeking specialized expertise, I am prepared to discuss the technical and strategic requirements of your next engagement.
  </p>

  <div className="p-4 border-l-4 border-blue-500 bg-blue-500/10 dark:bg-blue-900/20 rounded-r-lg">
      <p className="text-gray-600 dark:text-gray-400 font-medium">
          Working Model: Currently based in India and operating full-time remote across global time zones.
      </p>
  </div>

  <p className="text-gray-600 dark:text-gray-400">
    Please use the form to provide a detailed scope or a specific job reference number. I guarantee a timely and professional response.
  </p>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Send Me a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              type="text" id="name" name="name" placeholder="Your Name"
              value={formData.name} onChange={handleChange} required delay={0}
            />
            <FormInput
              type="email" id="email" name="email" placeholder="Your Email"
              value={formData.email} onChange={handleChange} required delay={0.1}
            />
            <FormInput
              type="text" id="subject" name="subject" placeholder="Subject"
              value={formData.subject} onChange={handleChange} required delay={0.2}
            />
            <FormInput
              isTextArea={true}
              id="message" name="message" placeholder="Your Message"
              rows={5} value={formData.message} onChange={handleChange} required delay={0.3}
            />
            <FormInput
              type="number"
              id="captcha"
              name="captcha"
              placeholder={`Anti-Spam: What is ${captcha.num1} + ${captcha.num2}?`}
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
              delay={0.4}
              autoComplete="off"
            />
            <motion.button
              type="submit"
              className={`w-full py-3 px-6 rounded-md text-white font-semibold transition-all duration-300
                ${status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </motion.button>

            {status !== 'idle' && responseMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center p-3 rounded-md text-sm ${
                  status === 'success'
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                }`}
              >
                {status === 'success' ? (
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                )}
                {responseMessage}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
