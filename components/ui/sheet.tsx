import * as React from "react";
import { Dialog } from "@headlessui/react";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface SheetContentProps {
  children: React.ReactNode;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick function
  asChild?: boolean; // Add asChild as an optional prop
}

export const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-end">
        <Dialog.Panel className="w-full max-w-xs bg-white p-4">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export const SheetContent: React.FC<SheetContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick}>
      {children}
    </div>
  );
};
