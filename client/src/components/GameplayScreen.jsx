import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Flame,
  KeyRound,
  Lightbulb,
  Lock,
  Paperclip,
  Pin,
  PinOff,
  Send,
  ShieldAlert,
  Star,
  Trash2,
  Volume2,
  VolumeX,
  Wrench,
  Zap,
} from "lucide-react";
import CharacterAvatar, { SPEAKER_META } from "./CharacterAvatar";
import EvidenceVisual from "./EvidenceVisual";
import BossTimer from "./BossTimer";
import soundFX from "../utils/sound";

// Split formula tokens in square brackets (e.g. [TÊN PHÒNG]) into styled monospace code badges
function renderBriefingWithFormula(text = "") {
  const parts = String(text).split(/(\[[^\]]+\])/g);
  return parts.map((part, idx) => {
    if (part.startsWith("[") && part.endsWith("]")) {
      return (
        <code
          key={idx}
          className="font-mono text-xs px-1.5 py-0.5 mx-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 align-baseline"
        >
          {part}
        </code>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function GameplayScreen({
  cases = [],
  activeCase,
  progress,
  totalStars,
  activeDocIndex,
  setActiveDocIndex,
  answerInput,
  setAnswerInput,
  submitting,
  errorFeedback,
  shakeInput,
  bossLocked,
  bossAttemptKey,
  onBossExpire,
  onBossRetry,
  onSegmentClick,
  onRemovePin,
  onClearPins,
  onUnlockHint,
  onSubmitAnswer,
  onSelectCase,
  onBackToMap,
  onOpenDecoder,
  isMuted,
  onToggleSound,
}) {
  const [mobileTab, setMobileTab] = useState("case");

  const isBoss = activeCase.difficulty === "Boss";
  const isCompleted = Boolean(progress.completedCases[activeCase.slug]);
  const activeSpeaker = SPEAKER_META[activeCase.speaker] || SPEAKER_META.SYSTEM;
  const activeDoc =
    activeCase.documents?.[activeDocIndex] || activeCase.documents?.[0] || null;
  const pinnedClues = progress.pinnedCluesByCase[activeCase.slug] || [];
  const unlockedHints = progress.unlockedHintsByCase[activeCase.slug] || [];
  const totalCluesInCase = (activeCase.documents || []).reduce(
    (acc, doc) => acc + (doc.segments || []).filter((s) => s.isClue).length,
    0
  );
  const hintCost = activeCase.chapterNumber === 1 ? 0 : 5;
  const caseFileTag = `CASE-FILE // NEO-SG-${String(activeCase.order).padStart(2, "0")}`;

  // 1. Compact Opening Dossier Card (font-sans Be Vietnam Pro for Dialogue & Briefing + code badges for formulas)
  const renderOpeningDossier = () => (
    <div
      className={`dossier-panel dossier-brackets ${
        isBoss ? "dossier-brackets-crimson" : ""
      } shrink-0 p-2.5 sm:p-3 overflow-hidden`}
    >
      <span
        className={`classified-stamp right-3 top-2 text-[10px] ${
          isBoss ? "text-[#F43F5E]" : "text-[#F59E0B]"
        }`}
      >
        {isBoss ? "TOP SECRET" : "CLASSIFIED"}
      </span>

      <div className="relative z-10 space-y-2">
        <div className="flex items-start gap-2.5">
          <CharacterAvatar speaker={activeCase.speaker} size={48} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <span
                className={`px-1.5 py-0.5 rounded border font-display text-[11px] font-bold uppercase tracking-wider ${activeSpeaker.badgeClass}`}
              >
                {activeSpeaker.name}
              </span>
              <span className="font-mono text-[10px] text-slate-400 hidden sm:inline">
                {caseFileTag}
              </span>
              {isCompleted && (
                <span className="ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-display text-[10px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  ĐÃ PHÁ GIẢI
                </span>
              )}
            </div>
            <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#F1F5F9] line-clamp-2">
              {activeCase.dialogue}
            </p>
          </div>
        </div>

        {/* Mission Briefing Strip: Be Vietnam Pro + Amber Monospace Formula Badges */}
        <div className="rounded-sm bg-amber-500/10 border border-amber-500/40 border-l-[3px] border-l-amber-400 px-3 py-1.5 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="font-sans text-sm md:text-[15px] leading-relaxed text-[#F1F5F9] font-medium">
            <span className="font-display text-xs font-bold text-amber-400 uppercase tracking-wider mr-1.5">
              NHIỆM VỤ:
            </span>
            {renderBriefingWithFormula(activeCase.briefing)}
          </p>
        </div>
      </div>
    </div>
  );

  // 2. Document Logs & Evidence Tabs (font-mono leading-7 for logs/evidence)
  const renderDocumentsPanel = (isDesktop) => (
    <div
      className={`dossier-panel dossier-brackets overflow-hidden flex flex-col ${
        isDesktop ? "flex-1 min-h-0" : ""
      }`}
    >
      <div className="relative z-10 shrink-0 px-3 py-1.5 bg-[#060A11]/85 border-b border-slate-800/90 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-100 truncate">
            HỒ SƠ &amp; TÀI LIỆU THU ĐƯỢC
          </span>
        </div>
        <span className="font-sans text-[11px] text-cyan-400 shrink-0">
          Nhấp dòng nghi vấn để ghim
        </span>
      </div>

      {/* Document Tabs */}
      <div className="relative z-10 shrink-0 flex items-center gap-1 px-2.5 pt-1.5 bg-[#060A11]/60 border-b border-slate-800/80 overflow-x-auto">
        {(activeCase.documents || []).map((doc, idx) => {
          const isSelected = idx === activeDocIndex;
          const docPinnedCount = (doc.segments || []).filter((s) =>
            pinnedClues.some((p) => p.id === s.id)
          ).length;

          return (
            <button
              key={doc.id || idx}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setActiveDocIndex(idx);
              }}
              className={`shrink-0 px-3 py-1.5 rounded-t-sm font-display text-xs font-bold uppercase tracking-wider border-t border-x transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-slate-900/90 text-amber-400 border-amber-400/40 -mb-px"
                  : "bg-slate-950/50 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              <span>{doc.title}</span>
              {docPinnedCount > 0 && (
                <span className="px-1.5 rounded font-mono bg-amber-500/20 text-amber-300 text-[10px]">
                  {docPinnedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scrollable Document Content (font-mono leading-7) */}
      {activeDoc && (
        <div
          className={`relative z-10 p-3 space-y-2 ${
            isDesktop ? "flex-1 min-h-0 overflow-y-auto" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-slate-400 pb-1.5 border-b border-slate-800/70">
            <span className="truncate">{activeDoc.meta || activeDoc.title}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#060A11] border border-slate-800 text-cyan-400 shrink-0">
              {activeDoc.docType || "FILE"}
            </span>
          </div>

          <div className="space-y-1.5">
            {(activeDoc.segments && activeDoc.segments.length > 0
              ? activeDoc.segments
              : [
                  {
                    id: `${activeDoc.id}-full`,
                    text: activeDoc.content,
                    isClue: activeDoc.isClue,
                    clueLabel: activeDoc.content,
                  },
                ]
            ).map((seg) => {
              const isPinned = pinnedClues.some((p) => p.id === seg.id);
              return (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => onSegmentClick(activeDoc, seg)}
                  className={`w-full text-left px-3 py-2 rounded-sm font-mono text-xs sm:text-[13px] leading-7 whitespace-pre-line transition-all border flex items-start justify-between gap-2.5 cursor-pointer ${
                    isPinned
                      ? "bg-amber-500/16 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.18)]"
                      : seg.isClue
                      ? "bg-[#060A11]/85 border-slate-800 hover:border-amber-400/65 hover:bg-amber-500/8 text-slate-100"
                      : "bg-[#060A11]/55 border-slate-800/60 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <span className="flex-1">{seg.text}</span>
                  {seg.isClue && (
                    <span
                      className={`shrink-0 mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-display text-[10px] font-bold uppercase tracking-wider ${
                        isPinned
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-800/90 text-slate-300"
                      }`}
                    >
                      <Pin className="w-2.5 h-2.5" />
                      {isPinned ? "ĐÃ GHIM" : "GHIM"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // 3. Clue Pinboard (font-mono leading-7 Evidence Slips)
  const renderClueBoard = (isDesktop) => (
    <div
      className={`dossier-panel dossier-brackets overflow-hidden flex flex-col ${
        isDesktop ? "flex-1 min-h-0" : ""
      }`}
    >
      <span className="classified-stamp right-4 bottom-3 text-xs text-amber-400">
        TOP SECRET
      </span>

      <div className="relative z-10 shrink-0 px-3 py-1.5 bg-[#060A11]/85 border-b border-slate-800/90 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Paperclip className="w-3.5 h-3.5 text-amber-400" />
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
            BẢNG GHIM CHỨNG CỨ
          </h3>
          <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/40">
            {pinnedClues.length}/{totalCluesInCase}
          </span>
        </div>

        {pinnedClues.length > 0 && (
          <button
            type="button"
            onClick={onClearPins}
            className="inline-flex items-center gap-1 font-sans text-[11px] text-slate-400 hover:text-rose-400 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Xóa hết
          </button>
        )}
      </div>

      <div
        className={`relative z-10 p-2.5 ${
          isDesktop ? "flex-1 min-h-0 overflow-y-auto" : ""
        }`}
      >
        {pinnedClues.length === 0 ? (
          <div className="h-full min-h-[100px] rounded-sm border border-dashed border-slate-700/75 bg-[#060A11]/55 p-4 flex flex-col items-center justify-center text-center gap-1.5">
            <PinOff className="w-4 h-4 text-slate-500" />
            <p className="font-sans text-xs font-medium text-slate-300">
              Chưa có mẩu chứng cứ nào được ghim
            </p>
            <p className="font-sans text-xs text-slate-500 max-w-xs leading-relaxed">
              Nhấp vào dòng khả nghi bên cột Tài liệu để kẹp chứng cứ vào đây.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {pinnedClues.map((pin, idx) => (
              <li
                key={pin.id}
                className="evidence-slip rounded-sm px-3 py-2 flex items-start justify-between gap-2"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      <Paperclip className="w-2.5 h-2.5" />
                      EVIDENCE #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-slate-400 truncate">
                      // {pin.docTitle}
                    </span>
                  </div>
                  <p className="font-mono text-xs leading-7 text-slate-100 break-words">
                    {pin.clueLabel}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemovePin(pin.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-400 shrink-0 cursor-pointer"
                  aria-label="Gỡ chứng cứ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  // 4. Compact 3-Tier Hint Tray (font-sans for Vietnamese hint prose)
  const renderHintsTray = () => (
    <div className="dossier-panel shrink-0 overflow-hidden flex flex-col max-h-[144px]">
      <div className="relative z-10 shrink-0 px-3 py-1.5 bg-[#060A11]/85 border-b border-slate-800/90 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
            TRỢ GIÚP 3 TẦNG
          </h3>
        </div>
        <span
          className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold border ${
            hintCost === 0
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
              : "bg-amber-500/15 text-amber-400 border-amber-500/40"
          }`}
        >
          {hintCost === 0 ? "MIỄN PHÍ" : `${hintCost} FP / TẦNG`}
        </span>
      </div>

      <div className="relative z-10 p-2 space-y-1 flex-1 min-h-0 overflow-y-auto">
        {(activeCase.hints || []).map((hint, idx) => {
          const isOpened = unlockedHints.includes(hint.tier);
          const prevTier = idx > 0 ? activeCase.hints[idx - 1].tier : null;
          const canOpen = !prevTier || unlockedHints.includes(prevTier);

          return (
            <div
              key={hint.tier}
              className={`rounded-sm border px-2.5 py-1.5 ${
                isOpened
                  ? "bg-cyan-500/10 border-cyan-500/40"
                  : "bg-[#060A11]/75 border-slate-800/80"
              }`}
            >
              {isOpened ? (
                <p className="font-sans text-xs sm:text-[13px] text-[#F1F5F9] leading-relaxed">
                  <span className="font-mono text-[10px] font-bold text-cyan-400 mr-1.5">
                    T{hint.tier}
                  </span>
                  {hint.text}
                </p>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-xs text-slate-300 truncate">
                    {hint.label}
                  </span>
                  <button
                    type="button"
                    disabled={!canOpen}
                    onClick={() => onUnlockHint(hint.tier)}
                    className={`shrink-0 px-2.5 py-0.5 rounded-sm font-display text-[11px] font-bold uppercase tracking-wider transition-all ${
                      canOpen
                        ? "bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-200 border border-slate-700 cursor-pointer"
                        : "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
                    }`}
                  >
                    {hintCost === 0 ? "MỞ" : `-${hintCost} FP`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // 5. Anchored Bottom Password Action Deck (font-mono input + font-display GIẢI MÃ CTA)
  const renderActionDeck = (isMobile = false) => (
    <div
      className={`shrink-0 ${
        isMobile
          ? "bg-[#060A11]/95 backdrop-blur-xl border-t border-amber-500/40 px-3 py-2.5"
          : `dossier-panel dossier-brackets ${
              isBoss ? "dossier-brackets-crimson" : ""
            } p-3`
      }`}
    >
      {!isMobile && (
        <div className="relative z-10 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <KeyRound
              className={`w-3.5 h-3.5 ${
                isBoss ? "text-rose-400" : "text-amber-400"
              }`}
            />
            <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
              KHÓA XÁC THỰC // {activeCase.slug.toUpperCase()}
            </span>
          </div>
          <span className="font-mono text-[10px] text-cyan-400">
            ENTER ĐỂ GIẢI MÃ
          </span>
        </div>
      )}

      {errorFeedback && (
        <div className="relative z-10 mb-2 rounded-sm bg-rose-500/15 border border-rose-500/50 px-2.5 py-1.5 font-sans text-xs text-rose-200 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="truncate">{errorFeedback}</span>
        </div>
      )}

      <form
        onSubmit={onSubmitAnswer}
        className={`relative z-10 flex items-center gap-2 ${
          shakeInput ? "animate-shake" : ""
        }`}
      >
        <input
          type="text"
          value={answerInput}
          disabled={submitting || bossLocked}
          onChange={(e) => setAnswerInput(e.target.value)}
          placeholder={
            bossLocked
              ? "Hết giờ — bấm Thử lại ở đồng hồ Boss"
              : activeCase.inputPlaceholder || "Nhập mật mã..."
          }
          autoComplete="off"
          spellCheck="false"
          className="flex-1 min-w-0 px-3 py-2.5 rounded-sm bg-[#060A11]/95 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 caret-cyan-400 focus:outline-none font-mono text-sm leading-7 tracking-[0.16em] uppercase text-white placeholder:font-sans placeholder:tracking-normal placeholder:normal-case placeholder:text-slate-500 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={submitting || bossLocked}
          className={`tactical-cut shrink-0 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-widest whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isBoss
              ? "bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              : "bg-amber-500/20 hover:bg-amber-500 border border-amber-400/80 text-amber-300 hover:text-slate-950 shadow-[0_0_18px_rgba(245,158,11,0.22)]"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>{submitting ? "..." : "GIẢI MÃ"}</span>
        </button>
      </form>
    </div>
  );

  return (
    <div className="relative z-10 h-dvh w-screen flex flex-col overflow-hidden">
      {/* TOP HEADER + 20-CASE STRIP (88px <= 96px) */}
      <header className="relative z-20 shrink-0 max-h-24 bg-[#060A11]/88 backdrop-blur-xl border-b border-white/10 flex flex-col">
        <div className="h-12 px-3 sm:px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onBackToMap();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-slate-900/90 hover:bg-slate-800 border border-white/15 font-display text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">BẢN ĐỒ</span>
            </button>

            <div className="min-w-0 flex items-center gap-1.5">
              <span
                className={`font-mono text-xs sm:text-sm font-bold ${
                  isBoss ? "text-rose-400" : "text-amber-400"
                }`}
              >
                #{String(activeCase.order).padStart(2, "0")}
              </span>
              <span className="text-slate-600 font-mono">//</span>
              <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-white truncate">
                {activeCase.title}
              </h2>
            </div>
          </div>

          <div className="shrink-0">
            {activeCase.timeLimit && (
              <BossTimer
                caseSlug={activeCase.slug}
                timeLimit={activeCase.timeLimit}
                isCompleted={isCompleted}
                attemptKey={bossAttemptKey}
                onExpire={onBossExpire}
                onRetry={onBossRetry}
                compact
              />
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-sm bg-slate-900/90 border border-amber-500/35 font-mono text-[11px]">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-bold text-amber-400">{totalStars}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-sm bg-slate-900/90 border border-cyan-500/35 font-mono text-[11px]">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="font-bold text-cyan-400">
                {progress.focusPoints}
              </span>
              <span className="text-slate-400 text-[9px]">FP</span>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenDecoder();
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/45 font-display text-xs font-bold uppercase tracking-wider text-cyan-300 whitespace-nowrap transition-colors cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden md:inline">CÔNG CỤ GIẢI MÃ</span>
            </button>

            <button
              type="button"
              onClick={onToggleSound}
              className="p-1.5 rounded-sm bg-slate-900/90 hover:bg-slate-800 border border-white/15 text-slate-300 hover:text-white cursor-pointer"
              aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Compact 20-Case Quick Strip (40px) */}
        <div className="h-10 px-3 sm:px-4 border-t border-white/10 bg-[#060A11]/70 flex items-center gap-1 overflow-x-auto">
          {cases.map((item) => {
            const locked = item.order > progress.unlockedOrder;
            const doneInfo = progress.completedCases[item.slug];
            const active = item.order === activeCase.order;
            const bossNode = item.difficulty === "Boss";

            return (
              <button
                key={item.slug}
                type="button"
                disabled={locked}
                onClick={() => {
                  soundFX.playClick();
                  onSelectCase?.(item.order);
                }}
                title={`#${String(item.order).padStart(2, "0")} ${item.title}`}
                className={`shrink-0 h-7 px-2 rounded-sm font-mono text-[10px] font-bold border transition-all flex items-center gap-1 ${
                  active
                    ? bossNode
                      ? "bg-rose-500/25 border-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.35)] cursor-pointer"
                      : "bg-amber-500/25 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)] cursor-pointer"
                    : doneInfo
                    ? "bg-emerald-500/12 border-emerald-500/45 text-emerald-400 hover:border-emerald-400 cursor-pointer"
                    : locked
                    ? "bg-slate-950/60 border-slate-800/70 text-slate-600 cursor-not-allowed"
                    : bossNode
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-400 hover:border-rose-400 cursor-pointer"
                    : "bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-amber-400/60 cursor-pointer"
                }`}
              >
                {locked ? (
                  <Lock className="w-2.5 h-2.5" />
                ) : bossNode ? (
                  <Flame className="w-2.5 h-2.5 text-rose-400" />
                ) : null}
                <span>{String(item.order).padStart(2, "0")}</span>
                {doneInfo && (
                  <span className="text-[8px] text-amber-400">
                    {"★".repeat(doneInfo.stars)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* DESKTOP 2-COLUMN PLAYFIELD */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-3.5 lg:p-3.5 flex-1 min-h-0 overflow-hidden max-w-[1600px] w-full mx-auto">
        <div className="lg:col-span-7 flex flex-col gap-3 min-h-0 overflow-hidden">
          {renderOpeningDossier()}
          <EvidenceVisual visualType={activeCase.visualType} isBoss={isBoss} />
          {renderDocumentsPanel(true)}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 min-h-0 overflow-hidden">
          {renderClueBoard(true)}
          {renderHintsTray()}
          {renderActionDeck(false)}
        </div>
      </div>

      {/* MOBILE PLAYFIELD */}
      <div className="flex lg:hidden flex-col flex-1 min-h-0 overflow-hidden">
        <div className="shrink-0 grid grid-cols-2 gap-1.5 p-2 bg-[#060A11]/90 border-b border-white/10">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMobileTab("case");
            }}
            className={`py-1.5 rounded-sm font-display text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
              mobileTab === "case"
                ? "bg-amber-500/18 text-amber-300 border-amber-400/60"
                : "bg-slate-900/80 text-slate-400 border-slate-800"
            }`}
          >
            1. HỒ SƠ &amp; VẬT CHỨNG
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMobileTab("board");
            }}
            className={`py-1.5 rounded-sm font-display text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
              mobileTab === "board"
                ? "bg-cyan-500/18 text-cyan-300 border-cyan-400/60"
                : "bg-slate-900/80 text-slate-400 border-slate-800"
            }`}
          >
            2. CHỨNG CỨ ({pinnedClues.length}) &amp; GỢI Ý
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3">
          {mobileTab === "case" ? (
            <>
              {renderOpeningDossier()}
              <EvidenceVisual
                visualType={activeCase.visualType}
                isBoss={isBoss}
              />
              {renderDocumentsPanel(false)}
            </>
          ) : (
            <>
              {renderClueBoard(false)}
              {renderHintsTray()}
            </>
          )}
        </div>

        {renderActionDeck(true)}
      </div>
    </div>
  );
}
