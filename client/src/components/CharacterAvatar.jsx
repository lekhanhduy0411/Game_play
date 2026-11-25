export const SPEAKER_META = {
  SYSTEM: {
    name: "CIPHER TERMINAL // SYS-OS",
    role: "Trợ lý Pháp y Số",
    accent: "#06B6D4",
    borderClass: "border-[#06B6D4]/55 shadow-[0_0_16px_rgba(6,182,212,0.22)]",
    badgeClass: "bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/40",
  },
  KHOI: {
    name: "TS. LÊ MINH KHÔI",
    role: "Kiến trúc sư trưởng EREBUS-9",
    accent: "#10B981",
    borderClass: "border-[#10B981]/55 shadow-[0_0_16px_rgba(16,185,129,0.22)]",
    badgeClass: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40",
  },
  VY: {
    name: "TRẦN KHÁNH VY",
    role: "Kỹ sư Hệ thống — Nội ứng",
    accent: "#F59E0B",
    borderClass: "border-[#F59E0B]/60 shadow-[0_0_16px_rgba(245,158,11,0.24)]",
    badgeClass: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/45",
  },
  KHOA: {
    name: "TRẦN ĐĂNG KHOA",
    role: "CEO AetherCorp // Nghi phạm tối cao",
    accent: "#F43F5E",
    borderClass: "border-[#F43F5E]/65 shadow-[0_0_18px_rgba(244,63,94,0.28)]",
    badgeClass: "bg-[#F43F5E]/15 text-[#F43F5E] border-[#F43F5E]/45",
  },
  EREBUS: {
    name: "LÕI AI EREBUS-9",
    role: "Thực thể Phòng thủ Tự trị",
    accent: "#F43F5E",
    borderClass: "border-[#F43F5E]/75 shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    badgeClass: "bg-[#F43F5E]/20 text-[#F43F5E] border-[#F43F5E]/55",
  },
};

export default function CharacterAvatar({ speaker = "SYSTEM", size = 48 }) {
  const meta = SPEAKER_META[speaker] || SPEAKER_META.SYSTEM;
  const color = meta.accent;

  return (
    <div
      className={`relative shrink-0 rounded-lg bg-[#060A11]/95 border ${meta.borderClass} overflow-hidden flex items-center justify-center`}
      style={{ width: size, height: size }}
      aria-label={meta.name}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`noir-glow-${speaker}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill={`url(#noir-glow-${speaker})`} />
        <path
          d="M8 20 V8 H20 M80 8 H92 V20 M92 80 V92 H80 M20 92 H8 V80"
          stroke={color}
          strokeWidth="1.8"
          strokeOpacity="0.7"
        />

        {speaker === "KHOI" && (
          <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 94 C22 76 34 70 50 70 C66 70 78 76 82 94" strokeWidth="1.9" fill={color} fillOpacity="0.08" />
            <path d="M40 70 L50 86 L60 70" strokeWidth="1.5" />
            <path d="M34 44 C34 27 66 27 66 44 C66 57 59 66 50 66 C41 66 34 57 34 44 Z" strokeWidth="2" fill={color} fillOpacity="0.1" />
            <path d="M33 41 C32 24 44 18 54 20 C64 22 68 30 67 42" strokeWidth="1.6" />
            <rect x="37" y="42" width="11" height="7" rx="1.5" strokeWidth="1.7" fill={color} fillOpacity="0.22" />
            <rect x="52" y="42" width="11" height="7" rx="1.5" strokeWidth="1.7" fill={color} fillOpacity="0.22" />
            <line x1="48" y1="45.5" x2="52" y2="45.5" strokeWidth="1.5" />
            <path d="M43 56 Q50 59 57 56" strokeWidth="1.4" />
          </g>
        )}

        {speaker === "VY" && (
          <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 94 C24 76 36 72 50 72 C64 72 76 76 80 94" strokeWidth="1.9" fill={color} fillOpacity="0.08" />
            <path d="M30 58 C27 36 33 19 50 19 C67 19 73 36 70 58" strokeWidth="1.9" />
            <path d="M36 42 C36 28 64 28 64 42 C64 55 57 65 50 65 C43 65 36 55 36 42 Z" strokeWidth="1.9" fill={color} fillOpacity="0.1" />
            <path d="M32 45 H27 V53 L42 58" strokeWidth="1.6" />
            <circle cx="27" cy="49" r="2.6" fill={color} />
            <path d="M40 45 H47 M53 45 H60" strokeWidth="2" />
            <rect x="52" y="41" width="11" height="7" rx="1.5" strokeWidth="1.4" fill={color} fillOpacity="0.22" />
            <path d="M45 55 Q50 57 55 55" strokeWidth="1.4" />
          </g>
        )}

        {speaker === "KHOA" && (
          <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 94 L24 74 L50 69 L76 74 L84 94" strokeWidth="2" fill={color} fillOpacity="0.09" />
            <path d="M43 70 L50 88 L57 70" strokeWidth="1.6" />
            <polygon points="34,35 50,24 66,35 64,56 50,67 36,56" strokeWidth="2" fill={color} fillOpacity="0.1" />
            <path d="M33 35 L39 22 L50 19 L61 22 L67 35" strokeWidth="1.7" />
            <polygon points="37,43 48,45 47,48 38,47" fill={color} fillOpacity="0.75" strokeWidth="1.2" />
            <polygon points="63,43 52,45 53,48 62,47" fill={color} fillOpacity="0.75" strokeWidth="1.2" />
            <line x1="43" y1="57" x2="57" y2="55.5" strokeWidth="1.6" />
          </g>
        )}

        {speaker === "EREBUS" && (
          <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="50" cy="50" r="34" strokeWidth="1.5" strokeDasharray="8 4" />
            <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" strokeWidth="1.9" fill={color} fillOpacity="0.14" />
            <circle cx="50" cy="50" r="11" strokeWidth="2" fill={color} fillOpacity="0.28" />
            <circle cx="50" cy="50" r="4.5" fill={color} />
          </g>
        )}

        {speaker === "SYSTEM" && (
          <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="50,15 79,28 76,62 50,85 24,62 21,28" strokeWidth="2" fill={color} fillOpacity="0.1" />
            <polyline points="38,44 46,50 38,56" strokeWidth="2.5" />
            <line x1="50" y1="56" x2="62" y2="56" strokeWidth="2.5" />
          </g>
        )}
      </svg>

      <span
        className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
    </div>
  );
}
