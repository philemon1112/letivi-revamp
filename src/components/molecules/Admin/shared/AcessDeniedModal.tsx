import React from "react";

interface AccessDeniedModalProps {
  permission: string;
}

function AccessDeniedModal({ permission }: AccessDeniedModalProps) {
  return (
    <div className="bg-gray-50 p-2 md:p-6 w-full items-center justify-center h-full flex">
      <div className="max-w-md shadow-md rounded-3xl bg-white my-20">
        <div className="p-4 md:p-8">
          <div className="text-center text-na_yellow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 md:w-16 md:h-16 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <p className="mt-4 text-base md:text-xl font-bold text-black">
              You {`don't`} have Access to {permission}
            </p>
            <p className="font-normal text-xs md:text-base mt-3 text-gray-500">
              Want to gain Access ?, Contact the super Admin to give you
              permission to {permission}
            </p>

            <div className="mt-4">{/* TODO: Add button here later */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessDeniedModal;
