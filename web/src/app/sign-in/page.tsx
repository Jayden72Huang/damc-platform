import { Suspense } from "react";
import { SignInClient } from "./SignInClient";

export const dynamic = "force-dynamic";

export default function SignInPage(): React.ReactNode {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInClient />
    </Suspense>
  );
}

function SignInFallback(): React.ReactNode {
  return (
    <div className="atelier-root atelier-signin-root">
      <main className="atelier-signin">
        <div className="atelier-signin-card" />
      </main>
    </div>
  );
}
