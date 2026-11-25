import { useEffect, useState } from "react";
import { FastForward, ShieldCheck, Terminal, X } from "lucide-react";
import soundFX from "../utils/sound";

const PROLOGUE_HEADER = "[01:12:04 - NEO-SAIGON] TÍN HIỆU KHẨN CẤP TỪ KÊNH MÃ HÓA #KHOI-09...";
const PROLOGUE_BODY = `'Cipher, nếu cậu đọc được dòng này thì tôi đã không còn ở Phòng Lab Tầng 4 nữa. EREBUS-9 không phải là AI phục vụ đô thị — ai đó trong ban điều hành AetherCorp đã cấy mã độc vào lõi của nó trước giờ G. Tôi đã rút khóa gốc và rải manh mối qua 4 lớp bảo mật. Đừng tin bất kỳ ai ở trụ sở... ngoại trừ Khánh Vy. Hãy bắt đầu từ chiếc điện thoại của kỹ sư Hoàng Nam trước khi chúng xóa sạch tất cả!'`;

export function PrologueModal({ isOpen, onClose, ctaLabel = "TIẾP NHẬN CHIẾN DỊCH" }) {
  const [displayedLen, setDisplayedLen] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setDisplayedLen(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || displayedLen >= PROLOGUE_BODY.length) return;
    const timer = setTimeout(() => {
      setDisplayedLen((prev) => prev + 2);
      if (displayedLen % 6 === 0) {
        soundFX.playTypeTick();
      }
    }, 22);
    return () => clearTimeout(timer);
  }, [isOpen, displayedLen]);

  if (!isOpen) return null;

  const isFinished = displayedLen >= PROLOGUE_BODY.length;
  const shownBody = PROLOGUE_BODY.slice(0, displayedLen);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-[#060A11]/88 backdrop-blur-md">
      <div className="dossier-panel dossier-brackets w-full max-w-2xl overflow-hidden shadow-[0_0_55px_rgba(245,158,11,0.18)]">
        <span className="classified-stamp right-6 bottom-16 text-sm text-amber-400">
          TOP SECRET
        </span>

        {/* Header bar */}
        <div className="relative z-10 px-5 py-3.5 bg-[#060A11]/90 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-amber-400" />
            <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-amber-400">
              TỆP MỞ ĐẦU // TÍN HIỆU KHẨN #KHOI-09
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="relative z-10 p-5 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-sm bg-rose-500/15 text-rose-400 border border-rose-500/40 animate-pulse">
              PRIORITY: ZERO-DAY
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-amber-500/12 text-amber-400 border border-amber-500/35">
              NEO-SAIGON // 11.2026
            </span>
            <span className="px-2.5 py-1 rounded-sm bg-cyan-500/12 text-cyan-400 border border-cyan-500/35">
              RECIPIENT: ĐẶC VỤ CIPHER
            </span>
          </div>

          <div className="rounded-sm bg-[#060A11]/92 border border-white/10 p-5 min-h-[195px] max-h-[45dvh] overflow-y-auto space-y-3">
            <div className="font-mono text-xs text-amber-400 leading-6">
              {PROLOGUE_HEADER}
            </div>
            <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#F1F5F9]">
              {shownBody}
              {!isFinished && (
                <span className="inline-block w-2 h-4 ml-1 bg-amber-400 align-middle animate-pulse" />
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {!isFinished ? (
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setDisplayedLen(PROLOGUE_BODY.length);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-white/15 transition-colors cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                HIỂN THỊ NHANH
              </button>
            ) : (
              <span className="font-sans text-xs font-medium text-emerald-400">
                ✓ Đã giải mã hoàn tất tín hiệu cầu cứu
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                soundFX.playSuccess();
                onClose();
              }}
              className="tactical-cut inline-flex items-center gap-2 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-widest text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrologueModal;
