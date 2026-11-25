import { useMemo, useState } from "react";
import { Binary, Check, Copy, Radio, SlidersHorizontal, Wrench, X } from "lucide-react";
import soundFX from "../utils/sound";

const MORSE_TO_CHAR = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

const CHAR_TO_MORSE = Object.fromEntries(
  Object.entries(MORSE_TO_CHAR).map(([code, ch]) => [ch, code])
);

function caesarShift(text, shift) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    const code = char.charCodeAt(0) - base;
    const shifted = (((code + shift) % 26) + 26) % 26;
    return String.fromCharCode(base + shifted);
  });
}

function decodeMorse(input) {
  const cleaned = input.trim();
  if (!cleaned) return "";
  const tokens = cleaned.includes("/")
    ? cleaned.split("/").map((s) => s.trim())
    : cleaned.split(/\s+/);

  return tokens
    .filter(Boolean)
    .map((token) => MORSE_TO_CHAR[token] || "?")
    .join("");
}

function encodeMorse(input) {
  return input
    .toUpperCase()
    .split("")
    .map((ch) => (ch === " " ? "/" : CHAR_TO_MORSE[ch] || "?"))
    .join(" / ");
}

function decodeHexToAscii(input) {
  const hexBytes = input
    .trim()
    .replace(/0x/gi, " ")
    .split(/[\s,:-]+/)
    .filter(Boolean);

  if (hexBytes.length === 0) return { text: "", rows: [] };

  const rows = hexBytes.map((hex) => {
    if (!/^[0-9a-fA-F]{2}$/.test(hex)) {
      return { hex, dec: "?", char: "?", valid: false };
    }
    const dec = parseInt(hex, 16);
    const char = dec >= 32 && dec <= 126 ? String.fromCharCode(dec) : "·";
    return { hex: hex.toUpperCase(), dec, char, valid: true };
  });

  return {
    text: rows.map((r) => r.char).join(""),
    rows,
  };
}

function encodeAsciiToHex(input) {
  return input
    .split("")
    .map((ch) => ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"))
    .join(" ");
}

export default function DecoderDrawer({ isOpen, onClose, onApplyToInput }) {
  const [activeTab, setActiveTab] = useState("caesar");
  const [copied, setCopied] = useState(false);

  const [caesarInput, setCaesarInput] = useState("");
  const [shift, setShift] = useState(-3);

  const [morseMode, setMorseMode] = useState("decode");
  const [morseInput, setMorseInput] = useState("");

  const [hexMode, setHexMode] = useState("decode");
  const [hexInput, setHexInput] = useState("");

  const caesarResult = useMemo(
    () => caesarShift(caesarInput, shift),
    [caesarInput, shift]
  );

  const morseResult = useMemo(
    () => (morseMode === "decode" ? decodeMorse(morseInput) : encodeMorse(morseInput)),
    [morseInput, morseMode]
  );

  const hexDecoded = useMemo(() => decodeHexToAscii(hexInput), [hexInput]);
  const hexEncoded = useMemo(() => encodeAsciiToHex(hexInput), [hexInput]);
  const hexResult = hexMode === "decode" ? hexDecoded.text : hexEncoded;

  const currentResult =
    activeTab === "caesar"
      ? caesarResult
      : activeTab === "morse"
      ? morseResult
      : hexResult;

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(currentResult);
      soundFX.playPin();
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-[#060A11]/78 backdrop-blur-sm">
      <div className="w-full max-w-lg h-full bg-[#0B1220]/96 backdrop-blur-xl border-l border-cyan-500/45 shadow-[-20px_0_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-[#060A11] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-cyan-500/15 border border-cyan-400/45 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold uppercase tracking-wider text-white">
                CÔNG CỤ GIẢI MÃ NHANH
              </h2>
              <p className="font-mono text-[10px] text-amber-400">
                FORENSIC CRYPTO SUITE // NEO-SG-26
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Interactive Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-3 bg-[#060A11]/75 border-b border-white/10">
          {[
            { id: "caesar", label: "CAESAR", icon: SlidersHorizontal },
            { id: "morse", label: "MORSE", icon: Radio },
            { id: "hex", label: "ASCII HEX", icon: Binary },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setActiveTab(id);
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-sm font-display text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeTab === id
                  ? "bg-cyan-500/18 text-cyan-300 border border-cyan-400/55"
                  : "text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === "caesar" && (
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-medium text-slate-300 mb-1.5">
                  Chuỗi ký tự cần dịch chuyển
                </label>
                <input
                  type="text"
                  value={caesarInput}
                  onChange={(e) => setCaesarInput(e.target.value.toUpperCase())}
                  placeholder="Nhập chuỗi mã hóa từ hồ sơ..."
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#060A11] border border-slate-700 focus:border-cyan-400 caret-cyan-400 focus:outline-none font-mono text-sm leading-7 tracking-widest text-white placeholder:font-sans placeholder:tracking-normal"
                />
              </div>

              <div className="rounded-sm bg-[#060A11] border border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-sans text-slate-300">Độ dịch chuyển (Shift)</span>
                  <span className="px-2.5 py-1 rounded-sm font-mono bg-amber-500/15 text-amber-400 border border-amber-500/40 font-bold">
                    {shift > 0 ? `+${shift}` : shift} BƯỚC
                  </span>
                </div>
                <input
                  type="range"
                  min={-13}
                  max={13}
                  step={1}
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-slate-500">
                  <span>-13</span>
                  <span>-3</span>
                  <span>0</span>
                  <span>+3</span>
                  <span>+13</span>
                </div>
              </div>

              <div className="rounded-sm bg-[#060A11] border border-white/10 p-3.5">
                <div className="font-mono text-[11px] text-slate-400 mb-2">
                  ÁNH XẠ MẪU (SHIFT {shift > 0 ? `+${shift}` : shift}):
                </div>
                <div className="grid grid-cols-6 gap-1.5 font-mono text-xs leading-7 text-center">
                  {["A", "B", "C", "D", "F", "V"].map((ch) => (
                    <div
                      key={ch}
                      className="py-1 rounded-sm bg-slate-900 border border-slate-800"
                    >
                      <span className="text-slate-400">{ch}</span>
                      <span className="text-cyan-400 mx-1">→</span>
                      <span className="text-emerald-400 font-bold">
                        {caesarShift(ch, shift)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "morse" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setMorseMode("decode");
                  }}
                  className={`py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    morseMode === "decode"
                      ? "bg-cyan-500/18 text-cyan-300 border-cyan-400/55"
                      : "bg-[#060A11] text-slate-400 border-slate-800"
                  }`}
                >
                  MORSE → KÝ TỰ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setMorseMode("encode");
                  }}
                  className={`py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    morseMode === "encode"
                      ? "bg-cyan-500/18 text-cyan-300 border-cyan-400/55"
                      : "bg-[#060A11] text-slate-400 border-slate-800"
                  }`}
                >
                  KÝ TỰ → MORSE
                </button>
              </div>

              <div>
                <label className="block font-sans text-xs font-medium text-slate-300 mb-1.5">
                  {morseMode === "decode"
                    ? "Nhập tín hiệu Morse (cách nhau bằng '/' hoặc khoảng trắng)"
                    : "Nhập văn bản cần mã hóa Morse"}
                </label>
                <textarea
                  rows={3}
                  value={morseInput}
                  onChange={(e) => setMorseInput(e.target.value)}
                  placeholder={
                    morseMode === "decode"
                      ? "VD: .- / -... / -.-."
                      : "Nhập ký tự..."
                  }
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#060A11] border border-slate-700 focus:border-cyan-400 caret-cyan-400 focus:outline-none font-mono text-sm leading-7 text-white"
                />
              </div>

              <div className="rounded-sm bg-[#060A11] border border-white/10 p-3.5">
                <div className="font-mono text-[11px] text-slate-400 mb-2">
                  BẢNG TRA CỨU MORSE QUỐC TẾ:
                </div>
                <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px] leading-6">
                  {Object.entries(CHAR_TO_MORSE).map(([ch, code]) => (
                    <div
                      key={ch}
                      className="px-2 py-0.5 rounded-sm bg-slate-900/90 border border-slate-800/80 flex justify-between"
                    >
                      <span className="text-amber-400 font-bold">{ch}</span>
                      <span className="text-slate-300">{code}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "hex" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setHexMode("decode");
                  }}
                  className={`py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    hexMode === "decode"
                      ? "bg-cyan-500/18 text-cyan-300 border-cyan-400/55"
                      : "bg-[#060A11] text-slate-400 border-slate-800"
                  }`}
                >
                  HEX → ASCII
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setHexMode("encode");
                  }}
                  className={`py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider border cursor-pointer ${
                    hexMode === "encode"
                      ? "bg-cyan-500/18 text-cyan-300 border-cyan-400/55"
                      : "bg-[#060A11] text-slate-400 border-slate-800"
                  }`}
                >
                  ASCII → HEX
                </button>
              </div>

              <div>
                <label className="block font-sans text-xs font-medium text-slate-300 mb-1.5">
                  {hexMode === "decode"
                    ? "Nhập các byte Hex cách nhau bằng khoảng trắng"
                    : "Nhập chuỗi ASCII"}
                </label>
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder={hexMode === "decode" ? "VD: 41 42 43" : "Nhập chữ..."}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#060A11] border border-slate-700 focus:border-cyan-400 caret-cyan-400 focus:outline-none font-mono text-sm leading-7 tracking-wider text-white"
                />
              </div>

              {hexMode === "decode" && hexDecoded.rows.length > 0 && (
                <div className="rounded-sm bg-[#060A11] border border-white/10 p-3.5">
                  <div className="font-mono text-[11px] text-slate-400 mb-2">
                    PHÂN TÍCH TỪNG BYTE:
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs leading-6">
                    {hexDecoded.rows.map((row, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-sm border text-center ${
                          row.valid
                            ? "bg-slate-900 border-cyan-500/35"
                            : "bg-rose-500/10 border-rose-500/40"
                        }`}
                      >
                        <div className="text-cyan-400 font-bold">0x{row.hex}</div>
                        <div className="text-[10px] text-slate-500">DEC {row.dec}</div>
                        <div className="text-base text-emerald-400 font-bold mt-0.5">
                          {row.char}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Real-Time Output Box */}
          <div className="rounded-sm bg-[#060A11] border border-emerald-500/45 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-emerald-400">
                KẾT QUẢ GIẢI MÃ THỜI GIAN THỰC
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-sans text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Đã chép
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Sao chép
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-xl font-bold leading-7 tracking-widest text-white break-all min-h-[30px]">
              {currentResult || "—"}
            </div>
            {onApplyToInput && currentResult && (
              <button
                type="button"
                onClick={() => {
                  soundFX.playPin();
                  onApplyToInput(currentResult);
                  onClose();
                }}
                className="tactical-cut w-full py-2.5 font-display text-sm font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
              >
                CHÈN KẾT QUẢ VÀO Ô NHẬP MẬT MÃ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
