export const T = {
    black: "#0A0A0A", dark: "#111111", dark2: "#1A1A1A", dark3: "#242424",
    mid: "#3A3A3A", grey: "#6B6B6B", greyLt: "#9A9A9A",
    rule: "#2A2A2A", ruleLt: "#E8E3DB",
    ivory: "#F5F0E8", ivory2: "#EDE8DF",
    white: "#FFFFFF",
    gold: "#C9A84C", gold2: "#B8943A", goldLt: "#FBF6EC",
    red: "#8B1A1A", red2: "#6D1515", redLt: "rgba(139,26,26,0.08)",
};

export const F = { 
    display: "'Cormorant Garamond', Georgia, serif", 
    body: "'Inter', system-ui, sans-serif", 
    mono: "'Space Mono', monospace" 
};

export const TIERS = [
    {
        id: "foundation", name: "Foundation", tagline: "Access the knowledge. Join the conversation.", price: "Free", sub: "Always free", annual: null, color: T.dark, badge: null, cta: "Explore Content",
        features: ["Public YT episodes", "Weekly notifications", "WhatsApp Broadcast", "Monthly newsletter", "Resource library", "Quarterly webinars", "Directory listing"]
    },
    {
        id: "builder", name: "Builder", tagline: "Build your knowledge. Build your network.", price: "$15", sub: "per month · ₦21,000", annual: "$150 / ₦210,000 per year (save 2 months)", color: T.dark, badge: null, cta: "Join as Builder",
        features: ["Foundation features +", "Transcripts & show notes", "Exclusive member content", "Private WhatsApp group", "Monthly reading list", "20% off masterclasses", "Quarterly live Q&A", "Policy analysis library"]
    },
    {
        id: "catalyst", name: "Catalyst", tagline: "Accelerate your impact. Access real opportunity.", price: "$75", sub: "per month · ₦105,000", annual: "$750 / ₦1,050,000 per year (save 2 months)", color: T.gold2, badge: "Most Popular", cta: "Join as Catalyst",
        features: ["Builder features +", "Monthly Masterclass", "Deal Board (funding/tenders)", "Monthly sector digest", "Priority directory listing", "1:1 advisory call", "Vetted Peer Circle", "Virtual roundtables", "Membership certificate"]
    },
    {
        id: "vanguard", name: "Vanguard", tagline: "Lead the movement. Shape the agenda.", price: "$500", sub: "per month · ₦700,000", annual: "$5,000 / ₦7,000,000 upfront (save 2 months)", color: T.red, badge: "50 places only", cta: "Apply for Vanguard",
        features: ["Catalyst features +", "1:1 with Prof. Banji", "Vanguard Patron status", "Vanguard WhatsApp access", "Annual Vanguard Dinner", "Policy co-authorship", "Speaking/panel priority", "Network referrals", "Episode input & direction", "Bespoke intelligence report"]
    },
];

export const OFFERINGS = [
    { ico: "🎓", title: "Masterclasses", desc: "Monthly expert sessions on agro-industrial development and policy.", price: "From $40 / ₦56,000" },
    { ico: "📅", title: "Half-Day Workshops", desc: "Interactive deep-dives with workbooks and breakout groups.", price: "$120–$200 / ₦168,000–₦280,000" },
    { ico: "🏛️", title: "In-Person Summits", desc: "Bi-annual partnership and networking events in Lagos & Abuja.", price: "$300–$600 / ₦420,000–₦840,000" },
    { ico: "🤝", title: "Peer Circles", desc: "Vetted accountability groups matched by sector and geography.", price: "Catalyst tier and above" },
    { ico: "📋", title: "Deal Board", desc: "Curated funding calls, grants, and investment leads.", price: "Catalyst tier and above" },
    { ico: "📖", title: "Research & Policy Briefs", desc: "Sector intelligence and the annual State of African Industrialisation Report.", price: "From $500 per brief" },
];

export const TESTIMONIALS = [
    { quote: "Prof. Banji's work sits at the intersection of Africa's food challenges and industrial solutions. This community is long over due.", name: "Development Finance Professional", org: "Pan-African Institution" },
    { quote: "The depth of knowledge is unmatched. A single Catalyst circle connection saved us months on our fundraising timeline.", name: "Agribusiness Founder", org: "Ogun State, Nigeria" },
    { quote: "What is being built here is the practitioner version of development—the conversations that actually move things.", name: "Senior Policy Adviser", org: "West African Government" },
];

export const FAQS = [
    { q: "Who is this community for?", a: "Anyone serious about Africa's industrial future — farmers, agripreneurs, investors, policymakers, development finance professionals, academics, diaspora professionals and corporate leaders. If what happens to Africa's agricultural and industrial economy matters to you personally or professionally, you belong here." },
    { q: "What makes this different from other networks?", a: "Most communities are peer networks. This one is anchored in four decades of institutional knowledge — from the UN to the AfDB — combined with structured programming (masterclasses, deal boards, peer circles) that creates real outcomes for members, not just conversations." },
    { q: "How does the Vanguard tier work?", a: "Vanguard is strictly limited to 50 members. Applications are reviewed personally. Once accepted, you commit to $500 per month or $5,000 per year upfront (2 months free). You receive a direct annual session with Prof. Banji, the exclusive Vanguard WhatsApp, invitation to the annual Vanguard Dinner, and priority on all speaking and publishing opportunities." },
    { q: "How does payment work?", a: "Nigerian members pay in Naira via Paystack. International members pay in USD via Stripe. Annual plans are available at all paid tiers. After you submit the community interest form, our team sends your payment link within 48 hours." },
    { q: "Is the questionnaire required to join?", a: "Yes. The community interest form helps us match you to the right tier, connect you with the right peer circle and keep the community genuinely curated. We ask all prospective members to complete it before activating any paid membership." },
    { q: "Can I upgrade my membership later?", a: "Yes — you can upgrade at any time. Many members start on Foundation or Builder and move to Catalyst once they experience the depth of the community. Vanguard applications are reviewed on a rolling basis subject to the 50-member cap." },
    { q: "What currency is pricing shown in?", a: "All prices are in USD and their Naira equivalent at ₦1,400/$1. Naira pricing is fixed and reviewed quarterly rather than floating monthly with exchange rates." },
];

export const STATES = ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT — Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"];
