import { useToast } from "@/hooks/use-toast";
import {
   Toast,
   ToastClose,
   ToastDescription,
   ToastProvider,
   ToastTitle,
   ToastViewport
} from "@/components/ui/toast";
import { Check, Info, Ban, CircleAlert } from "lucide-react";

const variantIconMap = {
   default: null,
   info: Info,
   success: Check,
   destructive: Ban,
   warning: CircleAlert
};

type IconProps = React.ComponentProps<typeof Info>;

const ToastIcon = ({
   variantIcon,
   ...props
}: { variantIcon: keyof typeof variantIconMap } & IconProps) => {
   const Icon = variantIconMap[variantIcon] || variantIconMap.default;
   return <Icon {...props} />;
};

export function Toaster() {
   const { toasts } = useToast();

   return (
      <ToastProvider>
         {toasts.map(function ({
            id,
            title,
            description,
            action,
            variantIcon,
            ...props
         }) {
            return (
               <Toast key={id} {...props}>
                  <div className="flex items-center gap-3">
                     <ToastIcon
                        variantIcon={variantIcon as keyof typeof variantIconMap}
                        className={`h-5 w-5 ${
                           variantIcon === "info"
                              ? "text-white"
                              : variantIcon === "success"
                              ? "text-white"
                              : variantIcon === "destructive"
                              ? "text-white"
                              : variantIcon === "warning"
                              ? "text-black"
                              : "text-gray-500"
                        }`}
                     />
                     <div>
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && (
                           <ToastDescription>{description}</ToastDescription>
                        )}
                     </div>
                  </div>
                  {action}
                  <ToastClose />
               </Toast>
            );
         })}
         <ToastViewport />
      </ToastProvider>
   );
}
