import {
  ArrowRight,
  Award,
  CheckCircle2,
  Map,
  RotateCcw,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import CharacterAvatar, { SPEAKER_META } from "./CharacterAvatar";
import soundFX from "../utils/sound";

const EPILOGUE_HEADER = "[00:00:01 - GIAO THỨC ZERO-DAY ĐÃ BỊ VÔ HIỆU HÓA]";
const EPILOGUE_BODY = `Ánh sáng đỏ rực trong phòng Lõi vụt tắt, nhường chỗ cho sắc xanh tĩnh lặng của EREBUS-9 sau khi phân hệ mã độc được gỡ bỏ. Cửa phòng cách âm tầng hầm bật mở — TS. Lê Minh Khôi và Khánh Vy an toàn bước ra ngoài. Toàn bộ bằng chứng giao dịch và chữ ký số của Trần Đăng Khoa đã được phát sóng tới Cơ quan An ninh Mạng Neo-Saigon. Nhiệm vụ hoàn tất, Đặc vụ Cipher!`;

function getAgentRank(totalStars) {
  if (totalStars >= 56) {
    return {
      title: "HUYỀN THOẠI PHÁP Y SỐ — CẤP OMEGA",
      badge: "S+ RANK",
      color: "text-amber-400",
    };
  }
  if (totalStars >= 46) {
    return {
      title: "BẬC THẦY GIẢI MÃ NEO-SAIGON",
      badge: "S RANK",
      color: "text-emerald-400",
    };
  }
  if (totalStars >= 34) {
    return {
      title: "ĐẶC VỤ MẠNG TINH NHUỆ",
      badge: "A RANK",
      color: "text-cyan-400",
    };
  }
  return {
    title: "ĐIỀU TRA VIÊN CHIẾN DỊCH EREBUS",
    badge: "B RANK",
    color: "text-slate-200",
  };
}

export default function VictoryOverlay({
  isOpen,
  victoryData,
  totalStars,
  focusPoints,
  completedCount,
  onNextCase,
  onBackToMap,
  onResetCampaign,
  onClose,
}) {
  if (!isOpen || !victoryData) return null;

  const { caseItem, earnedStars, fpAwarded, isFinal } = victoryData;
  const speakerMeta = SPEAKER_META[caseItem?.speaker] || SPEAKER_META.SYSTEM;

  if (isFinal) {
    const rank = getAgentRank(totalStars);

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#060A11]/92 backdrop-blur-lg overflow-y-auto">
        <div className="dossier-panel dossier-brackets w-full max-w-2xl overflow-hidden my-auto shadow-[0_0_70px_rgba(16,185,129,0.24)]">
          <div className="relative z-10 px-6 py-4 bg-gradient-to-r from-[#060A11] via-[#0c231c] to-[#060A11] border-b border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-emerald-400">
                EPILOGUE // CHIẾN DỊCH EREBUS: ZERO-DAY HOÀN TẤT
              </h2>
            </div>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-sm bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold">
              20/20 CLEAR
            </span>
          </div>

          <div className="relative z-10 p-5 sm:p-6 space-y-5 max-h-[82dvh] overflow-y-auto">
            <div className="rounded-sm bg-[#060A11] border border-emerald-500/35 p-4 sm:p-5 space-y-2.5">
              <div className="font-mono text-xs text-emerald-400">
                {EPILOGUE_HEADER}
              </div>
              <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#F1F5F9]">
                {EPILOGUE_BODY}
              </p>
            </div>

            <div className="rounded-sm bg-gradient-to-br from-[#0F172A] via-[#0B1220] to-[#060A11] border border-amber-400/50 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-sm bg-amber-500/15 border border-amber-400/50 flex items-center justify-center">
                    <Award className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-slate-400">
                      AGENT DOSSIER CARD // NEO-SAIGON CYBER BUREAU
                    </div>
                    <div className="font-display text-lg font-bold uppercase tracking-wider text-white">
                      CHỨNG NHẬN ĐẶC VỤ CIPHER
                    </div>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-sm font-mono text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/45">
                  {rank.badge}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-sm bg-[#060A11]/90 border border-white/10 p-3 text-center">
                  <div className="font-mono text-[10px] text-slate-400">TỔNG SAO</div>
                  <div className="mt-1 flex items-center justify-center gap-1 text-lg sm:text-xl font-bold font-mono text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {totalStars}/60
                  </div>
                </div>
                <div className="rounded-sm bg-[#060A11]/90 border border-white/10 p-3 text-center">
                  <div className="font-mono text-[10px] text-slate-400">HỒ SƠ</div>
                  <div className="mt-1 text-lg sm:text-xl font-bold font-mono text-emerald-400">
                    {completedCount}/20
                  </div>
                </div>
                <div className="rounded-sm bg-[#060A11]/90 border border-white/10 p-3 text-center">
                  <div className="font-mono text-[10px] text-slate-400">FOCUS PTS</div>
                  <div className="mt-1 text-lg sm:text-xl font-bold font-mono text-cyan-400">
                    {focusPoints} FP
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="font-sans text-xs text-slate-400">
                  Danh hiệu đạt được:
                </span>
                <span className={`font-display text-sm font-bold uppercase tracking-wider ${rank.color}`}>
                  {rank.title}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onBackToMap();
                }}
                className="tactical-cut py-3 px-4 font-display text-sm font-bold uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.35)] cursor-pointer"
              >
                <Map className="w-4 h-4" />
                VỀ BẢN ĐỒ HỒ SƠ
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onResetCampaign();
                }}
                className="py-3 px-4 rounded-sm font-display text-sm font-bold uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/50 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                CHƠI LẠI CHIẾN DỊCH
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#060A11]/88 backdrop-blur-md">
      <div className="dossier-panel dossier-brackets w-full max-w-lg overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.22)]">
        <div className="relative z-10 px-5 py-3.5 bg-gradient-to-r from-[#060A11] via-[#0c241d] to-[#060A11] border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-display text-sm font-bold uppercase tracking-wider text-emerald-400">
              PHÁ KHÓA THÀNH CÔNG // #{String(caseItem.order).padStart(2, "0")}
            </span>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white cursor-pointer"
            >
              ĐÓNG
            </button>
          )}
        </div>

        <div className="relative z-10 p-6 space-y-5 text-center">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
              {caseItem.title}
            </h2>
            <p className="font-mono text-xs text-amber-400 mt-1">
              {caseItem.chapter}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 py-1.5">
            {[1, 2, 3].map((starNum) => {
              const earned = starNum <= earnedStars;
              return (
                <div
                  key={starNum}
                  className={earned ? "animate-star-pop" : "opacity-30"}
                  style={{ animationDelay: `${(starNum - 1) * 160}ms` }}
                >
                  <Star
                    className={`w-11 h-11 ${
                      earned
                        ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_16px_rgba(245,158,11,0.65)]"
                        : "text-slate-700"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-cyan-500/12 border border-cyan-500/40 font-mono text-xs font-bold text-cyan-400">
            <Zap className="w-3.5 h-3.5" />
            <span>
              {fpAwarded > 0
                ? `+${fpAwarded} FOCUS POINTS (TỔNG: ${focusPoints} FP)`
                : `ĐÃ HOÀN TẤT TRƯỚC ĐÓ (TỔNG: ${focusPoints} FP)`}
            </span>
          </div>

          <div className="rounded-sm bg-[#060A11] border border-white/10 p-4 text-left flex items-start gap-3">
            <CharacterAvatar speaker={caseItem.speaker} size={52} />
            <div className="min-w-0 space-y-1">
              <span
                className={`inline-block px-2 py-0.5 rounded-sm border font-display text-[11px] font-bold uppercase tracking-wider ${speakerMeta.badgeClass}`}
              >
                {speakerMeta.name}
              </span>
              <p className="font-sans text-sm md:text-[15px] text-[#F1F5F9] leading-relaxed">
                {caseItem.victoryNote ||
                  "Tuyệt vời Đặc vụ Cipher! Chúng ta đã tiến gần hơn tới sự thật đằng sau EREBUS-9."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onBackToMap();
              }}
              className="py-3 px-4 rounded-sm font-display text-sm font-bold uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 bg-slate-900/75 hover:bg-slate-800 text-slate-200 border border-white/15 cursor-pointer"
            >
              <Map className="w-4 h-4 text-cyan-400" />
              VỀ BẢN ĐỒ
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playSuccess();
                onNextCase();
              }}
              className="group tactical-cut py-3 px-4 font-display text-sm font-bold uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              <span>HỒ SƠ KẾ TIẾP</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
