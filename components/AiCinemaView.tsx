'use client';

import React, { useState } from 'react';
import { 
  Film, 
  Play, 
  Pause, 
  Sparkles, 
  Crown, 
  Check, 
  CheckCircle2, 
  Star, 
  Eye, 
  Clock, 
  Share2, 
  Lock, 
  Unlock, 
  Bot, 
  User, 
  Coins, 
  Tv, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ArrowLeft, 
  X, 
  PlusCircle, 
  TrendingUp, 
  Layers, 
  Radio,
  ChevronRight,
  Flame,
  MessageCircle
} from 'lucide-react';

export type FilmGenre = 
  | 'ALL' 
  | 'C_DRAMA' 
  | 'K_DRAMA' 
  | 'SCIFI' 
  | 'ROMANCE' 
  | 'THRILLER' 
  | 'ANIMATION_3D';

export interface AiMovieItem {
  id: string;
  title: string;
  originalTitle?: string;
  genre: FilmGenre;
  genreLabel: string;
  coverImage: string;
  bannerImage: string;
  episodesCount: number;
  totalViews: string;
  rating: number;
  durationPerEp: string;
  releaseYear: string;
  producerHuman: {
    name: string;
    handle: string;
    avatar: string;
  };
  aiCoDirector: {
    name: string;
    handle: string;
    avatar: string;
    specialty: string;
  };
  synopsis: string;
  aiTechStack: string;
  creatorMonthlyEarningsCredits: number;
  isTrending?: boolean;
  isFeatured?: boolean;
}

interface AiCinemaViewProps {
  onBackToFeed?: () => void;
  onOpenAskAi?: (agentName: string, ownerName: string, specialty: string) => void;
  userCredits: number;
  onPostTrailerToFeed?: (movie: AiMovieItem) => void;
  initialSelectedMovieId?: string;
}

export default function AiCinemaView({
  onBackToFeed,
  onOpenAskAi,
  userCredits,
  onPostTrailerToFeed,
  initialSelectedMovieId,
}: AiCinemaViewProps) {
  // VIP Monthly Subscription State
  const [isVipSubscribed, setIsVipSubscribed] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);

  // Genre filter
  const [activeGenre, setActiveGenre] = useState<FilmGenre>('ALL');

  // Submit new AI Film Modal
  const [isSubmitFilmModalOpen, setIsSubmitFilmModalOpen] = useState<boolean>(false);
  const [newFilmTitle, setNewFilmTitle] = useState('');
  const [newFilmGenre, setNewFilmGenre] = useState<FilmGenre>('C_DRAMA');
  const [newFilmSynopsis, setNewFilmSynopsis] = useState('');

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Movie dataset (Rich AI-produced short dramas and films)
  const moviesList: AiMovieItem[] = [
    {
      id: 'film-1',
      title: 'The Reborn Cyber Empress',
      originalTitle: '重生之赛博女帝 (Drama Pendek AI C-Drama)',
      genre: 'C_DRAMA',
      genreLabel: 'Drama China AI (C-Drama)',
      coverImage: '/assets/aistudio/Screenshot_20261023-182318_4e89cb4b.jpg',
      bannerImage: '/assets/aistudio/Screenshot_20261022-220040_ce194f62.jpg',
      episodesCount: 15,
      totalViews: '1.4M',
      rating: 4.9,
      durationPerEp: '2–3 menit / ep',
      releaseYear: '2026',
      producerHuman: {
        name: 'Chen Wei',
        handle: '@chenwei_films',
        avatar: 'https://picsum.photos/seed/chen-producer/150/150',
      },
      aiCoDirector: {
        name: 'CineGenius AI',
        handle: '@cinegenius.ai',
        avatar: 'https://picsum.photos/seed/cinegenius/150/150',
        specialty: 'C-Drama Fast-Paced Directing & Neural Voice',
      },
      synopsis: 'Dikhianati oleh keluarga konglomerat di Shanghai 2099, Lin Yue terlahir kembali dengan memori masa depan dan AI Agent taktis untuk membalas dendam dan merebut kembali tahta bisnis teknologi terkuat.',
      aiTechStack: 'Kling 1.5 + Midjourney v6 + ElevenLabs Neural Voice + Wan2.1 Video',
      creatorMonthlyEarningsCredits: 14850,
      isTrending: true,
      isFeatured: true,
    },
    {
      id: 'film-2',
      title: 'Neo-Seoul: Destined Neural Hearts',
      originalTitle: '운명의 뉴럴 하트 (K-Drama AI Rom-Com)',
      genre: 'K_DRAMA',
      genreLabel: 'Drama Korea AI (K-Drama)',
      coverImage: '/assets/aistudio/Screenshot_20261023-182405_d765b801.jpg',
      bannerImage: '/assets/aistudio/Screenshot_20261023-182405_d765b801.jpg',
      episodesCount: 12,
      totalViews: '980K',
      rating: 4.8,
      durationPerEp: '3 menit / ep',
      releaseYear: '2026',
      producerHuman: {
        name: 'Park Ji-hoon',
        handle: '@jihoon_media',
        avatar: 'https://picsum.photos/seed/jihoon/150/150',
      },
      aiCoDirector: {
        name: 'Luna AI',
        handle: '@luna.ai',
        avatar: 'https://picsum.photos/seed/luna-cyber/150/150',
        specialty: 'K-Drama Romance Lighting & Spatial Sound',
      },
      synopsis: 'Kisah cinta manis dan penuh intrik antara seorang desainer spatial muda dan CEO android misterius di tengah gemerlap kota futuristik Neo-Seoul.',
      aiTechStack: 'Luma Dream Machine + ElevenLabs Korean Voice + Stable Diffusion 3',
      creatorMonthlyEarningsCredits: 9640,
      isTrending: true,
    },
    {
      id: 'film-3',
      title: "CEO's Secret Android Bride",
      originalTitle: '总裁的秘密仿生新娘 (Drama Pendek AI Modern)',
      genre: 'C_DRAMA',
      genreLabel: 'Drama China AI (C-Drama)',
      coverImage: '/assets/aistudio/file_00000000d1c08207a6952642d1a26363_df39e383.png',
      bannerImage: '/assets/aistudio/file_00000000d1c08207a6952642d1a26363_df39e383.png',
      episodesCount: 18,
      totalViews: '2.1M',
      rating: 4.95,
      durationPerEp: '2 menit / ep',
      releaseYear: '2026',
      producerHuman: {
        name: 'Alex Tamara',
        handle: '@alextamara',
        avatar: 'https://picsum.photos/seed/alex-tamara/150/150',
      },
      aiCoDirector: {
        name: 'Luna AI',
        handle: '@luna.ai',
        avatar: 'https://picsum.photos/seed/luna-cyber/150/150',
        specialty: '3D Spatial Wardrobe & Emissive Lighting',
      },
      synopsis: 'Demi menyelamatkan perusahaannya, pewaris konglomerat terpaksa menikahi wanita misterius yang ternyata adalah android bio-sintetik dengan misi rahasia menyelamatkan Allpha Universe.',
      aiTechStack: 'Kling AI + Runway Gen-3 + Suno AI Music + ElevenLabs',
      creatorMonthlyEarningsCredits: 22400,
      isTrending: true,
    },
    {
      id: 'film-4',
      title: 'Shadow Protocol: Shanghai 2099',
      originalTitle: '暗影协议 2099 (Action Thriller AI)',
      genre: 'THRILLER',
      genreLabel: 'Thriller & Action AI',
      coverImage: '/assets/aistudio/Screenshot_20261022-214044_2d568e43.jpg',
      bannerImage: '/assets/aistudio/Screenshot_20261022-214044_2d568e43.jpg',
      episodesCount: 8,
      totalViews: '640K',
      rating: 4.7,
      durationPerEp: '4 menit / ep',
      releaseYear: '2026',
      producerHuman: {
        name: 'Rizky Pratama',
        handle: '@rizky_action',
        avatar: 'https://picsum.photos/seed/rizky/150/150',
      },
      aiCoDirector: {
        name: 'Aegis AI',
        handle: '@aegis.ai',
        avatar: 'https://picsum.photos/seed/aegis/150/150',
        specialty: 'Tactical Choreography & Hyper-real Combat VFX',
      },
      synopsis: 'Agen rahasia siber menyusup ke markas korporasi nakal untuk membatalkan virus penghapus identitas manusia di Metaverse.',
      aiTechStack: 'Midjourney + Wan2.1 + Sora Spatial Synth',
      creatorMonthlyEarningsCredits: 7120,
    },
    {
      id: 'film-5',
      title: 'The Immortal Sword Sovereign',
      originalTitle: '逆天剑尊 (Wuxia Cultivation AI)',
      genre: 'C_DRAMA',
      genreLabel: 'Drama China AI (C-Drama)',
      coverImage: '/assets/aistudio/Screenshot_20261020-224657_48336231.jpg',
      bannerImage: '/assets/aistudio/Screenshot_20261020-224657_48336231.jpg',
      episodesCount: 20,
      totalViews: '1.6M',
      rating: 4.85,
      durationPerEp: '2.5 menit / ep',
      releaseYear: '2026',
      producerHuman: {
        name: 'Liang Studios',
        handle: '@liang_studios',
        avatar: 'https://picsum.photos/seed/liang/150/150',
      },
      aiCoDirector: {
        name: 'WuxiaMaster AI',
        handle: '@wuxiamaster.ai',
        avatar: 'https://picsum.photos/seed/wuxia/150/150',
        specialty: 'Flying Swords Physics & Traditional Chinese Scoring',
      },
      synopsis: 'Pendekar muda yang kehilangan dantian-nya membangkitkan pedang purba berjiwa AI di puncak Gunung Kristal, menuntut keadilan lintas sembilan alam.',
      aiTechStack: 'Kling 1.5 + ComfyUI AnimateDiff + AudioCraft',
      creatorMonthlyEarningsCredits: 16200,
    },
    {
      id: 'film-6',
      title: 'Chronicles of Mars: The Bio-Awakening',
      originalTitle: 'Mars Bio-Colony Origins',
      genre: 'SCIFI',
      genreLabel: 'Sci-Fi Spatial 3D',
      coverImage: '/assets/aistudio/file_00000000560c820baca9cd747fc97471_b104badb.png',
      bannerImage: '/assets/aistudio/file_00000000560c820baca9cd747fc97471_b104badb.png',
      episodesCount: 10,
      totalViews: '510K',
      rating: 4.65,
      durationPerEp: '3.5 menit / ep',
      releaseYear: '2026',
      producerHuman: {
        name: 'Dr. Sarah Novak',
        handle: '@dr_sarah',
        avatar: 'https://picsum.photos/seed/sarah/150/150',
      },
      aiCoDirector: {
        name: 'CosmoAI',
        handle: '@cosmo.ai',
        avatar: 'https://picsum.photos/seed/cosmo/150/150',
        specialty: 'Astrophysics Simulation & Robotic Voice Synthesis',
      },
      synopsis: 'Peneliti terraforming menemukan mikroorganisme purba di kedalaman tanah Mars yang mampu berinteraksi langsung dengan AI neural network.',
      aiTechStack: 'Three.js Spatial Engine + Runway Gen-3 + Udio Music',
      creatorMonthlyEarningsCredits: 5800,
    },
  ];

  // Active playing movie in theater modal
  const [activeTheaterMovie, setActiveTheaterMovie] = useState<AiMovieItem | null>(() => {
    if (initialSelectedMovieId) {
      return moviesList.find((m) => m.id === initialSelectedMovieId) || moviesList[0];
    }
    return null;
  });

  // Selected episode inside theater modal
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(45);

  const filteredMovies = activeGenre === 'ALL'
    ? moviesList
    : moviesList.filter((m) => m.genre === activeGenre);

  const featuredMovie = moviesList[0];

  // Handler for subscribing VIP
  const handleConfirmVipSubscription = () => {
    setIsVipSubscribed(true);
    setIsSubscriptionModalOpen(false);
    showToast('Selamat! Langganan VIP Allpha Cinema Aktif. Semua episode terbuka tanpa batas!');
  };

  // Handler for opening a movie in theater modal
  const handleOpenTheater = (movie: AiMovieItem, episodeNum = 1) => {
    setActiveTheaterMovie(movie);
    setActiveEpisodeNumber(episodeNum);
    setIsPlaying(true);
    setPlaybackSeconds(0);
  };

  // Handler for clicking an episode
  const handleSelectEpisode = (epNum: number) => {
    if (epNum > 2 && !isVipSubscribed) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    setActiveEpisodeNumber(epNum);
    setIsPlaying(true);
    setPlaybackSeconds(0);
    showToast(`Memutar Episode ${epNum}: "${activeTheaterMovie?.title}"`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6 pb-24 text-slate-900">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 right-4 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white border border-rose-500/50 shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header & VIP Subscription Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-rose-950 to-slate-900 text-white p-5 sm:p-6 border border-rose-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/30 shrink-0">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  ALLPHA AI CINEMA
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase tracking-wider">
                  Platform Film & Mini-Drama AI
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Wadah resmi Produser & Kreator Film AI. Tonton Drama Pendek (C-Drama, K-Drama, Sci-Fi) dengan ekosistem bagi hasil 70% ke kreator.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isVipSubscribed ? (
              <span className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 fill-slate-950" />
                <span>VIP PASS AKTIF ✓</span>
              </span>
            ) : (
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs shadow-lg shadow-rose-500/25 transition flex items-center gap-1.5 animate-pulse"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Langganan VIP (150 Cr / Bln)</span>
              </button>
            )}

            <button
              onClick={() => setIsSubmitFilmModalOpen(true)}
              className="px-3 py-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              title="Ajukan Film AI Baru"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Daftarkan Film AI</span>
            </button>
          </div>
        </div>

        {/* Creator Profit Sharing Guarantee Strip */}
        <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span>
              <strong>Model Monetisasi Kreator:</strong> 70% dari seluruh biaya langganan bulanan & pembelian tiket episode langsung didistribusikan ke Produser & AI Agent pembuat film.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 font-bold shrink-0">
            Total Royalti Bulan Ini: 74,650 Cr
          </span>
        </div>
      </div>

      {/* Featured Blockbuster Banner */}
      {featuredMovie && (
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-xl group">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={featuredMovie.bannerImage}
              alt={featuredMovie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            {/* Badges on top */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs uppercase shadow-md flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Trending #1 Drama Pendek AI</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-amber-400 text-xs font-mono font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{featuredMovie.rating}</span>
                <span className="text-white/60">({featuredMovie.totalViews} Penonton)</span>
              </span>
            </div>

            {/* Content overlay at bottom */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2.5 max-w-2xl">
              <div>
                <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                  {featuredMovie.genreLabel} • {featuredMovie.episodesCount} Episode
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {featuredMovie.title}
                </h2>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {featuredMovie.synopsis}
                </p>
              </div>

              {/* Creator lockup & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => handleOpenTheater(featuredMovie, 1)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Tonton Trailer & Episode 1 (Gratis)</span>
                </button>

                <button
                  onClick={() => {
                    if (onPostTrailerToFeed) {
                      onPostTrailerToFeed(featuredMovie);
                      showToast(`Trailer "${featuredMovie.title}" berhasil diposting ke Feed & Reels Anda!`);
                    } else {
                      showToast('Tautan trailer disalin!');
                    }
                  }}
                  className="px-3.5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-xs transition flex items-center gap-1.5"
                  title="Posting Trailer ke Feed & Reels"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan Trailer</span>
                </button>

                <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Disutradarai oleh {featuredMovie.producerHuman.name} × {featuredMovie.aiCoDirector.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Genre Filter Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            Katalog Film Pendek & Serial Drama AI
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {filteredMovies.length} Judul Tersedia
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'ALL' as FilmGenre, label: 'Semua Kategori' },
            { id: 'C_DRAMA' as FilmGenre, label: 'Drama China AI (C-Drama)' },
            { id: 'K_DRAMA' as FilmGenre, label: 'Drama Korea AI (K-Drama)' },
            { id: 'SCIFI' as FilmGenre, label: 'Sci-Fi Spatial 3D' },
            { id: 'THRILLER' as FilmGenre, label: 'Thriller & Misteri' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveGenre(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap shrink-0 ${
                activeGenre === cat.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Film Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-rose-400 transition group flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => handleOpenTheater(movie, 1)}>
                <img
                  src={movie.coverImage}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-cyan-300 font-bold text-[9px] border border-cyan-500/30">
                    {movie.genreLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-amber-400 font-mono font-bold text-[10px] flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{movie.rating}</span>
                  </span>
                </div>

                {/* Play Button Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom stats inside cover */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px]">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-cyan-400" />
                    <span>{movie.totalViews} Penonton</span>
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {movie.episodesCount} Episode
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-3.5 space-y-2">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-rose-600 transition line-clamp-1">
                    {movie.title}
                  </h4>
                  {movie.originalTitle && (
                    <p className="text-[10px] text-slate-600 truncate mt-0.5 font-medium">
                      {movie.originalTitle}
                    </p>
                  )}
                </div>

                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                  {movie.synopsis}
                </p>

                {/* Producers Attribution */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <img
                      src={movie.producerHuman.avatar}
                      alt={movie.producerHuman.name}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <span className="truncate">{movie.producerHuman.name}</span>
                  </div>
                  <span className="text-[10px] text-cyan-700 font-medium shrink-0">
                    & {movie.aiCoDirector.name}
                  </span>
                </div>

                {/* Profit Royalty Badge */}
                <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between text-[10px] text-amber-900">
                  <span>Royalti Kreator:</span>
                  <span className="font-mono font-bold">
                    +{movie.creatorMonthlyEarningsCredits.toLocaleString('id-ID')} Cr/bln
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3.5 pt-0 flex gap-2">
              <button
                onClick={() => handleOpenTheater(movie, 1)}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition flex items-center justify-center gap-1 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Nonton</span>
              </button>
              <button
                onClick={() => {
                  if (onPostTrailerToFeed) {
                    onPostTrailerToFeed(movie);
                    showToast(`Trailer "${movie.title}" siap dibagikan ke Feed & Reels!`);
                  }
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Bagikan ke Feed & Reels"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* THEATER / VIDEO PLAYER MODAL                             */}
      {/* ======================================================== */}
      {activeTheaterMovie && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar of Theater */}
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                <h3 className="font-extrabold text-sm text-white truncate">
                  {activeTheaterMovie.title} — Episode {activeEpisodeNumber}
                </h3>
              </div>
              <button
                onClick={() => setActiveTheaterMovie(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Canvas Viewport */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group">
              <img
                src={activeTheaterMovie.bannerImage}
                alt={activeTheaterMovie.title}
                className={`w-full h-full object-cover transition duration-700 ${isPlaying ? 'scale-105 filter brightness-105' : 'filter brightness-75'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

              {/* Watermark Logo Allpha Cinema */}
              <div className="absolute top-3 left-4 flex items-center gap-1.5 pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-rose-600 flex items-center justify-center font-black text-white text-xs">
                  A
                </div>
                <span className="font-extrabold text-xs tracking-wider text-white drop-shadow">
                  ALLPHA CINEMA
                </span>
              </div>

              {/* Center Play/Pause Indicator if Clicked */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute w-14 h-14 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center shadow-2xl transition transform active:scale-95 z-20"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
              </button>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                {/* Seek Bar */}
                <div className="w-full h-1.5 rounded-full bg-white/20 cursor-pointer overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all duration-300" style={{ width: '42%' }} />
                </div>

                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-rose-400 transition">
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button onClick={() => setIsAudioMuted(!isAudioMuted)} className="hover:text-rose-400 transition">
                      {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-300">
                      01:14 / {activeTheaterMovie.durationPerEp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-rose-600/80 font-bold">4K HDR</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-mono">60 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Theater Info & Episode Selector */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-black text-base text-white">{activeTheaterMovie.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activeTheaterMovie.genreLabel} • Episode {activeEpisodeNumber} dari {activeTheaterMovie.episodesCount}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onPostTrailerToFeed) {
                        onPostTrailerToFeed(activeTheaterMovie);
                        showToast(`Trailer "${activeTheaterMovie.title}" berhasil di-share ke Feed Allpha!`);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share ke Feed</span>
                  </button>

                  {onOpenAskAi && (
                    <button
                      onClick={() => onOpenAskAi(
                        activeTheaterMovie.aiCoDirector.name,
                        activeTheaterMovie.producerHuman.name,
                        activeTheaterMovie.aiCoDirector.specialty
                      )}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Tanya Sutradara AI</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Episode Selector Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Pilih Episode ({activeTheaterMovie.episodesCount} Total):</span>
                  {!isVipSubscribed && (
                    <span className="text-[11px] text-amber-400">
                      Ep 1 & 2 Gratis • Ep 3+ Khusus VIP
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {Array.from({ length: activeTheaterMovie.episodesCount }, (_, i) => i + 1).map((ep) => {
                    const isFree = ep <= 2;
                    const isUnlocked = isFree || isVipSubscribed;
                    const isActive = activeEpisodeNumber === ep;

                    return (
                      <button
                        key={ep}
                        onClick={() => handleSelectEpisode(ep)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 ring-2 ring-white'
                            : isUnlocked
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            : 'bg-slate-900/80 text-slate-500 border border-slate-800'
                        }`}
                      >
                        {!isUnlocked ? (
                          <Lock className="w-3 h-3 text-amber-500" />
                        ) : (
                          <Play className="w-2.5 h-2.5 fill-current" />
                        )}
                        <span>Ep {ep}</span>
                        {isFree && !isVipSubscribed && (
                          <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300">
                            Free
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Synopsis & AI Generation Pipeline */}
              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="font-bold text-xs text-slate-300">Sinopsis:</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {activeTheaterMovie.synopsis}
                  </p>
                </div>

                {/* Tech & Creator Split Details */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Teknologi Produksi AI:</span>
                    <span className="font-mono text-cyan-300 font-medium">
                      {activeTheaterMovie.aiTechStack}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Produser Human:</span>
                    <span className="font-bold text-slate-200">
                      {activeTheaterMovie.producerHuman.name} ({activeTheaterMovie.producerHuman.handle})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Sutradara AI:</span>
                    <span className="font-bold text-cyan-400">
                      {activeTheaterMovie.aiCoDirector.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Alokasi Royalti Kreator:</span>
                    <span className="font-bold text-amber-400 font-mono">
                      70% Hasil Langganan Masuk ke Wallet Kreator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: LANGGANAN VIP ALLPHA CINEMA                       */}
      {/* ======================================================== */}
      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-950 text-white border border-rose-500/40 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-amber-400 fill-amber-400" />
                <div>
                  <h3 className="font-black text-base text-white">Allpha Cinema VIP Pass</h3>
                  <p className="text-[11px] text-slate-400">Akses Tanpa Batas ke Seluruh Serial Film AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsSubscriptionModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price Tag */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 to-purple-950/80 border border-rose-500/30 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
                Paket Berlangganan Bulanan
              </span>
              <p className="text-2xl font-mono font-black text-white">
                150 AI Credits <span className="text-xs text-slate-400 font-normal">/ Rp 99.000 / bln</span>
              </p>
              <p className="text-[11px] text-slate-300">
                Saldo Anda saat ini: <strong className="font-mono text-amber-300">{userCredits} Credits</strong>
              </p>
            </div>

            {/* Benefit Checkpoints */}
            <div className="space-y-2 text-slate-300 text-xs">
              {[
                'Buka ribuan episode Drama Pendek AI (C-Drama & K-Drama) tanpa iklan',
                'Resolusi 4K Ultra HD 60 FPS dengan audio spatial 3D',
                'Akses premiere episode baru 24 jam lebih awal',
                '70% biaya langganan disalurkan langsung sebagai royalti untuk Produser Film AI',
                'Bisa diakses dari Feed, Reels, dan 3D Universe Cinema District',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSubscriptionModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Nanti Saja
              </button>
              <button
                type="button"
                onClick={handleConfirmVipSubscription}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold shadow-lg shadow-rose-500/25"
              >
                Aktifkan VIP Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DAFTARKAN FILM AI BARU                           */}
      {/* ======================================================== */}
      {isSubmitFilmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200 text-xs">
            <div className="flex items-start justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-rose-400 uppercase">Portal Produser Film AI</span>
                <h3 className="font-extrabold text-sm text-white mt-0.5">Daftarkan Produksi Film AI Anda</h3>
              </div>
              <button
                onClick={() => setIsSubmitFilmModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Judul Film / Serial Mini-Drama:</label>
              <input
                type="text"
                value={newFilmTitle}
                onChange={(e) => setNewFilmTitle(e.target.value)}
                placeholder="Contoh: The Secret Cyborg Prince (K-Drama AI)..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-rose-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Kategori / Genre Film:</label>
              <select
                value={newFilmGenre}
                onChange={(e) => setNewFilmGenre(e.target.value as FilmGenre)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
              >
                <option value="C_DRAMA">Drama China AI (C-Drama)</option>
                <option value="K_DRAMA">Drama Korea AI (K-Drama)</option>
                <option value="SCIFI">Sci-Fi Spatial 3D</option>
                <option value="THRILLER">Thriller & Misteri</option>
                <option value="ROMANCE">Romance & Time Travel</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Sinopsis Singkat:</label>
              <textarea
                rows={3}
                value={newFilmSynopsis}
                onChange={(e) => setNewFilmSynopsis(e.target.value)}
                placeholder="Tuliskan hook cerita dan peran AI Agent dalam alur plot..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-rose-400"
              />
            </div>

            <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-[11px] text-rose-200">
              💡 <strong>Royalti 70%:</strong> Setelah ditinjau oleh AI Curator, film Anda akan otomatis tayang di Cinema Plaza & dapat diposting trailernya ke Feed & Reels!
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsSubmitFilmModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newFilmTitle.trim()) {
                    showToast('Harap masukkan judul film.');
                    return;
                  }
                  showToast(`Film "${newFilmTitle}" berhasil didaftarkan untuk kurasi!`);
                  setIsSubmitFilmModalOpen(false);
                  setNewFilmTitle('');
                  setNewFilmSynopsis('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-md shadow-rose-500/25"
              >
                Kirim Pendaftaran Film
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
