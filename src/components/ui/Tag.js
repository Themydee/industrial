export default function Tag({ children, color = "var(--color-red)" }) {
    return (
        <span style={{ 
            fontFamily: "var(--font-mono)", 
            fontSize: 10, 
            fontWeight: 700, 
            letterSpacing: "0.15em", 
            textTransform: "uppercase", 
            color, 
            display: "inline-flex", 
            alignItems: "center", 
            gap: 12,
            marginBottom: 20
        }}>
            <span style={{ 
                display: "block", 
                width: 24, 
                height: 1, 
                background: color, 
                flexShrink: 0 
            }} />
            {children}
        </span>
    );
}
