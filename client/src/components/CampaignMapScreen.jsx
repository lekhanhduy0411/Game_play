import { useState } from "react";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Flame,
  Lock,
  Star,
  Trash2,
  Zap,
} from "lucide-react";
import soundFX from "../utils/sound";

const CHAPTER_DEFINITIONS = [
  {
    number: 1,
    code: "CHƯƠNG 1 // LOCALHOST",
    subtitle: "Đêm mất tích ở Tầng 4",
    accent: "#F59E0B",
  },
  {
    number: 2,
    code: "CHƯƠNG 2 // PROXY SERVER",
    subtitle: "Mạng lưới Bóng Ma",
    accent: "#06B6D4",
  },
  {
    number: 3,
    code: "CHƯƠNG 3 // DEEP ARCHIVE",
    subtitle: "Những kẻ phản bội",
    accent: "#10B981",
  },
  {
    number: 4,
    code: "CHƯƠNG 4 // ZERO-DAY CORE",
    subtitle: "Giờ G hủy diệt",
    accent: "#F43F5E",
  },
];

export default function CampaignMapScreen({
  cases,
  progress,
  totalStars,
  onBackToTitle,
  onSelectCase,
  onResetProgress,
  onOpenCertificate,
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  const isAllCleared = Boolean(progress.completedCases["case-20"]);

  return (
    <div className="relative z-10 h-dvh w-screen flex flex-col overflow-hidden">
      {/* Compact Neo-Noir Top Bar */}
      <header className="h-14 shrink-0 px-4 sm:px-6 bg-[#060A11]/88 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onBackToTitle();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-900/80 hover:bg-slate-800 border border-white/15 font-display text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">MÀN HÌNH CHÍNH</span>
            <span className="sm:hidden">TRANG CHỦ</span>
          </button>

          <div className="hidden md:block truncate">
            <h1 className="font-display text-sm font-bold uppercase tracking-wider text-amber-400">
              BẢN ĐỒ HỒ SƠ MẬT // NEO-SAIGON (20 VỤ ÁN)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900/80 border border-amber-500/40 font-mono text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-amber-400">{totalStars}</span>
            <span className="text-slate-500">/60</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-900/80 border border-cyan-500/40 font-mono text-xs">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-cyan-400">
              {progress.focusPoints}
            </span>
            <span className="text-slate-400">FP</span>
          </div>

          {isAllCleared && (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenCertificate();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/50 font-display text-xs font-bold uppercase tracking-wider text-emerald-400 whitespace-nowrap cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CHỨNG NHẬN</span>
            </button>
          )}

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setConfirmReset(true);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-slate-900/80 hover:bg-rose-500/15 border border-white/15 hover:border-rose-500/50 font-display text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-rose-400 whitespace-nowrap transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">XÓA TIẾN ĐỘ</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-rose-500/15 border border-rose-500">
              <span className="font-sans text-xs text-rose-200 hidden sm:inline">
                Xóa hết?
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFX.playError();
                  setConfirmReset(false);
                  onResetProgress();
                }}
                className="px-2 py-0.5 rounded-sm bg-rose-500 text-white font-display text-[11px] font-bold uppercase tracking-wider cursor-pointer"
              >
                XÁC NHẬN
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setConfirmReset(false);
                }}
                className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 font-display text-[11px] font-bold uppercase tracking-wider cursor-pointer"
              >
                HỦY
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main 4-Chapter Circuit Network Hub */}
      <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 relative">
        <div className="max-w-[1440px] mx-auto h-full flex flex-col justify-center">
          {/* Desktop Glowing Horizontal Circuit Bridge */}
          <div className="hidden lg:block relative mb-3 px-6">
            <svg
              viewBox="0 0 1200 28"
              className="w-full h-6"
              fill="none"
              preserveAspectRatio="none"
            >
              <line x1="140" y1="14" x2="1060" y2="14" stroke="#1E293B" strokeWidth="2.5" />
              <line
                x1="140"
                y1="14"
                x2={
                  progress.unlockedOrder >= 16
                    ? "1060"
                    : progress.unlockedOrder >= 11
                    ? "760"
                    : progress.unlockedOrder >= 6
                    ? "450"
                    : "140"
                }
                y2="14"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animate-circuit"
              />
              {[140, 450, 760, 1060].map((cx, idx) => {
                const chapterUnlocked = progress.unlockedOrder >= idx * 5 + 1;
                return (
                  <g key={cx}>
                    <circle
                      cx={cx}
                      cy="14"
                      r="7"
                      fill="#060A11"
                      stroke={chapterUnlocked ? "#F59E0B" : "#334155"}
                      strokeWidth="2"
                    />
                    <circle
                      cx={cx}
                      cy="14"
                      r="3"
                      fill={chapterUnlocked ? "#06B6D4" : "#334155"}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 4-Column Classified Chapter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHAPTER_DEFINITIONS.map((chap) => {
              const chapterCases = cases.filter(
                (c) => c.chapterNumber === chap.number
              );
              const chapterDoneCount = chapterCases.filter(
                (c) => progress.completedCases[c.slug]
              ).length;

              return (
                <section
                  key={chap.number}
                  className="dossier-panel dossier-brackets p-3.5 flex flex-col"
                >
                  <span className="classified-stamp right-2 bottom-2 text-[9px] text-amber-400">
                    SECT-0{chap.number}
                  </span>

                  <div className="relative z-10 pb-2.5 mb-2.5 border-b border-white/10 flex items-start justify-between gap-2">
                    <div>
                      <h2
                        className="font-display text-sm font-bold uppercase tracking-wider"
                        style={{ color: chap.accent }}
                      >
                        {chap.code}
                      </h2>
                      <p className="font-sans text-xs text-slate-300 mt-0.5">
                        {chap.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#060A11] border border-slate-800 text-slate-300">
                      {chapterDoneCount}/5
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col">
                    {chapterCases.map((item, idx) => {
                      const isLocked = item.order > progress.unlockedOrder;
                      const doneInfo = progress.completedCases[item.slug];
                      const isCurrentTarget =
                        item.order === progress.unlockedOrder && !doneInfo;
                      const isBoss = item.difficulty === "Boss";

                      return (
                        <div key={item.slug} className="flex flex-col">
                          <button
                            type="button"
                            disabled={isLocked}
                            onClick={() => {
                              soundFX.playClick();
                              onSelectCase(item.order);
                            }}
                            className={`w-full text-left rounded-sm px-2.5 py-2 border transition-all flex items-center justify-between gap-2 ${
                              isLocked
                                ? "bg-[#060A11]/55 border-slate-800/75 text-slate-600 cursor-not-allowed"
                                : isBoss
                                ? doneInfo
                                  ? "bg-emerald-500/10 border-emerald-500/50 hover:border-emerald-400 text-white cursor-pointer"
                                  : "bg-rose-500/14 border-rose-500/70 hover:border-rose-400 shadow-[0_0_16px_rgba(244,63,94,0.2)] text-white cursor-pointer"
                                : isCurrentTarget
                                ? "bg-amber-500/14 border-amber-400 shadow-[0_0_16px_rgba(245,158,11,0.22)] text-white cursor-pointer"
                                : doneInfo
                                ? "bg-[#060A11]/85 border-emerald-500/40 hover:border-emerald-400 text-slate-100 cursor-pointer"
                                : "bg-[#060A11]/85 border-slate-700 hover:border-amber-400/70 text-slate-100 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className={`w-7 h-7 rounded-sm shrink-0 flex items-center justify-center font-mono text-[11px] font-bold border ${
                                  isLocked
                                    ? "bg-slate-900 border-slate-800 text-slate-600"
                                    : isBoss
                                    ? "bg-rose-500/20 border-rose-500 text-rose-400"
                                    : doneInfo
                                    ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400"
                                    : "bg-amber-500/15 border-amber-400/50 text-amber-400"
                                }`}
                              >
                                {isLocked ? (
                                  <Lock className="w-3 h-3" />
                                ) : (
                                  String(item.order).padStart(2, "0")
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="font-display text-xs font-bold uppercase tracking-wide truncate">
                                  {item.title}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  {isBoss ? (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded font-mono text-[9px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/55">
                                      <Flame className="w-2.5 h-2.5" />
                                      BOSS • {item.timeLimit}s
                                    </span>
                                  ) : (
                                    <span className="font-sans text-[11px] text-slate-400">
                                      {item.difficulty}
                                    </span>
                                  )}
                                  {isCurrentTarget && (
                                    <span className="font-mono text-[9px] text-amber-400 animate-pulse">
                                      ● MỞ
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 flex flex-col items-end gap-0.5">
                              {doneInfo ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <div className="flex items-center gap-0.5">
                                    {[1, 2, 3].map((s) => (
                                      <Star
                                        key={s}
                                        className={`w-2.5 h-2.5 ${
                                          s <= doneInfo.stars
                                            ? "text-amber-400 fill-amber-400"
                                            : "text-slate-700"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </>
                              ) : isLocked ? (
                                <span className="font-mono text-[9px] text-slate-600">
                                  LOCKED
                                </span>
                              ) : (
                                <span className="font-display text-[11px] font-bold text-cyan-400">
                                  VÀO →
                                </span>
                              )}
                            </div>
                          </button>

                          {idx < chapterCases.length - 1 && (
                            <div className="h-3 flex items-center pl-5">
                              <svg viewBox="0 0 12 14" className="w-3 h-3.5" fill="none">
                                <line
                                  x1="6"
                                  y1="0"
                                  x2="6"
                                  y2="14"
                                  stroke={
                                    doneInfo
                                      ? "#10B981"
                                      : item.order < progress.unlockedOrder
                                      ? chap.accent
                                      : "#1E293B"
                                  }
                                  strokeWidth="1.8"
                                  strokeDasharray={doneInfo ? undefined : "3 3"}
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
