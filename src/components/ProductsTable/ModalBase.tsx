import React from "react";

interface ModalBaseProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalBase: React.FC<ModalBaseProps> = ({ title, children }) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-96 rounded-lg border border-white bg-black p-6">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
