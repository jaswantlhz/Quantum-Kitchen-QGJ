import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

const Dialog = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ctx = React.useContext(DialogContext);
  return (
    <div
      onClick={() => ctx?.onOpenChange(true)}
      className={cn("inline-block cursor-pointer", className)}
    >
      {children}
    </div>
  );
};

const emptySubscribe = () => () => {};
function useIsClient() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const DialogContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ctx = React.useContext(DialogContext);
  const isClient = useIsClient();

  if (!ctx?.open || !isClient) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200"
        onClick={() => ctx.onOpenChange(false)}
      />
      {/* Modal Card */}
      <div
        className={cn(
          "relative z-[101] w-full max-w-lg rounded-xl border border-[#393939] bg-[#1c1c1c] p-6 shadow-2xl animate-in zoom-in-95 duration-200 my-auto",
          className
        )}
      >
        <button
          onClick={() => ctx.onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-[#333333] hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props} />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4",
      className
    )}
    {...props}
  />
);

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-xl font-bold tracking-tight text-[#f4f4f4]", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-400", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

const DialogClose = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ctx = React.useContext(DialogContext);
  return (
    <div
      onClick={() => ctx?.onOpenChange(false)}
      className={cn("inline-block cursor-pointer", className)}
    >
      {children}
    </div>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
