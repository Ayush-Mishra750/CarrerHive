"use client";

import { useFormStatus } from "react-dom";

import { Heart, Loader2 } from "lucide-react";
import { Button } from "../button";
import { useState } from "react";



export function GeneralSubmitButton({
  text,
  icon,

  width = "w-full",
}: {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  width?: string;
}) {
  // const { pending } = useFormStatus();
  // const [apply,isApply]=useState(false);
 const [applied, setApplied] = useState(false);
  const [pending, setPending] = useState(false);

  const handleApply = () => {
    setPending(true);

    setTimeout(() => {
      setPending(false);
      setApplied(true);
      alert("Applied Successfully!");
    }, 1200);
  };
  return (
     <Button
      type="submit"
      disabled={pending}
      onClick={handleApply}
      className={`${width} ${
        applied ? "bg-green-600 hover:bg-green-700 text-white" : "text-primary"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span className="cursor-pointer text-white">
            {applied ? "Applied" : text}
          </span>
        </>
      )}
    </Button>
  );
}

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {

  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      disabled={pending}
      type="submit"
      className="flex items-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={`size-4 transition-colors ${
              savedJob ? "fill-current text-red-500" : ""
            }`}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
  
}