import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pin } from "lucide-react";
import CyberCanvasBg from "./components/CyberCanvasBg";
import TitleScreen from "./components/TitleScreen";
import CampaignMapScreen from "./components/CampaignMapScreen";
import GameplayScreen from "./components/GameplayScreen";
import PrologueModal from "./components/StoryModals";
import DecoderDrawer from "./components/DecoderDrawer";
import VictoryOverlay from "./components/VictoryOverlay";
import soundFX from "./utils/sound";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

const STORAGE_KEY = "erebus_zeroday_campaign_save_v2";

const DEFAULT_PROGRESS = {
  unlockedOrder: 1,
  completedCases: {}, // { [slug]: { stars, attempts, hintsUsed } }
  focusPoints: 30,
  hasSeenPrologue: false,
  pinnedCluesByCase: {}, // { [slug]: [{ id, docTitle, text, clueLabel }] }
  unlockedHintsByCase: {}, // { [slug]: number[] }
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedCases: parsed.completedCases || {},
      pinnedCluesByCase: parsed.pinnedCluesByCase || {},
      unlockedHintsByCase: parsed.unlockedHintsByCase || {},
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function calculateStars(hintsUsed, wrongAttempts) {
  if (hintsUsed === 0 && wrongAttempts <= 1) return 3;
  if (hintsUsed <= 1 && wrongAttempts <= 3) return 2;
  return 1;
}

export default function App() {
  // 5-Screen Game Flow state: 'TITLE' | 'MAP' | 'PLAYING'
  const [screen, setScreen] = useState("TITLE");
  const [cases, setCases] = useState([]);
  const [serverStatus, setServerStatus] = useState("waking"); // 'waking' | 'online' | 'error'
  const [serverError, setServerError] = useState("");
  const [loadElapsed, setLoadElapsed] = useState(0);

  // Campaign Persistent Progress
  const [progress, setProgress] = useState(loadProgress);
  const [activeOrder, setActiveOrder] = useState(() =>
    Math.min(20, Math.max(1, loadProgress().unlockedOrder || 1))
  );
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  // Active Gameplay State
  const [answerInput, setAnswerInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState("");
  const [shakeInput, setShakeInput] = useState(false);
  const [wrongAttemptsByCase, setWrongAttemptsByCase] = useState({});
  const [bossLocked, setBossLocked] = useState(false);
  const [bossAttemptKey, setBossAttemptKey] = useState(0);
  const [clueToast, setClueToast] = useState("");

  // Overlay States (z-30 & z-40)
  const [showPrologue, setShowPrologue] = useState(false);
  const [enterGameAfterPrologue, setEnterGameAfterPrologue] = useState(false);
  const [showDecoder, setShowDecoder] = useState(false);
  const [victoryData, setVictoryData] = useState(null);
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted());

  const toastTimerRef = useRef(null);

  // Persist campaign save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  // Wake-up timer while server boots
  useEffect(() => {
    if (serverStatus !== "waking") return;
    setLoadElapsed(0);
    const id = setInterval(() => setLoadElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [serverStatus]);

  const fetchCases = useCallback(async () => {
    setServerStatus("waking");
    setServerError("");
    try {
      const response = await fetch(`${API_BASE}/api/cases`, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(
          errPayload.error || `Máy chủ phản hồi mã lỗi ${response.status}`
        );
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(
          "Cơ sở dữ liệu chưa có hồ sơ vụ án. Hãy chạy `npm run seed` ở thư mục server."
        );
      }
      setCases(data);
      setServerStatus("online");
    } catch (err) {
      setServerError(
        err.message ||
          "Không thể kết nối tới máy chủ API. Kiểm tra biến VITE_API_URL và trạng thái Render."
      );
      setServerStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const activeCase = useMemo(() => {
    return cases.find((c) => c.order === activeOrder) || cases[0] || null;
  }, [cases, activeOrder]);

  // Reset per-case local UI state when switching case
  useEffect(() => {
    setActiveDocIndex(0);
    setAnswerInput("");
    setErrorFeedback("");
    setBossLocked(false);
    setBossAttemptKey((k) => k + 1);
  }, [activeOrder, screen]);

  const showToast = useCallback((msg) => {
    setClueToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setClueToast(""), 2400);
  }, []);

  const totalStars = useMemo(() => {
    return Object.values(progress.completedCases).reduce(
      (sum, item) => sum + (item?.stars || 0),
      0
    );
  }, [progress.completedCases]);

  const completedCount = useMemo(
    () => Object.keys(progress.completedCases).length,
    [progress.completedCases]
  );

  const handleToggleSound = () => {
    const nextMuted = soundFX.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundFX.playClick();
  };

  // Title Screen CTA: Start new campaign (via Prologue) or Continue highest unlocked case
  const handleStartOrContinue = () => {
    const targetOrder = Math.min(20, Math.max(1, progress.unlockedOrder || 1));
    setActiveOrder(targetOrder);
    if (!progress.hasSeenPrologue) {
      setEnterGameAfterPrologue(true);
      setShowPrologue(true);
    } else {
      setScreen("PLAYING");
    }
  };

  const handleClosePrologue = () => {
    setShowPrologue(false);
    setProgress((prev) =>
      prev.hasSeenPrologue ? prev : { ...prev, hasSeenPrologue: true }
    );
    if (enterGameAfterPrologue) {
      setEnterGameAfterPrologue(false);
      setScreen("PLAYING");
    }
  };

  const handleSelectCaseFromMap = (order) => {
    setActiveOrder(order);
    setVictoryData(null);
    setScreen("PLAYING");
  };

  const handleSegmentClick = (doc, seg) => {
    if (!activeCase) return;
    if (!seg.isClue) {
      soundFX.playClick();
      showToast("Đoạn dữ liệu này không chứa dấu hiệu bất thường.");
      return;
    }

    const slug = activeCase.slug;
    const currentPinned = progress.pinnedCluesByCase[slug] || [];
    const exists = currentPinned.some((item) => item.id === seg.id);

    if (exists) {
      soundFX.playUnpin();
      setProgress((prev) => ({
        ...prev,
        pinnedCluesByCase: {
          ...prev.pinnedCluesByCase,
          [slug]: (prev.pinnedCluesByCase[slug] || []).filter(
            (item) => item.id !== seg.id
          ),
        },
      }));
      showToast("Đã gỡ manh mối khỏi Bảng Ghim.");
    } else {
      soundFX.playPin();
      const newPin = {
        id: seg.id,
        docTitle: doc.title,
        text: seg.text,
        clueLabel: seg.clueLabel || seg.text,
      };
      setProgress((prev) => ({
        ...prev,
        pinnedCluesByCase: {
          ...prev.pinnedCluesByCase,
          [slug]: [...(prev.pinnedCluesByCase[slug] || []), newPin],
        },
      }));
      showToast("Đã ghim manh mối sang Bảng Ghim!");
    }
  };

  const handleRemovePin = (pinId) => {
    if (!activeCase) return;
    soundFX.playUnpin();
    const slug = activeCase.slug;
    setProgress((prev) => ({
      ...prev,
      pinnedCluesByCase: {
        ...prev.pinnedCluesByCase,
        [slug]: (prev.pinnedCluesByCase[slug] || []).filter(
          (item) => item.id !== pinId
        ),
      },
    }));
  };

  const handleClearPins = () => {
    if (!activeCase) return;
    soundFX.playUnpin();
    const slug = activeCase.slug;
    setProgress((prev) => ({
      ...prev,
      pinnedCluesByCase: {
        ...prev.pinnedCluesByCase,
        [slug]: [],
      },
    }));
  };

  const handleUnlockHint = (tier) => {
    if (!activeCase) return;
    const slug = activeCase.slug;
    const unlocked = progress.unlockedHintsByCase[slug] || [];
    if (unlocked.includes(tier)) return;

    const isFreeChapter = activeCase.chapterNumber === 1;
    const cost = isFreeChapter ? 0 : 5;

    if (!isFreeChapter && progress.focusPoints < cost) {
      soundFX.playError();
      showToast("Không đủ 5 Focus Points! Phá giải hồ sơ để nhận thêm FP.");
      return;
    }

    soundFX.playPin();
    setProgress((prev) => ({
      ...prev,
      focusPoints: Math.max(0, prev.focusPoints - cost),
      unlockedHintsByCase: {
        ...prev.unlockedHintsByCase,
        [slug]: [...(prev.unlockedHintsByCase[slug] || []), tier],
      },
    }));
  };

  const handleVerifyAnswer = async (e) => {
    e.preventDefault();
    if (!activeCase || submitting || bossLocked) return;

    const trimmed = answerInput.trim();
    if (!trimmed) {
      soundFX.playError();
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 380);
      setErrorFeedback("Vui lòng nhập mật mã trước khi giải mã!");
      return;
    }

    setSubmitting(true);
    setErrorFeedback("");

    try {
      const response = await fetch(
        `${API_BASE}/api/cases/${activeCase.slug}/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userAnswer: trimmed }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Lỗi xác thực từ máy chủ.");
      }

      if (data.isCorrect) {
        const slug = activeCase.slug;
        const alreadyDone = Boolean(progress.completedCases[slug]);
        const hintsUsed = (progress.unlockedHintsByCase[slug] || []).length;
        const wrongCount = wrongAttemptsByCase[slug] || 0;
        const earnedStars = calculateStars(hintsUsed, wrongCount);
        const fpAwarded = alreadyDone ? 0 : 10;
        const nextUnlocked = Math.min(
          20,
          Math.max(progress.unlockedOrder, activeCase.order + 1)
        );

        setProgress((prev) => {
          const prevStars = prev.completedCases[slug]?.stars || 0;
          return {
            ...prev,
            unlockedOrder: Math.max(prev.unlockedOrder, nextUnlocked),
            focusPoints: prev.focusPoints + fpAwarded,
            completedCases: {
              ...prev.completedCases,
              [slug]: {
                stars: Math.max(prevStars, earnedStars),
                attempts: wrongCount + 1,
                hintsUsed,
              },
            },
          };
        });

        const isFinal = activeCase.order === 20;
        if (isFinal) {
          soundFX.playVictoryFanfare();
        } else {
          soundFX.playSuccess();
        }

        setVictoryData({
          caseItem: activeCase,
          earnedStars,
          fpAwarded,
          isFinal,
        });
      } else {
        soundFX.playError();
        setShakeInput(true);
        setTimeout(() => setShakeInput(false), 380);
        setWrongAttemptsByCase((prev) => ({
          ...prev,
          [activeCase.slug]: (prev[activeCase.slug] || 0) + 1,
        }));
        setErrorFeedback(
          "TRUY CẬP BỊ TỪ CHỐI — Mật mã chưa chính xác. Kiểm tra lại manh mối!"
        );
      }
    } catch (err) {
      soundFX.playError();
      setErrorFeedback(err.message || "Mất kết nối tới máy chủ xác thực.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setWrongAttemptsByCase({});
    setActiveOrder(1);
    setVictoryData(null);
    setScreen("TITLE");
  };

  const handleOpenCertificateFromMap = () => {
    const finalCase = cases.find((c) => c.order === 20) || cases[cases.length - 1];
    if (!finalCase) return;
    setVictoryData({
      caseItem: finalCase,
      earnedStars: progress.completedCases["case-20"]?.stars || 3,
      fpAwarded: 0,
      isFinal: true,
    });
  };

  const bgVariant =
    screen === "TITLE"
      ? "TITLE"
      : screen === "PLAYING" && activeCase?.difficulty === "Boss"
      ? "BOSS"
      : "DESK";

  return (
    <div className="h-dvh w-screen overflow-hidden relative bg-[#060A11] text-slate-100">
      {/* LAYER z-0: Cinematic Background Artwork + Readability Veil + Rain Canvas */}
      <CyberCanvasBg variant={bgVariant} />

      {/* SCREEN 1 (z-10): TITLE SCREEN */}
      {screen === "TITLE" && (
        <TitleScreen
          serverStatus={serverStatus}
          serverError={serverError}
          loadElapsed={loadElapsed}
          onRetryServer={fetchCases}
          completedCount={completedCount}
          totalStars={totalStars}
          unlockedOrder={progress.unlockedOrder}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          onStartOrContinue={handleStartOrContinue}
          onOpenMap={() => setScreen("MAP")}
          onOpenPrologue={() => {
            setEnterGameAfterPrologue(false);
            setShowPrologue(true);
          }}
        />
      )}

      {/* SCREEN 2 (z-10): CAMPAIGN MAP HUB (4 CHAPTERS / 20 CIRCUIT NODES) */}
      {screen === "MAP" && (
        <CampaignMapScreen
          cases={cases}
          progress={progress}
          totalStars={totalStars}
          onBackToTitle={() => setScreen("TITLE")}
          onSelectCase={handleSelectCaseFromMap}
          onResetProgress={handleResetProgress}
          onOpenCertificate={handleOpenCertificateFromMap}
        />
      )}

      {/* SCREEN 3 (z-10 & z-20): IN-GAME HUD VIEWPORT */}
      {screen === "PLAYING" && activeCase && (
        <GameplayScreen
          cases={cases}
          activeCase={activeCase}
          progress={progress}
          totalStars={totalStars}
          activeDocIndex={activeDocIndex}
          setActiveDocIndex={setActiveDocIndex}
          answerInput={answerInput}
          setAnswerInput={setAnswerInput}
          submitting={submitting}
          errorFeedback={errorFeedback}
          shakeInput={shakeInput}
          bossLocked={bossLocked}
          bossAttemptKey={bossAttemptKey}
          onBossExpire={() => setBossLocked(true)}
          onBossRetry={() => {
            setBossLocked(false);
            setErrorFeedback("");
            setBossAttemptKey((k) => k + 1);
          }}
          onSegmentClick={handleSegmentClick}
          onRemovePin={handleRemovePin}
          onClearPins={handleClearPins}
          onUnlockHint={handleUnlockHint}
          onSubmitAnswer={handleVerifyAnswer}
          onSelectCase={handleSelectCaseFromMap}
          onBackToMap={() => setScreen("MAP")}
          onOpenDecoder={() => setShowDecoder(true)}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* Subtle Floating Clue Pin Toast (z-20) */}
      {clueToast && (
        <div className="fixed bottom-16 lg:bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-md bg-[#0B1220]/96 border border-[#F59E0B]/60 shadow-[0_0_24px_rgba(245,158,11,0.28)] font-mono text-xs text-[#F59E0B] flex items-center gap-2 pointer-events-none">
          <Pin className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">{clueToast}</span>
        </div>
      )}

      {/* LAYER z-30: MODAL OVERLAYS (PROLOGUE & QUICK DECODER) */}
      <PrologueModal
        isOpen={showPrologue}
        onClose={handleClosePrologue}
        ctaLabel={
          enterGameAfterPrologue ? "VÀO HỒ SƠ ĐẦU TIÊN →" : "ĐÓNG TỆP MỞ ĐẦU"
        }
      />

      <DecoderDrawer
        isOpen={showDecoder}
        onClose={() => setShowDecoder(false)}
        onApplyToInput={
          screen === "PLAYING" ? (val) => setAnswerInput(val) : undefined
        }
      />

      {/* LAYER z-40: VICTORY OVERLAY & FINAL EPILOGUE AGENT DOSSIER */}
      <VictoryOverlay
        isOpen={Boolean(victoryData)}
        victoryData={victoryData}
        totalStars={totalStars}
        focusPoints={progress.focusPoints}
        completedCount={completedCount}
        onNextCase={() => {
          const nextOrder = Math.min(20, (victoryData?.caseItem?.order || 1) + 1);
          setVictoryData(null);
          setActiveOrder(nextOrder);
          setScreen("PLAYING");
        }}
        onBackToMap={() => {
          setVictoryData(null);
          setScreen("MAP");
        }}
        onResetCampaign={handleResetProgress}
        onClose={() => setVictoryData(null)}
      />
    </div>
  );
}
