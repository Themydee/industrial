import { T } from "@/lib/constants";

export default function Tag({ children, color = T.primary }) {
  return (
    <span style={{ 
      fontSize: 12, 
      fontWeight: 500, 
      color, 
      background: `${color}15`, // Light transparent background
      padding: "4px 12px",
      borderRadius: "100px",
      display: "inline-flex", 
      alignItems: "center"
    }}>
      {children}
    </span>
  );
}
