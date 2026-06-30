import { SignUp } from "@clerk/nextjs";
import { T } from "@/lib/constants";

export default function Page() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: T.white }}>
      <SignUp />
    </div>
  );
}
