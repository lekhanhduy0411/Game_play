import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Map,
  RefreshCw,
  Star,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from "lucide-react";
import soundFX from "../utils/sound";

export default function TitleScreen({
  serverStatus,
  serverError,
  loadElapsed,
  onRetryServer,
  completedCount,
  totalStars,
  unlockedOrder,
  isMuted,
  onToggleSound,
  onStartOrContinue,
  onOpenMap,
  onOpenPrologue,
}) {
  const isReady = serverStatus === "online";
  const hasProgress = completedCount > 0 || unlockedOrder > 1;
  const progressPct = Math.round((completedCount / 20) * 100);

  return (
    <div className="relative z-10 h-dvh w-screen overflow-hidden flex items-center px-6 sm:px-8 md:px-16 lg:px-24">
      {/* Subtle Top-Left Tactical Telemetry Line */}
      <div className="absolute top-5 left-6 sm:left-8 md:left-16 lg:left-24 font-mono text-[10px] tracking-[0.22em] text-slate-500 pointer-events-none">
        CASE-FILE // NEO-SG-26 // BUILD 1.0
      </div>

      {/* Far-Right Edge Minimal Radar Coordinate Scale (Leaves right 50% open for bg-title.png) */}
      <div className="hidden lg:flex fixed right-7 top-1/2 -translate-y-1/2 flex-col items-end gap-4 pointer-events-none select-none z-10 opacity-45">
        <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-400">
          10.7769° N
        </span>
        <div className="w-[1px] h-40 bg-gradient-to-b from-transparent via-amber-400/70 to-transparent relative">
          <span className="absolute -left-1.5 top-1/4 w-3 h-[1px] bg-amber-400/70" />
          <span className="absolute -left-2.5 top-1/2 w-5 h-[1px] bg-cyan-400" />
          <span className="absolute -left-1.5 top-3/4 w-3 h-[1px] bg-amber-400/70" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-amber-400">
          106.7009° E
        </span>
      </div>

      {/* LEFT HALF: Asymmetric Left-Aligned Tactical Identity & Controls */}
      <div className="w-full max-w-xl z-10 flex flex-col items-start text-left space-y-6">
        {/* Minimal Horizontal Tactical Badge (No Eye Emblem) */}
        <div className="inline-flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-amber-400 uppercase font-semibold">
            NEO-SAIGON // 2026 — HỒ SƠ ĐIỀU TRA MẬT
          </span>
        </div>

        {/* Display Game Title */}
        <div className="space-y-3">
          <h1 className="font-display font-bold text-5xl sm:text-6xl tracking-tight leading-none uppercase">
            <span className="text-[#F8FAFC] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              EREBUS
            </span>
            <span className="text-[#F43F5E] drop-shadow-[0_0_20px_rgba(244,63,94,0.45)]">
              : ZERO-DAY
            </span>
          </h1>

          {/* Story Description (Strictly font-sans Be Vietnam Pro) */}
          <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed max-w-md">
            Giữa đêm mưa Neo-Saigon, kiến trúc sư trưởng TS. Lê Minh Khôi đột
            ngột biến mất trước giờ kích hoạt siêu AI EREBUS-9. Xâm nhập 4 lớp
            bảo mật và giải mã 20 hồ sơ mật trước khi giao thức hủy diệt chạm về
            không.
          </p>
        </div>

        {/* Sleek Unboxed Campaign Progress Bar */}
        <div className="w-full max-w-md space-y-2 pt-1">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-slate-300 tracking-wider">
              TIẾN ĐỘ CHIẾN DỊCH:{" "}
              <strong className="text-amber-400">{completedCount}/20</strong> HỒ SƠ
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {totalStars}/60
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-900/90 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.75)] transition-all duration-500"
              style={{
                width: `${Math.max(progressPct, completedCount > 0 ? 5 : 2)}%`,
              }}
            />
          </div>
        </div>

        {/* Tactical Action Menu (Zero Square Brackets, Single-Line Guaranteed) */}
        <div className="w-full max-w-md flex flex-col gap-3 pt-1">
          {/* Primary Button: Tactical Glass-Amber with Gliding Arrow */}
          <button
            type="button"
            disabled={!isReady}
            onClick={() => {
              soundFX.playSuccess();
              onStartOrContinue();
            }}
            className="group tactical-cut w-full py-3.5 px-6 bg-amber-500/15 hover:bg-amber-500 border border-amber-400/70 font-display font-bold text-base uppercase tracking-widest text-amber-300 hover:text-slate-950 flex items-center justify-between transition-all duration-200 shadow-[0_0_24px_rgba(245,158,11,0.18)] hover:shadow-[0_0_32px_rgba(245,158,11,0.45)] cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
          >
            <span>
              {hasProgress ? "TIẾP TỤC CHIẾN DỊCH" : "BẮT ĐẦU NHIỆM VỤ"}
            </span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
          </button>

          {/* 2 Equal Single-Line Secondary Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              type="button"
              disabled={!isReady}
              onClick={() => {
                soundFX.playClick();
                onOpenMap();
              }}
              className="py-3 px-4 rounded-sm bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/15 hover:border-cyan-400/50 text-slate-200 font-display font-bold text-sm uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
            >
              <Map className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>BẢN ĐỒ HỒ SƠ</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenPrologue();
              }}
              className="py-3 px-4 rounded-sm bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-white/15 hover:border-cyan-400/50 text-slate-200 font-display font-bold text-sm uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>TỆP MỞ ĐẦU</span>
            </button>
          </div>
        </div>

        {/* Inline Server Error Retry (only when offline) */}
        {serverStatus === "error" && (
          <div className="w-full max-w-md rounded-sm bg-rose-500/15 border border-rose-500/50 px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-start gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-rose-200 leading-relaxed">
                {serverError || "Không thể kết nối tới máy chủ API."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onRetryServer();
              }}
              className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-rose-500 hover:bg-rose-400 text-white font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              THỬ LẠI
            </button>
          </div>
        )}
      </div>

      {/* Bottom Corner Telemetry & Sound Bar */}
      <div className="absolute bottom-5 left-6 right-6 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 flex flex-wrap items-center justify-between gap-3 z-10">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-slate-950/70 backdrop-blur-md border font-mono text-[11px] ${
            serverStatus === "online"
              ? "border-emerald-500/40 text-emerald-400"
              : serverStatus === "error"
              ? "border-rose-500/50 text-rose-400"
              : "border-amber-500/45 text-amber-400"
          }`}
        >
          {serverStatus === "online" ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span>SERVER RENDER: ONLINE</span>
            </>
          ) : serverStatus === "error" ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>SERVER: MẤT KẾT NỐI</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>ĐANG ĐÁNH THỨC SERVER... ({loadElapsed}s)</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-slate-950/70 hover:bg-slate-900 backdrop-blur-md border border-white/15 font-mono text-[11px] text-slate-200 transition-colors cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              <span>ÂM THANH: TẮT</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>ÂM THANH: BẬT</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
