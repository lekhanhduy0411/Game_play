import { useEffect, useState } from "react";
import { AlertTriangle, Clock, RotateCcw, ShieldCheck } from "lucide-react";
import soundFX from "../utils/sound";

export default function BossTimer({
  caseSlug,
  timeLimit,
  isCompleted,
  attemptKey,
  onExpire,
  onRetry,
  compact = true,
}) {
  const [remaining, setRemaining] = useState(timeLimit || 0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setRemaining(timeLimit || 0);
    setExpired(false);
  }, [caseSlug, timeLimit, attemptKey]);

  useEffect(() => {
    if (!timeLimit || isCompleted || expired) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          setExpired(true);
          soundFX.playBossAlarm();
          onExpire?.();
          return 0;
        }
        if (next <= 15) {
          soundFX.playTick(next <= 5);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit, isCompleted, expired, onExpire]);

  if (!timeLimit) return null;

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  const progressPct = Math.max(0, Math.min(100, (remaining / timeLimit) * 100));
  const isDanger = remaining <= 20 && !isCompleted;

  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1 rounded-md border transition-all ${
        isCompleted
          ? "bg-[#10B981]/12 border-[#10B981]/50 text-[#10B981]"
          : expired
          ? "bg-[#F43F5E]/25 border-[#F43F5E] text-[#F43F5E] shadow-[0_0_18px_rgba(244,63,94,0.45)]"
          : isDanger
          ? "bg-[#F43F5E]/18 border-[#F43F5E] text-[#F43F5E] animate-boss-pulse"
          : "bg-[#F43F5E]/10 border-[#F43F5E]/45 text-[#F59E0B]"
      }`}
    >
      {isCompleted ? (
        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#10B981]" />
      ) : isDanger || expired ? (
        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-[#F43F5E] animate-pulse" />
      ) : (
        <Clock className="w-3.5 h-3.5 shrink-0 text-[#F59E0B]" />
      )}

      <div className="flex flex-col min-w-[70px]">
        <div className="flex items-center justify-between gap-1.5">
          {compact && (
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-80 hidden sm:inline">
              {isCompleted ? "SAFE" : expired ? "LOCK" : "BOSS"}
            </span>
          )}
          <span className="font-mono text-sm font-extrabold tabular-nums leading-none">
            {isCompleted ? "CLEAR" : `${minutes}:${seconds}`}
          </span>
        </div>
        <div className="mt-1 h-1 w-full rounded-full bg-slate-900 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isCompleted
                ? "bg-[#10B981]"
                : isDanger || expired
                ? "bg-[#F43F5E]"
                : "bg-gradient-to-r from-[#F59E0B] to-[#F43F5E]"
            }`}
            style={{ width: `${isCompleted ? 100 : progressPct}%` }}
          />
        </div>
      </div>

      {expired && !isCompleted && (
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onRetry?.();
          }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#F43F5E] hover:bg-[#fb5774] text-white cursor-pointer"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          THỬ LẠI
        </button>
      )}
    </div>
  );
}
