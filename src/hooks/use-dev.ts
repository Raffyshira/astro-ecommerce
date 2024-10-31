import { useToast } from "@/hooks/use-toast";

export const useDev = () => {
   const { toast } = useToast();
   const handleNotWork = () => {
      toast({
         title: "Maaf, Masih Tahap Development :)",
         variant: "destructive"
      });
   };
   return { handleNotWork };
};
