import React, { useEffect, useRef } from "react";

const TermsModal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Terms and Conditions
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="prose max-w-none">
            <h4>1. Introduction</h4>
            <p>
              Welcome to our platform. These terms and conditions outline the
              rules and regulations for the use of our Website.
            </p>

            <h4>2. License to Use</h4>
            <p>
              Unless otherwise stated, we own the intellectual property rights
              for all material on our Website. All intellectual property rights
              are reserved.
            </p>

            <h4>3. Restrictions</h4>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>publishing any Website material in any other media</li>
              <li>
                selling, sublicensing and/or otherwise commercializing any
                Website material
              </li>
              <li>publicly performing and/or showing any Website material</li>
              <li>
                using this Website in any way that is or may be damaging to this
                Website
              </li>
              <li>
                using this Website in any way that impacts user access to this
                Website
              </li>
            </ul>

            <h4>4. Privacy</h4>
            <p>
              Please refer to our Privacy Policy for information about how we
              collect, use, and share your information.
            </p>

            <h4>5. Limitation of Liability</h4>
            <p>
              In no event shall we be liable for any special, direct, indirect,
              consequential, or incidental damages.
            </p>
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
