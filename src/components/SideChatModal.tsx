import { useState } from "react";
import { CalcCals } from "./CalcCals";


export const SideChatModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="">
            {/* Button to Open Modal */}
            <button
                type="button"
                onClick={toggleModal}
                className="p-5 fixed bottom-20 right-10 rounded-full primary-btn"
            >
                Calc
            </button>

            {/* Modal */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-slate-200 dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-[80] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="chat-modal-title"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center py-3 px-4 border-b  dark:border-neutral-700">
                    <h3 id="chat-modal-title" className="font-bold text-gray-800 dark:text-white">
                        Quick Calc
                    </h3>
                    <button
                        type="button"
                        onClick={toggleModal}
                        className="tetiary-btn rounded-full p-2"
                        aria-label="Close"
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 overflow-y-auto h-full">
                    <CalcCals />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700">
                    <button
                        type="button"
                        onClick={toggleModal}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
