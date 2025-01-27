"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthSignIn from "../auth-sign-in";
interface AuthModalProps {
  className?: string;
  trigger?: React.ReactNode;
}

export default function AuthModal({ className, trigger }: AuthModalProps) {
  return (
    <Dialog>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={`${className}`}>
        <DialogTitle className="sr-only">Authentication</DialogTitle>
        <DialogDescription className="sr-only">Desc Auth</DialogDescription>
        <AuthSignIn />
      </DialogContent>
    </Dialog>
  );
}
