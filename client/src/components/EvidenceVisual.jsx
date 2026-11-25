import { useEffect, useState } from "react";

const VISUAL_CAPTIONS = {
  PHONE_LOCK: "HIỆN TRƯỜNG #01 // THIẾT BỊ DI ĐỘNG KHÓA MẬT MÃ",
  FLOOR_MAP: "HIỆN TRƯỜNG #02 // MẶT BẰNG KIẾN TRÚC TẦNG 4",
  RECEIPT: "HIỆN TRƯỜNG #03 // MÁY IN HÓA ĐƠN POS & QUÁN CÀ PHÊ",
  FLIGHT_BOARD: "HIỆN TRƯỜNG #04 // BẢNG LẬT CƠ HỌC SÂN BAY",
  SECURITY_GATE: "HIỆN TRƯỜNG #05 // CỔNG TỪ AN NINH SINH TRẮC HỌC",
  EMAIL_CIPHER: "HIỆN TRƯỜNG #06 // PHONG BÌ THƯ ĐIỆN TỬ MÃ HÓA",
  CAESAR_BOARD: "HIỆN TRƯỜNG #07 // ĐĨA MẬT MÃ ĐỒNG TÂM CỔ ĐIỂN",
  NUMPAD_GRID: "HIỆN TRƯỜNG #08 // BÀN PHÍM SỐ CƠ HỌC 3×4",
  MORSE_ROUTER: "HIỆN TRƯỜNG #09 // ROUTER CÔNG NGHIỆP & ĐÈN TÍN HIỆU",
  HEX_CORE: "HIỆN TRƯỜNG #10 // KHỐI LẬP PHƯƠNG KHO DỮ LIỆU LẠNH",
  SENSOR_RADAR: "HIỆN TRƯỜNG #11 // RADAR THỜI TIẾT & TÒA NHÀ TRONG MƯA",
  BANK_FLOW: "HIỆN TRƯỜNG #12 // SƠ ĐỒ LUỒNG CHUYỂN TIỀN ẨN DANH",
  SERVER_RACK: "HIỆN TRƯỜNG #13 // TỦ MÁY CHỦ RACK 42U & 3 CỔNG CÁP",
  PACKET_STREAM: "HIỆN TRƯỜNG #14 // ĐƯỜNG ỐNG GÓI TIN LỤC GIÁC",
  VAULT_DOOR: "HIỆN TRƯỜNG #15 // CỬA HẦM TRÒN CƠ KHÍ ĐỒNG TÂM",
  SHIFT_TIMELINE: "HIỆN TRƯỜNG #16 // ĐỒNG HỒ TRỰC BAN 24 GIỜ",
  IP_CONFLICT: "HIỆN TRƯỜNG #17 // GIAO CẮT XUNG ĐỘT NÚT MẠNG",
  AUDIO_WAVE: "HIỆN TRƯỜNG #18 // SÓNG ÂM MÁY GHI ÂM TỔNG ĐÀI",
  CODE_BACKDOOR: "HIỆN TRƯỜNG #19 // KÍNH LÚP QUÉT LỖ HỔNG MÃ NGUỒN",
  AI_CORE_BOSS: "HIỆN TRƯỜNG #20 // LÕI NĂNG LƯỢNG EREBUS-9",
};

function RadarGridBackdrop({ accent = "#06B6D4" }) {
  return (
    <g opacity="0.22">
      {[80, 160, 240, 320, 400, 480].map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="140" stroke={accent} strokeWidth="0.6" strokeDasharray="2 4" />
      ))}
      {[35, 70, 105].map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="560" y2={y} stroke={accent} strokeWidth="0.6" strokeDasharray="2 4" />
      ))}
    </g>
  );
}

function MorseRouterScene() {
  const [pulseOn, setPulseOn] = useState(true);

  useEffect(() => {
    const pattern = [420, 220, 180, 220, 420, 600];
    let idx = 0;
    let timer;
    const tick = () => {
      setPulseOn((p) => !p);
      idx = (idx + 1) % pattern.length;
      timer = setTimeout(tick, pattern[idx]);
    };
    timer = setTimeout(tick, pattern[0]);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
      <RadarGridBackdrop accent="#06B6D4" />
      {/* Dual Antennas */}
      <line x1="168" y1="54" x2="152" y2="16" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <line x1="392" y1="54" x2="408" y2="16" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="152" cy="16" r="3.5" fill={pulseOn ? "#F59E0B" : "#475569"} />
      <circle cx="408" cy="16" r="3.5" fill={pulseOn ? "#06B6D4" : "#475569"} />
      {/* RF Emission Arcs */}
      <g stroke="#06B6D4" strokeWidth="1.2" opacity={pulseOn ? 0.75 : 0.25}>
        <path d="M138 18 A18 18 0 0 1 166 18" />
        <path d="M130 13 A28 28 0 0 1 174 13" />
        <path d="M394 18 A18 18 0 0 1 422 18" />
        <path d="M386 13 A28 28 0 0 1 430 13" />
      </g>
      {/* Industrial Router Chassis */}
      <rect x="115" y="54" width="330" height="58" rx="6" fill="#0B1220" stroke="#F59E0B" strokeOpacity="0.65" strokeWidth="1.6" />
      <rect x="128" y="64" width="304" height="38" rx="3" fill="#060A11" stroke="#1E293B" strokeWidth="1" />
      {/* Vent louvers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={144 + i * 10} y1="73" x2={144 + i * 10} y2="93" stroke="#334155" strokeWidth="2" />
      ))}
      {/* Status LEDs */}
      <circle cx="222" cy="83" r="4" fill="#10B981" />
      <circle cx="244" cy="83" r="4" fill="#06B6D4" opacity="0.65" />
      {/* Rhythmic Blinking Signal Beacon */}
      <circle cx="284" cy="83" r={pulseOn ? 15 : 8} fill="#F59E0B" fillOpacity={pulseOn ? 0.22 : 0.05} />
      <circle cx="284" cy="83" r="6" fill={pulseOn ? "#F59E0B" : "#451A03"} stroke="#F59E0B" strokeWidth="1.4" />
      {/* Signal Wave Monitor (Decorative Only) */}
      <rect x="318" y="70" width="102" height="26" rx="3" fill="#09111E" stroke="#06B6D4" strokeOpacity="0.4" />
      <polyline
        points="324,83 336,83 341,75 348,90 356,78 364,83 378,83 384,74 391,91 399,83 414,83"
        stroke="#06B6D4"
        strokeWidth="1.4"
        opacity={pulseOn ? 0.95 : 0.45}
      />
      {/* Rubber Feet */}
      <rect x="136" y="112" width="24" height="6" rx="1" fill="#334155" />
      <rect x="400" y="112" width="24" height="6" rx="1" fill="#334155" />
    </svg>
  );
}

export default function EvidenceVisual({
  visualType = "PHONE_LOCK",
  isBoss = false,
}) {
  const caption = VISUAL_CAPTIONS[visualType] || "VẬT CHỨNG HIỆN TRƯỜNG";

  return (
    <div
      className={`dossier-panel dossier-brackets ${
        isBoss ? "dossier-brackets-crimson" : ""
      } shrink-0 overflow-hidden flex flex-col`}
    >
      {/* Top Technical Strip */}
      <div className="relative z-10 px-3 py-1 border-b border-slate-800/80 bg-[#060A11]/75 flex items-center justify-between gap-2">
        <span
          className={`font-mono text-[10px] tracking-wider font-bold truncate ${
            isBoss ? "text-[#F43F5E]" : "text-[#F59E0B]"
          }`}
        >
          {caption}
        </span>
        <span className="font-mono text-[9px] text-[#06B6D4] px-1.5 py-0.2 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/30 shrink-0">
          FORENSIC // SCAN
        </span>
      </div>

      {/* Fixed Compact SVG Scene Stage (h-28 sm:h-32) */}
      <div className="relative z-10 h-28 sm:h-32 w-full px-3 py-1.5 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05),transparent_72%)]">
        {/* Subtle Horizontal Laser Scan Beam */}
        <div className="animate-laser-scan pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#06B6D4]/55 to-transparent z-20" />

        {visualType === "PHONE_LOCK" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Weak Signal Waves (Left) */}
            <g stroke="#06B6D4" strokeWidth="1.4" opacity="0.6">
              <path d="M168 58 A24 24 0 0 0 168 84" />
              <path d="M154 48 A38 38 0 0 0 154 94" strokeDasharray="3 3" />
              <path d="M392 58 A24 24 0 0 1 392 84" />
              <path d="M406 48 A38 38 0 0 1 406 94" strokeDasharray="3 3" />
            </g>
            {/* Smartphone Body */}
            <rect x="234" y="10" width="92" height="120" rx="12" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.6" />
            <rect x="242" y="20" width="76" height="98" rx="6" fill="#060A11" stroke="#1E293B" />
            <line x1="268" y1="15" x2="292" y2="15" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            {/* Weak Signal Bars top right */}
            <rect x="296" y="28" width="3" height="4" fill="#F59E0B" />
            <rect x="301" y="26" width="3" height="6" fill="#334155" />
            <rect x="306" y="24" width="3" height="8" fill="#334155" />
            {/* Padlock Icon */}
            <rect x="273" y="34" width="14" height="10" rx="2" stroke="#F59E0B" strokeWidth="1.4" />
            <path d="M276 34 V30 A4 4 0 0 1 284 30 V34" stroke="#F59E0B" strokeWidth="1.4" />
            {/* 4 Blank PIN Dots */}
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={262 + i * 12} cy="56" r="3" stroke="#06B6D4" strokeWidth="1.2" />
            ))}
            {/* Concentric Fingerprint Sensor */}
            <g transform="translate(280, 90)" stroke="#06B6D4" strokeWidth="1.3" strokeLinecap="round">
              <path d="M-12 0 A12 12 0 1 1 12 0" />
              <path d="M-8 3 A8 8 0 1 1 8 3" stroke="#F59E0B" />
              <path d="M-4 5 A4 4 0 1 1 4 5" />
              <circle cx="0" cy="4" r="1.3" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {visualType === "FLOOR_MAP" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Architectural Blueprint Floor 4 Perimeter */}
            <rect x="70" y="12" width="420" height="116" rx="4" fill="#080E1A" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.4" />
            {/* Lab Wing */}
            <rect x="82" y="22" width="128" height="52" fill="#0F172A" stroke="#F59E0B" strokeOpacity="0.55" />
            <text x="116" y="51" fill="#F59E0B" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">LAB-04</text>
            {/* Central Corridor */}
            <rect x="210" y="22" width="136" height="52" fill="#0B1220" stroke="#334155" strokeDasharray="4 3" />
            <text x="246" y="51" fill="#64748B" fontSize="8.5" fontFamily="JetBrains Mono">CORRIDOR</text>
            {/* RFID Gate */}
            <rect x="346" y="22" width="132" height="52" fill="#0F172A" stroke="#06B6D4" strokeOpacity="0.5" />
            <text x="380" y="51" fill="#06B6D4" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">RFID GATE</text>
            {/* Security Lobby Desk */}
            <rect x="82" y="84" width="396" height="34" fill="#0B1220" stroke="#334155" />
            <text x="220" y="105" fill="#94A3B8" fontSize="8.5" fontFamily="JetBrains Mono">SECURITY LOBBY DESK</text>
            {/* Security Radar Sweep Overlay */}
            <g transform="translate(280, 70)">
              <circle r="48" stroke="#F59E0B" strokeOpacity="0.35" strokeDasharray="3 4" />
              <circle r="24" stroke="#06B6D4" strokeOpacity="0.3" />
              <g className="animate-radar" style={{ transformOrigin: "0px 0px" }}>
                <path d="M0 0 L34 -34 A48 48 0 0 1 48 0 Z" fill="#F59E0B" fillOpacity="0.16" />
                <line x1="0" y1="0" x2="48" y2="0" stroke="#F59E0B" strokeWidth="1.2" />
              </g>
            </g>
          </svg>
        )}

        {visualType === "RECEIPT" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* POS Thermal Printer */}
            <rect x="132" y="16" width="144" height="34" rx="5" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
            <line x1="148" y1="42" x2="260" y2="42" stroke="#060A11" strokeWidth="5" strokeLinecap="round" />
            <circle cx="260" cy="27" r="3" fill="#10B981" />
            {/* Paper Receipt Rolling Out (No numbers/answers) */}
            <path
              d="M156 42 H252 V124 L244 118 L236 124 L228 118 L220 124 L212 118 L204 124 L196 118 L188 124 L180 118 L172 124 L164 118 L156 124 Z"
              fill="#0B1220"
              stroke="#F59E0B"
              strokeOpacity="0.7"
              strokeWidth="1.4"
            />
            {[56, 68, 80, 92, 106].map((y, idx) => (
              <g key={y}>
                <line x1="168" y1={y} x2={idx === 4 ? "214" : "220"} y2={y} stroke={idx === 4 ? "#F59E0B" : "#475569"} strokeWidth="2" strokeLinecap="round" />
                <line x1="228" y1={y} x2="240" y2={y} stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
              </g>
            ))}
            {/* Steaming Vector Coffee Cup */}
            <g transform="translate(344, 34)">
              <path d="M18 14 C14 6 24 2 20 -6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
              <path d="M34 14 C30 6 40 2 36 -6" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
              <path d="M4 24 H56 L50 76 A8 8 0 0 1 42 84 H18 A8 8 0 0 1 10 76 Z" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.6" />
              <path d="M55 34 H66 A12 12 0 0 1 66 58 H52" stroke="#F59E0B" strokeWidth="1.6" />
              <line x1="-4" y1="90" x2="66" y2="90" stroke="#06B6D4" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {visualType === "FLIGHT_BOARD" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Split-Flap Mechanical Board */}
            <rect x="64" y="18" width="290" height="104" rx="6" fill="#0B1220" stroke="#F59E0B" strokeOpacity="0.6" strokeWidth="1.5" />
            {[0, 1, 2].map((row) => (
              <g key={row}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                  <g key={col}>
                    <rect
                      x={78 + col * 33}
                      y={30 + row * 29}
                      width="26"
                      height="22"
                      rx="2.5"
                      fill="#060A11"
                      stroke={col < 2 ? "#F59E0B" : "#1E293B"}
                      strokeOpacity={col < 2 ? 0.55 : 1}
                    />
                    <line
                      x1={78 + col * 33}
                      y1={41 + row * 29}
                      x2={104 + col * 33}
                      y2={41 + row * 29}
                      stroke="#1E293B"
                      strokeWidth="0.9"
                    />
                  </g>
                ))}
              </g>
            ))}
            {/* Departing Aircraft Trajectory Vector */}
            <path d="M380 106 Q430 92 496 34" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 4" />
            <g transform="translate(462, 42) rotate(-32)">
              <path
                d="M0 10 L26 2 L16 12 L24 22 L10 14 L-6 18 L0 10 Z"
                fill="#F59E0B"
                fillOpacity="0.22"
                stroke="#F59E0B"
                strokeWidth="1.5"
              />
            </g>
            <line x1="374" y1="112" x2="504" y2="112" stroke="#334155" strokeWidth="1.6" />
          </svg>
        )}

        {visualType === "SECURITY_GATE" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop accent="#F43F5E" />
            {/* Heavy Blast Door Left & Right */}
            <rect x="86" y="14" width="142" height="112" rx="4" fill="#130B14" stroke="#F43F5E" strokeOpacity="0.55" strokeWidth="1.6" />
            <rect x="332" y="14" width="142" height="112" rx="4" fill="#130B14" stroke="#F43F5E" strokeOpacity="0.55" strokeWidth="1.6" />
            {/* Diagonal Hazard Stripes */}
            {[0, 1, 2].map((i) => (
              <g key={i} stroke="#F59E0B" strokeOpacity="0.35" strokeWidth="2">
                <line x1={104 + i * 24} y1="26" x2={120 + i * 24} y2="114" />
                <line x1={408 + i * 24} y1="26" x2={392 + i * 24} y2="114" />
              </g>
            ))}
            {/* Biometric Pulsing Red Lock Core */}
            <g transform="translate(280, 70)">
              <circle r="44" fill="#060A11" stroke="#F43F5E" strokeWidth="2" />
              <circle r="32" stroke="#F43F5E" strokeDasharray="6 4" strokeWidth="1.5" className="animate-spin-slow" style={{ transformOrigin: "0px 0px" }} />
              <circle r="16" fill="#F43F5E" fillOpacity="0.22" stroke="#F43F5E" strokeWidth="1.8" />
              <circle r="5" fill="#F43F5E" className="animate-pulse" />
              {/* Hydraulic Bolts */}
              <rect x="-54" y="-6" width="16" height="12" rx="2" fill="#F59E0B" fillOpacity="0.65" />
              <rect x="38" y="-6" width="16" height="12" rx="2" fill="#F59E0B" fillOpacity="0.65" />
            </g>
          </svg>
        )}

        {visualType === "EMAIL_CIPHER" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Horizontal Decryption Waves */}
            <path d="M54 50 Q100 32 146 50 T238 50" stroke="#06B6D4" strokeWidth="1.2" opacity="0.5" />
            <path d="M322 90 Q368 72 414 90 T506 90" stroke="#F59E0B" strokeWidth="1.2" opacity="0.5" />
            {/* Encrypted Envelope */}
            <rect x="180" y="24" width="200" height="92" rx="6" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.6" />
            <polyline points="182,26 280,80 378,26" stroke="#06B6D4" strokeWidth="1.5" />
            <line x1="184" y1="112" x2="246" y2="66" stroke="#334155" strokeWidth="1.1" />
            <line x1="376" y1="112" x2="314" y2="66" stroke="#334155" strokeWidth="1.1" />
            {/* Wax / Digital Cipher Seal */}
            <circle cx="280" cy="76" r="16" fill="#060A11" stroke="#F59E0B" strokeWidth="1.8" />
            <rect x="274" y="74" width="12" height="9" rx="1.5" stroke="#06B6D4" strokeWidth="1.4" />
            <path d="M277 74 V70 A3 3 0 0 1 283 70 V74" stroke="#06B6D4" strokeWidth="1.4" />
          </svg>
        )}

        {visualType === "CAESAR_BOARD" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Concentric Dual Classic Cipher Wheel */}
            <g transform="translate(280, 70)">
              <g className="animate-spin-slow" style={{ transformOrigin: "0px 0px" }}>
                <circle r="56" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.8" />
                <circle r="44" stroke="#F59E0B" strokeOpacity="0.45" strokeDasharray="3 5" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1="-44"
                    x2="0"
                    y2="-56"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    transform={`rotate(${deg})`}
                  />
                ))}
              </g>
              <g className="animate-spin-reverse-slow" style={{ transformOrigin: "0px 0px" }}>
                <circle r="34" fill="#060A11" stroke="#06B6D4" strokeWidth="1.6" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1="-22"
                    x2="0"
                    y2="-34"
                    stroke="#06B6D4"
                    strokeWidth="1.2"
                    transform={`rotate(${deg})`}
                  />
                ))}
              </g>
              <circle r="10" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
              <circle r="3" fill="#06B6D4" />
            </g>
          </svg>
        )}

        {visualType === "NUMPAD_GRID" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Uniform Neutral Mechanical 3x4 Numpad (ZERO Highlighted Answers) */}
            <rect x="206" y="8" width="148" height="124" rx="8" fill="#0B1220" stroke="#F59E0B" strokeOpacity="0.65" strokeWidth="1.5" />
            {[
              ["7", "8", "9"],
              ["4", "5", "6"],
              ["1", "2", "3"],
            ].map((row, r) =>
              row.map((key, c) => (
                <g key={key}>
                  <rect
                    x={220 + c * 42}
                    y={18 + r * 28}
                    width="34"
                    height="22"
                    rx="3.5"
                    fill="#060A11"
                    stroke="#06B6D4"
                    strokeOpacity="0.55"
                    strokeWidth="1.2"
                  />
                  <text
                    x={233 + c * 42}
                    y={33 + r * 28}
                    fill="#CBD5E1"
                    fontSize="10.5"
                    fontFamily="JetBrains Mono"
                    fontWeight="600"
                  >
                    {key}
                  </text>
                </g>
              ))
            )}
            <rect x="220" y="102" width="76" height="22" rx="3.5" fill="#060A11" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
            <text x="254" y="117" fill="#CBD5E1" fontSize="10.5" fontFamily="JetBrains Mono" fontWeight="600">0</text>
            <rect x="304" y="102" width="34" height="22" rx="3.5" fill="#060A11" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.2" />
            <text x="319" y="117" fill="#64748B" fontSize="10.5" fontFamily="JetBrains Mono">.</text>
          </svg>
        )}

        {visualType === "MORSE_ROUTER" && <MorseRouterScene />}

        {visualType === "HEX_CORE" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop accent="#06B6D4" />
            {/* Ambient decorative blurred hex streams (generic, non-spoiler) */}
            <text x="72" y="42" fill="#06B6D4" opacity="0.22" fontSize="9" fontFamily="JetBrains Mono">0xA4 0x1F 0x9C</text>
            <text x="86" y="106" fill="#F59E0B" opacity="0.2" fontSize="9" fontFamily="JetBrains Mono">0x0E 0x7D 0xB2</text>
            <text x="396" y="44" fill="#F59E0B" opacity="0.2" fontSize="9" fontFamily="JetBrains Mono">0xC8 0x3A 0x00</text>
            <text x="386" y="108" fill="#06B6D4" opacity="0.22" fontSize="9" fontFamily="JetBrains Mono">0xF1 0x88 0x2B</text>
            {/* Isometric Cold Storage Data Cube */}
            <g transform="translate(280, 70)">
              <polygon points="0,-48 46,-22 46,24 0,50 -46,24 -46,-22" fill="#0B1526" stroke="#06B6D4" strokeWidth="1.8" />
              <polyline points="-46,-22 0,4 46,-22" stroke="#06B6D4" strokeWidth="1.4" />
              <line x1="0" y1="4" x2="0" y2="50" stroke="#06B6D4" strokeWidth="1.4" />
              {/* Inner glowing frozen core */}
              <polygon points="0,-24 22,-11 22,12 0,25 -22,12 -22,-11" fill="#F43F5E" fillOpacity="0.16" stroke="#F59E0B" strokeWidth="1.4" />
            </g>
          </svg>
        )}

        {visualType === "SENSOR_RADAR" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Sweeping Weather Radar Dial (Left) */}
            <g transform="translate(178, 72)">
              <circle r="50" fill="#060A11" stroke="#06B6D4" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle r="33" stroke="#06B6D4" strokeOpacity="0.25" strokeDasharray="3 3" />
              <circle r="16" stroke="#06B6D4" strokeOpacity="0.2" />
              <g className="animate-radar" style={{ transformOrigin: "0px 0px" }}>
                <path d="M0 0 L35 -35 A50 50 0 0 1 50 0 Z" fill="#06B6D4" fillOpacity="0.22" />
                <line x1="0" y1="0" x2="50" y2="0" stroke="#06B6D4" strokeWidth="1.5" />
              </g>
            </g>
            {/* Building Silhouette Under Storm Rain (Right) */}
            <g transform="translate(310, 14)">
              {/* Storm Cloud & Lightning */}
              <path d="M26 24 H96 A12 12 0 0 0 92 2 A18 18 0 0 0 56 2 A14 14 0 0 0 26 24 Z" fill="#0F172A" stroke="#F59E0B" strokeOpacity="0.7" strokeWidth="1.4" />
              <polygon points="62,24 54,38 62,38 56,52 72,34 64,34" fill="#F59E0B" />
              {/* Slanted Rain */}
              {[24, 40, 78, 94].map((x) => (
                <line key={x} x1={x} y1="30" x2={x - 8} y2="48" stroke="#06B6D4" strokeWidth="1.2" opacity="0.65" />
              ))}
              {/* Tower Wireframe */}
              <rect x="28" y="54" width="66" height="62" fill="#0B1220" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.4" />
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                  <rect key={`${r}-${c}`} x={38 + c * 18} y={64 + r * 16} width="10" height="8" fill="#1E293B" stroke="#334155" strokeWidth="0.8" />
                ))
              )}
            </g>
          </svg>
        )}

        {visualType === "BANK_FLOW" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Anonymous Account Nodes & Transfer Flow Vectors */}
            <path d="M132 70 C190 26 230 26 280 44" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 4" className="animate-circuit" />
            <path d="M132 70 C190 114 230 114 280 96" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="5 4" className="animate-circuit" />
            <path d="M280 44 L428 70" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 4" className="animate-circuit" />
            <path d="M280 96 L428 70" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="5 4" className="animate-circuit" />

            {/* Source Node */}
            <polygon points="108,48 134,60 134,80 108,92 82,80 82,60" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.6" />
            <circle cx="108" cy="70" r="5" fill="#F59E0B" />
            {/* Relay Nodes */}
            <circle cx="280" cy="44" r="14" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="280" cy="96" r="14" fill="#0B1220" stroke="#06B6D4" strokeWidth="1.5" />
            {/* Destination Vault Node */}
            <polygon points="452,48 478,60 478,80 452,92 426,80 426,60" fill="#0B1220" stroke="#06B6D4" strokeWidth="1.6" />
            <circle cx="452" cy="70" r="5" fill="#06B6D4" />
          </svg>
        )}

        {visualType === "SERVER_RACK" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* 42U Server Rack Cabinet */}
            <rect x="196" y="10" width="168" height="120" rx="5" fill="#0B1220" stroke="#F59E0B" strokeOpacity="0.65" strokeWidth="1.6" />
            {/* 4 Server Blade Units */}
            {[0, 1, 2, 3].map((slot) => (
              <g key={slot}>
                <rect x="208" y={20 + slot * 20} width="144" height="14" rx="2" fill="#060A11" stroke="#334155" />
                <circle cx="218" cy={27 + slot * 20} r="2.5" fill={slot % 2 === 0 ? "#10B981" : "#F59E0B"} className="animate-pulse" />
                <circle cx="228" cy={27 + slot * 20} r="2.5" fill="#06B6D4" opacity="0.7" />
                <line x1="244" y1={27 + slot * 20} x2="340" y2={27 + slot * 20} stroke="#1E293B" strokeWidth="2" strokeDasharray="6 4" />
              </g>
            ))}
            {/* 3 Symmetric Network Cable Patch Ports (ZERO spoiler) */}
            {[0, 1, 2].map((p) => (
              <g key={p}>
                <rect x={224 + p * 44} y="104" width="24" height="16" rx="2" fill="#060A11" stroke="#06B6D4" strokeWidth="1.3" />
                <line x1={236 + p * 44} y1="120" x2={236 + p * 44} y2="134" stroke="#94A3B8" strokeWidth="2" />
              </g>
            ))}
          </svg>
        )}

        {visualType === "PACKET_STREAM" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Horizontal Data Conduit */}
            <line x1="56" y1="42" x2="504" y2="42" stroke="#06B6D4" strokeOpacity="0.45" strokeWidth="1.4" />
            <line x1="56" y1="98" x2="504" y2="98" stroke="#06B6D4" strokeOpacity="0.45" strokeWidth="1.4" />
            {/* Central Filter Aperture */}
            <rect x="266" y="24" width="28" height="92" rx="4" fill="#F59E0B" fillOpacity="0.14" stroke="#F59E0B" strokeWidth="1.8" />
            <line x1="280" y1="24" x2="280" y2="116" stroke="#F59E0B" strokeDasharray="4 4" strokeWidth="1.4" />
            {/* Hexagonal Packets Moving Along Conduit (Blank/Symbolic) */}
            {[104, 174, 232, 336, 404, 466].map((cx, i) => (
              <polygon
                key={cx}
                points={`${cx},54 ${cx + 16},62 ${cx + 16},78 ${cx},86 ${cx - 16},78 ${cx - 16},62`}
                fill="#0B1220"
                stroke={i >= 3 ? "#10B981" : "#06B6D4"}
                strokeWidth="1.5"
              />
            ))}
          </svg>
        )}

        {visualType === "VAULT_DOOR" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop accent="#F43F5E" />
            {/* Circular Mechanical Steel Vault Door */}
            <g transform="translate(280, 70)">
              <circle r="58" fill="#0B1220" stroke="#F43F5E" strokeOpacity="0.75" strokeWidth="2.2" />
              <circle r="46" stroke="#F59E0B" strokeOpacity="0.65" strokeWidth="1.5" strokeDasharray="10 6" />
              {/* Concentric Locking Bolts */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={deg}
                  x="-3.5"
                  y="-57"
                  width="7"
                  height="11"
                  rx="1"
                  fill="#F59E0B"
                  transform={`rotate(${deg})`}
                />
              ))}
              {/* Rotating Spoked Handwheel */}
              <g className="animate-spin-slow" style={{ transformOrigin: "0px 0px" }}>
                <circle r="28" stroke="#06B6D4" strokeWidth="2" />
                <line x1="-28" y1="0" x2="28" y2="0" stroke="#06B6D4" strokeWidth="2.4" />
                <line x1="0" y1="-28" x2="0" y2="28" stroke="#06B6D4" strokeWidth="2.4" />
              </g>
              <circle r="8" fill="#F43F5E" />
            </g>
          </svg>
        )}

        {visualType === "SHIFT_TIMELINE" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Circular 24-Hour Duty Clock Dial */}
            <g transform="translate(280, 70)">
              <circle r="54" fill="#0B1220" stroke="#06B6D4" strokeOpacity="0.6" strokeWidth="1.6" />
              {/* Neutral Duty Sector Arcs */}
              <path d="M0 -42 A42 42 0 0 1 42 0" stroke="#F59E0B" strokeWidth="6" strokeOpacity="0.6" />
              <path d="M36 22 A42 42 0 0 1 -36 22" stroke="#06B6D4" strokeWidth="6" strokeOpacity="0.55" />
              <path d="M-42 0 A42 42 0 0 1 -10 -41" stroke="#475569" strokeWidth="6" strokeOpacity="0.6" />
              {/* Hour Ticks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line key={deg} x1="0" y1="-48" x2="0" y2="-54" stroke="#94A3B8" strokeWidth="1.3" transform={`rotate(${deg})`} />
              ))}
              {/* Sweeping Clock Hand */}
              <g className="animate-radar" style={{ transformOrigin: "0px 0px" }}>
                <line x1="0" y1="0" x2="0" y2="-36" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
              </g>
              <circle r="4" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {visualType === "IP_CONFLICT" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop accent="#F43F5E" />
            {/* Left Host Node */}
            <rect x="92" y="46" width="84" height="48" rx="5" fill="#0B1220" stroke="#06B6D4" strokeWidth="1.5" />
            <circle cx="108" cy="62" r="3" fill="#06B6D4" />
            <line x1="104" y1="78" x2="162" y2="78" stroke="#334155" strokeWidth="2" />
            {/* Right Host Node */}
            <rect x="384" y="46" width="84" height="48" rx="5" fill="#0B1220" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="400" cy="62" r="3" fill="#F59E0B" />
            <line x1="396" y1="78" x2="454" y2="78" stroke="#334155" strokeWidth="2" />
            {/* Converging Network Lines */}
            <line x1="176" y1="70" x2="256" y2="70" stroke="#06B6D4" strokeWidth="2" strokeDasharray="5 3" className="animate-circuit" />
            <line x1="384" y1="70" x2="304" y2="70" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 3" className="animate-circuit" />
            {/* Central Collision Ripples */}
            <g transform="translate(280, 70)">
              <circle r="30" stroke="#F43F5E" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="4 4" />
              <circle r="18" fill="#F43F5E" fillOpacity="0.18" stroke="#F43F5E" strokeWidth="1.8" />
              <line x1="0" y1="-8" x2="0" y2="2" stroke="#F43F5E" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="0" cy="8" r="1.8" fill="#F43F5E" />
            </g>
          </svg>
        )}

        {visualType === "AUDIO_WAVE" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* PBX Oscilloscope Frame */}
            <rect x="76" y="16" width="408" height="108" rx="6" fill="#0B1220" stroke="#F59E0B" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="92" y1="70" x2="468" y2="70" stroke="#1E293B" strokeWidth="1.2" />
            {/* Continuous Symmetric Waveform Bars (Non-spoiler aesthetic) */}
            {[16, 28, 42, 22, 54, 34, 62, 40, 26, 58, 46, 24, 52, 36, 48, 22, 38, 18, 30, 14].map(
              (h, idx) => (
                <rect
                  key={idx}
                  x={102 + idx * 18}
                  y={70 - h / 2}
                  width="7"
                  height={h}
                  rx="3.5"
                  fill={idx % 3 === 0 ? "#F59E0B" : "#06B6D4"}
                  fillOpacity="0.78"
                />
              )
            )}
          </svg>
        )}

        {visualType === "CODE_BACKDOOR" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop />
            {/* Abstract Code Editor Window */}
            <rect x="116" y="14" width="328" height="112" rx="6" fill="#0B1220" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.5" />
            <line x1="116" y1="34" x2="444" y2="34" stroke="#1E293B" />
            <circle cx="132" cy="24" r="3" fill="#F43F5E" />
            <circle cx="144" cy="24" r="3" fill="#F59E0B" />
            <circle cx="156" cy="24" r="3" fill="#10B981" />
            {/* Abstract Syntax Bars (ZERO line numbers or code text) */}
            {[
              { y: 50, w: 120, c: "#334155" },
              { y: 66, w: 175, c: "#475569" },
              { y: 82, w: 150, c: "#F59E0B" },
              { y: 98, w: 96, c: "#334155" },
            ].map((bar, idx) => (
              <g key={idx}>
                <rect x="134" y={bar.y} width="18" height="5" rx="2" fill="#1E293B" />
                <rect x="162" y={bar.y} width={bar.w} height="5" rx="2" fill={bar.c} opacity="0.75" />
              </g>
            ))}
            {/* Security Magnifying Glass */}
            <g transform="translate(362, 74)">
              <circle r="24" fill="#060A11" fillOpacity="0.82" stroke="#F59E0B" strokeWidth="2.2" />
              <circle r="15" stroke="#06B6D4" strokeDasharray="4 3" strokeWidth="1.2" />
              <line x1="17" y1="17" x2="34" y2="34" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {visualType === "AI_CORE_BOSS" && (
          <svg viewBox="0 0 560 140" className="w-full h-full" fill="none">
            <RadarGridBackdrop accent="#F43F5E" />
            {/* Multi-ring Counter-rotating EREBUS-9 Energy Core */}
            <g transform="translate(280, 70)">
              <g className="animate-spin-slow" style={{ transformOrigin: "0px 0px" }}>
                <circle r="58" stroke="#F43F5E" strokeOpacity="0.65" strokeWidth="1.8" strokeDasharray="16 8 4 8" />
                <circle cx="58" cy="0" r="3" fill="#F43F5E" />
                <circle cx="-58" cy="0" r="3" fill="#F43F5E" />
              </g>
              <g className="animate-spin-reverse-slow" style={{ transformOrigin: "0px 0px" }}>
                <circle r="42" stroke="#F59E0B" strokeOpacity="0.75" strokeWidth="2" strokeDasharray="10 6" />
                <polygon points="0,-42 4,-34 -4,-34" fill="#F59E0B" />
                <polygon points="0,42 4,34 -4,34" fill="#F59E0B" />
              </g>
              <g className="animate-spin-slow" style={{ transformOrigin: "0px 0px" }}>
                <circle r="27" stroke="#06B6D4" strokeOpacity="0.7" strokeWidth="1.4" strokeDasharray="5 4" />
              </g>
              <circle r="16" fill="#F43F5E" fillOpacity="0.28" stroke="#F43F5E" strokeWidth="2.2" />
              <circle r="6" fill="#F43F5E" className="animate-pulse" />
            </g>
            {/* Side Containment Brackets */}
            <path d="M168 34 L152 46 V94 L168 106" stroke="#F43F5E" strokeOpacity="0.55" strokeWidth="1.6" />
            <path d="M392 34 L408 46 V94 L392 106" stroke="#F43F5E" strokeOpacity="0.55" strokeWidth="1.6" />
          </svg>
        )}
      </div>
    </div>
  );
}
