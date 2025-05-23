import { useEffect } from "react";
import { auth, firebaseConfig } from "@/config/firebase/config";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: { client_id: string; callback: (response: { credential: string | null | undefined }) => void }) => void;
          renderButton: (parent: HTMLElement | null, options: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const GoogleSignIn: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  useEffect(() => {
    if (!window.google || auth.currentUser) return;

    window.google.accounts.id.initialize({
      client_id: firebaseConfig.webClientId,
      callback: handleGoogleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "rectangular",
        logo_alignment: "left",
      }
    );

    // Optional: prompt one-tap sign in
    window.google.accounts.id.prompt();
  }, []);

  const handleGoogleCredentialResponse = async (response: { credential: string | null | undefined; }) => {
    try {
      const credential = GoogleAuthProvider.credential(response.credential);
      const userCredential = await signInWithCredential(auth, credential);
      toast.success(`Welcome ${userCredential.user.displayName}!`);
    } catch (error) {
      toast.error("Error signing in with Google");
      console.error("Google Sign-In Error:", error);
    }
  };

  return <div id="g_id_signin" className={cn(className,"!w-full flex justify-center items-center")} {...props}></div>;
};

export default GoogleSignIn;
