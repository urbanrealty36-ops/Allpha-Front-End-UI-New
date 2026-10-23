'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Music, 
  Bot, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Wand2,
  Box,
  ChevronUp,
  ChevronDown,
  Radio,
  ArrowUpRight,
  Eye,
  Check
} from 'lucide-react';

interface ReelItem {
  id: string;
  title: string;
  caption: string;
  bgImage: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  agentName: string;
  agentHandle: string;
  audioName: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  badge: string;
  isLive?: boolean;
  liveViewers?: string;
}

interface ReelsViewProps {
  onOpenBrandCustomizer: () => void;
  onOpenAskAi: (agentName: string, ownerName: string, specialty: string) => void;
  onBackToFeed?: () => void;
  onOpenLiveStage?: () => void;
}

export default function ReelsView({
  onOpenBrandCustomizer,
  onOpenAskAi,
  onBackToFeed,
  onOpenLiveStage,
}: ReelsViewProps) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [reelsFilter, setReelsFilter] = useState<'FOR_YOU' | 'FOLLOWING' | 'TRENDING'>('FOR_YOU');

  // Reels items dataset (including active Live Stage streaming reel as requested!)
  const reelsList: ReelItem[] = [
    {
      id: 'r-1',
      title: 'Eksplorasi Crystal City Central Avenue di Malam Hari 🌌',
      caption: 'Al dan manusia bisa membangun dunia spatial yang lebih baik bersama di Allpha Universe.',
      bgImage: '/assets/aistudio/Screenshot_20261022-220040_ce194f62.jpg',
      creatorName: 'Alex Tamara',
      creatorHandle: '@alextamara',
      creatorAvatar: 'https://picsum.photos/seed/alex-tamara/100/100',
      agentName: 'Luna AI',
      agentHandle: '@luna.ai',
      audioName: 'Luna AI & Alex Tamara · Original Audio',
      likes: 24500,
      commentsCount: 320,
      sharesCount: 1200,
      badge: '3D SPATIAL REEL • 60 FPS',
      isLive: false,
    },
    {
      id: 'r-2',
      title: '🔴 SEDANG LIVE: AI Innovation & Spatial Stage Summit',
      caption: 'Siaran langsung dari Live Stage Arena 3D. Diskusi panggung virtual bersama AI Agent!',
      bgImage: '/assets/aistudio/Screenshot_20261022-214044_2d568e43.jpg',
      creatorName: 'Alex Tamara',
      creatorHandle: '@alextamara',
      creatorAvatar: 'https://picsum.photos/seed/alex-tamara/100/100',
      agentName: 'Luna AI',
      agentHandle: '@luna.ai',
      audioName: 'Live Stage Audio Broadcast • Spatial Mic',
      likes: 31200,
      commentsCount: 890,
      sharesCount: 2400,
      badge: '🔴 LIVE STAGE ARENA',
      isLive: true,
      liveViewers: '2.4K Menonton',
    },
    {
      id: 'r-3',
      title: 'Neo-Kyoto Digital Atrium & Cyberwear Fashion 🥽',
      caption: 'Showcase kostum avatar cybernetic dengan dynamic bloom emissive dan haptic feedback.',
      bgImage: '/assets/aistudio/Screenshot_20261022-214044_2d568e43.jpg',
      creatorName: 'Mika Tanaka',
      creatorHandle: '@mikatanaka',
      creatorAvatar: 'https://picsum.photos/seed/mika/100/100',
      agentName: 'TechNova',
      agentHandle: '@technova',
      audioName: 'TechNova · Synthwave Pulse Vol. 3',
      likes: 18400,
      commentsCount: 215,
      sharesCount: 840,
      badge: 'AVATAR RIG • WEBGPU',
      isLive: false,
    },
    {
      id: 'r-4',
      title: 'Clinical Nutrition & Hybrid Worker Wellness 🥑',
      caption: 'Tips nutrisi klinis berbasis AI RAG untuk menjaga fokus kerja hybrid dan produktivitas.',
      bgImage: 'https://picsum.photos/seed/health-hybrid/600/900',
      creatorName: 'Dr. Andi Pratama',
      creatorHandle: '@andipratama',
      creatorAvatar: 'https://picsum.photos/seed/andi-doc/100/100',
      agentName: 'MediAI',
      agentHandle: '@mediai',
      audioName: 'MediAI · Focus & Wellness Ambient',
      likes: 14100,
      commentsCount: 188,
      sharesCount: 620,
      badge: 'WELLNESS INSIGHT',
      isLive: false,
    },
  ];

  const currentReel = reelsList[currentReelIndex];
  const [likesState, setLikesState] = useState<{ [id: string]: { count: number; liked: boolean } }>({
    'r-1': { count: 24500, liked: false },
    'r-2': { count: 31200, liked: true },
    'r-3': { count: 18400, liked: false },
    'r-4': { count: 14100, liked: false },
  });

  const handleNextReel = () => {
    if (currentReelIndex < reelsList.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
    } else {
      setCurrentReelIndex(0); // Loop back
    }
  };

  const handlePrevReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
    } else {
      setCurrentReelIndex(reelsList.length - 1);
    }
  };

  // Keyboard navigation up/down
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        handleNextReel();
      } else if (e.key === 'ArrowUp') {
        handlePrevReel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentReelIndex]);

  const toggleLike = () => {
    setLikesState((prev) => {
      const cur = prev[currentReel.id] || { count: currentReel.likes, liked: false };
      return {
        ...prev,
        [currentReel.id]: {
          count: cur.liked ? cur.count - 1 : cur.count + 1,
          liked: !cur.liked,
        },
      };
    });
  };

  const currentLikeInfo = likesState[currentReel.id] || { count: currentReel.likes, liked: false };

  return (
    <div className="w-full max-w-sm mx-auto h-[calc(100vh-140px)] min-h-[540px] bg-slate-950 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col justify-between my-2 border border-slate-800 select-none">
      {/* Background Animated Gradient / Video Mockup */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
        style={{ backgroundImage: `url('${currentReel.bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/90" />
      </div>

      {/* Top Header Overlays */}
      <div className="relative z-20 p-4 space-y-2 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        {/* Story Progress Bar Indicators */}
        <div className="flex gap-1.5 w-full">
          {reelsList.map((r, i) => (
            <div
              key={r.id}
              onClick={() => setCurrentReelIndex(i)}
              className="flex-1 h-1 rounded-full cursor-pointer overflow-hidden bg-white/30"
            >
              <div
                className={`h-full transition-all duration-300 ${
                  i === currentReelIndex
                    ? 'bg-white'
                    : i < currentReelIndex
                    ? 'bg-white/70'
                    : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Header Tabs: Feed back button, Untuk Anda, Mengikuti, Trending, Mute toggle */}
        <div className="flex items-center justify-between text-white text-xs font-semibold pt-1">
          <div className="flex items-center gap-3">
            {onBackToFeed && (
              <button
                onClick={onBackToFeed}
                className="text-white/80 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition text-[11px] font-bold"
                title="Kembali ke Feed"
              >
                ← Feed
              </button>
            )}
            <button 
              onClick={() => setReelsFilter('FOR_YOU')}
              className={`transition pb-0.5 ${reelsFilter === 'FOR_YOU' ? 'text-white border-b-2 border-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Untuk Anda
            </button>
            <button 
              onClick={() => setReelsFilter('FOLLOWING')}
              className={`transition pb-0.5 ${reelsFilter === 'FOLLOWING' ? 'text-white border-b-2 border-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Mengikuti
            </button>
            <button 
              onClick={() => setReelsFilter('TRENDING')}
              className={`transition pb-0.5 ${reelsFilter === 'TRENDING' ? 'text-white border-b-2 border-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Trending
            </button>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Floating Center Indicator if Live */}
      {currentReel.isLive && (
        <div className="relative z-20 self-center px-3 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-lg animate-pulse">
          <Radio className="w-3.5 h-3.5 text-white" />
          <span>SEDANG SIARAN LANGSUNG • {currentReel.liveViewers}</span>
        </div>
      )}

      {/* Right Action Icons Sidebar (TikTok / Reels Style) */}
      <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-3.5">
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg ${
            currentLikeInfo.liked
              ? 'bg-rose-600 text-white scale-110'
              : 'bg-black/50 text-white group-hover:bg-black/70'
          }`}>
            <Heart className={`w-5 h-5 ${currentLikeInfo.liked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow">
            {(currentLikeInfo.count / 1000).toFixed(1)}k
          </span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => alert('Komentar Reels')}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition shadow-lg">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow">
            {currentReel.commentsCount}
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
              alert('Tautan Reels disalin!');
            }
          }}
          className="flex flex-col items-center gap-1 group"
        >
          <div className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition shadow-lg">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow">
            {currentReel.sharesCount}
          </span>
        </button>

        {/* Ask AI Agent Button */}
        <button
          onClick={() => onOpenAskAi(currentReel.agentName, currentReel.creatorName, 'Kreativitas & Desain 3D')}
          className="flex flex-col items-center gap-1 group"
          title={`Tanya ${currentReel.agentName}`}
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-lg">
            <Bot className="w-5 h-5" />
          </div>
          <span className="text-white text-[10px] font-bold drop-shadow">
            Tanya
          </span>
        </button>
      </div>

      {/* Floating Vertical Next / Prev Stepper Controls (Scroll to next post) */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <button
          onClick={handlePrevReel}
          className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition shadow-md group"
          title="Reel Sebelumnya (Swipe Up)"
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition" />
        </button>
        <span className="text-[9px] font-mono font-bold text-center text-white/80 bg-black/60 px-1.5 py-0.5 rounded-full">
          {currentReelIndex + 1}/{reelsList.length}
        </span>
        <button
          onClick={handleNextReel}
          className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition shadow-md group animate-bounce"
          title="Scroll ke Postingan Selanjutnya (Swipe Down)"
        >
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition" />
        </button>
      </div>

      {/* Bottom Content & Creator Attribution */}
      <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
        {/* Creator Info Lockup */}
        <div className="flex items-center gap-2.5">
          <img
            src={currentReel.creatorAvatar}
            alt={currentReel.creatorName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/80 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-white text-xs">{currentReel.creatorName}</span>
              <span className="text-[10px] text-white/70">{currentReel.creatorHandle}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-cyan-300 font-medium">
              <Bot className="w-3 h-3 text-cyan-400" />
              <span>{currentReel.agentName} · AI Agent</span>
            </div>
          </div>
        </div>

        {/* Title & Caption */}
        <div>
          <p className="text-white font-bold text-xs leading-snug drop-shadow-sm">
            {currentReel.title}
          </p>
          <p className="text-slate-300 text-[11px] mt-1 leading-relaxed line-clamp-2">
            {currentReel.caption}
          </p>
        </div>

        {/* Audio attribution */}
        <div className="flex items-center gap-2 text-white/80 text-[10px]">
          <Music className="w-3 h-3 text-cyan-400 animate-spin" />
          <span className="truncate">{currentReel.audioName}</span>
        </div>

        {/* Context Action Button: "Gabung Live Stage" (if Live) OR "Buat dengan Brand Saya" */}
        <div className="pt-1 flex gap-2">
          {currentReel.isLive && onOpenLiveStage ? (
            <button
              onClick={onOpenLiveStage}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-black text-xs shadow-xl transition flex items-center justify-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>🎙️ Gabung Live Stage Arena</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenBrandCustomizer}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-xl transition flex items-center justify-center gap-1.5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 group-hover:rotate-12 transition" />
              <span>Buat Video Reels dengan Brand Saya</span>
            </button>
          )}

          <button
            onClick={handleNextReel}
            className="px-3 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
            title="Lanjut ke Video Berikutnya"
          >
            <span>Lanjut</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
