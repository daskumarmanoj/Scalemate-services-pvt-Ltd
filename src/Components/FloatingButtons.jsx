"use client";
import React, { useState } from "react";
import { Phone, MessageCircle, X, Send } from "lucide-react";

const FloatingButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(
    "Hello! I'd like to know more about your services."
  );

  const phone = "919876543210";

  const sendWhatsApp = () => {
    const url = `https://wa.me/${phone}${
      message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""
    }`;
    window.open(url, "_blank");
    setShowModal(false);
  };

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">

        {/* Call Button */}
        <div className="relative group flex items-center">
          <span className="absolute right-14 bg-white text-gray-800 text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call us
          </span>
          <a
            href={`tel:+${phone}`}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 animate-blink"
          >
            <Phone size={20} />
          </a>
        </div>

        {/* WhatsApp Button */}
        <div className="relative group flex items-center">
          <span className="absolute right-14 bg-white text-gray-800 text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp us
          </span>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 animate-blink-blue"
          >
            <MessageCircle size={20} />
          </button>
        </div>

      </div>

      {/* WhatsApp Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 mx-4">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Send WhatsApp Message</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Phone Number */}
            <p className="text-xs text-gray-400 mb-3">To: +91 98765 43210</p>

            {/* Message Input */}
            <textarea
              className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 h-24 text-gray-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />

            {/* Modal Actions */}
            <div className="flex gap-2 justify-end mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendWhatsApp}
                className="text-sm px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1.5 transition-colors"
              >
                <Send size={13} />
                Open WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;