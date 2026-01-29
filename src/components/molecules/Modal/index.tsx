import {
  Dialog,
  DialogBackdrop,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IModalProps } from "./modal.types";
import Typography from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { X } from "lucide-react"; // Import X icon from lucide-react

const Modal = ({
  show,
  body,
  overlay,
  size = "lg",
  title,
  children,
  onAction,
  actionButton,
  cancelButton,
  onCloseAction,
  actionLoading = false,
  actionDisabled = false,
  cancelDisabled = false,
  actionButtonVariant = "primary",
  className = "",
  showCloseIcon = false, // Default to false for backwards compatibility
}: IModalProps) => {
  const completeButtonRef = useRef(null);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] overflow-y-auto"
        onClose={onCloseAction}
        initialFocus={completeButtonRef}
      >
        <div className="min-h-screen px-4 text-center">
          <DialogBackdrop
            className={`fixed inset-0 backdrop-blur-sm ${
              overlay === "dark" && "bg-[#000000ef]"
            } backdrop-filter backdrop-brightness-50`}
          />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`
                my-8 inline-block w-full max-w-${size} transform overflow-hidden
                rounded-2xl border border-gray-200 bg-white p-6
                text-left align-middle shadow-xl transition-all relative
                ${className}
              `}
            >
              {showCloseIcon && (
                <button
                  onClick={onCloseAction}
                  className="absolute top-0 right-2 p-1 z-10 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              )}

              <DialogTitle
                as="h3"
                className="flex flex-col leading-6 text-gray-900"
              >
                <div className="flex w-full flex-row items-start justify-between">
                  <div className={`${showCloseIcon ? "ml-12" : ""}`}>
                    {title}
                  </div>
                </div>
              </DialogTitle>

              <div className={`w-full`}>{children || body}</div>

              {(cancelButton || actionButton) && (
                <div className="grid grid-cols-2 w-full justify-between items-stretch gap-x-[12px] h-[44px]">
                  {cancelButton && (
                    <Button
                      type="button"
                      variant="white"
                      disabled={cancelDisabled}
                      onClick={onCloseAction}
                      className={`h-[44px] ${!actionButton && "col-span-2"}`}
                    >
                      <Typography weight={500}>{cancelButton}</Typography>
                    </Button>
                  )}

                  {actionButton && (
                    <Button
                      className={`h-[44px] ${!cancelButton && "col-span-2"}`}
                      disabled={actionDisabled}
                      onClick={onAction}
                      loading={actionLoading}
                      variant={actionButtonVariant}
                    >
                      <Typography weight={500}>
                        {actionButton} {actionLoading && "loading"}
                      </Typography>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
