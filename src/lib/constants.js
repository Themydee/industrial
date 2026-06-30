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
        id: "foundation", name: "Foundation", tagline: "Access the knowledge. Join the conversation.", price: "Free", sub: "Always free", annual: null, color: T.dark, badge: null, cta: "Join Free",
        features: ["All public YouTube episodes", "Weekly episode notifications", "Community WhatsApp broadcast", "Monthly newsletter & insights", "Free resource library", "Quarterly free webinar", "Community directory listing"]
    },
    {
        id: "builder", name: "Builder", tagline: "Build your knowledge. Build your network.", price: "$15", sub: "per month · ₦21,000", annual: "$150 / ₦210,000 per year (save 2 months)", color: T.dark, badge: null, cta: "Join as Builder",
        features: ["Everything in Foundation", "Episode transcripts & show notes", "Monthly exclusive members-only content", "Private Builder WhatsApp group", "Prof. Banji's monthly reading list", "20% off all masterclasses", "Quarterly live Q&A with Prof. Banji", "Exclusive policy analysis library"]
    },
    {
        id: "catalyst", name: "Catalyst", tagline: "Accelerate your impact. Access real opportunity.", price: "$75", sub: "per month · ₦105,000", annual: "$750 / ₦1,050,000 per year (save 2 months)", color: T.gold2, badge: "Most Popular", cta: "Join as Catalyst",
        features: ["Everything in Builder", "Monthly 90-min Catalyst Masterclass", "Catalyst Deal Board — funding & tenders", "Monthly sector intelligence digest", "Priority Professional Directory listing", "Bi-annual 1:1 advisory call with mentor", "Catalyst Peer Circle — 8–12 vetted members", "Closed-door virtual roundtables", "Annual Certificate of Membership"]
    },
    {
        id: "vanguard", name: "Vanguard", tagline: "Lead the movement. Shape the agenda.", price: "$500", sub: "per month · ₦700,000", annual: "$5,000 / ₦7,000,000 upfront (save 2 months)", color: T.red, badge: "50 places only", cta: "Apply for Vanguard",
        features: ["Everything in Catalyst", "Annual 60-min 1:1 with Prof. Banji personally", "Named Vanguard Patron on all platforms", "Exclusive Vanguard WhatsApp with Prof. Banji", "Invitation to annual Vanguard Dinner", "Co-authorship on publications & policy papers", "First right on all speaking & panel slots", "Direct referral to Prof. Banji's network", "Input into episode topics & direction", "Annual bespoke sector intelligence report"]
    },
];

export const OFFERINGS = [
    { ico: "🎓", title: "Masterclasses", desc: "Monthly 90-minute expert sessions on agro-industrial development, development finance and industrial policy.", price: "From $40 / ₦56,000" },
    { ico: "📅", title: "Half-Day Workshops", desc: "Quarterly deep-dives running 4–5 hours with workbooks and breakout groups, co-designed with practitioners.", price: "$120–$200 / ₦168,000–₦280,000" },
    { ico: "🏛️", title: "In-Person Summits", desc: "Bi-annual summits in Lagos and Abuja. The rooms where partnerships and policy decisions get made.", price: "$300–$600 / ₦420,000–₦840,000" },
    { ico: "🤝", title: "Peer Circles", desc: "Vetted accountability groups of 8–12 professionals, matched by sector and geography.", price: "Catalyst tier and above" },
    { ico: "📋", title: "Deal Board", desc: "Curated funding calls, grants, agro-processing tenders and investment leads — filtered monthly.", price: "Catalyst tier and above" },
    { ico: "📖", title: "Research & Policy Briefs", desc: "Commissioned briefs, sector intelligence, and the annual State of African Industrialisation Report.", price: "From $500 per brief" },
];

export const TESTIMONIALS = [
    { quote: "Prof. Banji's work sits at the exact intersection where Africa's food security challenges meet the industrial policy solutions that have transformed other economies. This community is long overdue.", name: "Development Finance Professional", org: "Pan-African Institution" },
    { quote: "The depth of knowledge here is unlike anything available on the continent. One conversation in the Catalyst circle opened a partnership that took months off our fundraising timeline.", name: "Agribusiness Founder", org: "Ogun State, Nigeria" },
    { quote: "I have attended summits on African industrialisation for twenty years. What Triple O is building here is the practitioner version — the conversations that actually move things.", name: "Senior Policy Adviser", org: "West African Government" },
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
