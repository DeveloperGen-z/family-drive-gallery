import { useCallback, useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  Camera,
  Download,
  Heart,
  Loader2,
  LogOut,
  RefreshCw,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: string;
  index: number;
  viewUrl: string;
  downloadUrl: string;
  thumbnailUrl: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fetchPhotos = useAction(api.photos.fetchPhotos);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPhotos();
      setPhotos(result);
    } catch (err) {
      console.error("Failed to fetch photos:", err);
      setError(
        "Unable to load photos from the Google Drive folder. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }, [fetchPhotos]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handleDownload = async (photo: Photo) => {
    setDownloadingId(photo.id);
    try {
      // Open the Google Drive download link in a new tab
      window.open(photo.downloadUrl, "_blank");
    } finally {
      setTimeout(() => setDownloadingId(null), 1500);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-xl bg-primary/10">
              <Camera className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Family Drive Gallery
              </h1>
              <p className="text-xs text-muted-foreground">
                Welcome{user?.name ? `, ${user.name}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={loadPhotos}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* ─── Stats bar ─── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ImageIcon className="size-4" />
            <span>
              {loading ? "Loading..." : `${photos.length} photos`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="size-4" />
            <span>Drive Gallery</span>
          </div>
        </div>

        {/* ─── Error state ─── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl border border-destructive/30 bg-destructive/5 p-5 flex items-start gap-3"
          >
            <AlertCircle className="size-5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Something went wrong
              </p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadPhotos}
                className="mt-3 gap-2"
              >
                <RefreshCw className="size-3.5" />
                Try again
              </Button>
            </div>
          </motion.div>
        )}

        {/* ─── Loading state ─── */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ─── Photo grid ─── */}
        {!loading && !error && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  layout
                >
                  <div
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border/40 bg-card cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
                    onClick={() => setLightboxPhoto(photo)}
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt={`Family photo ${photo.index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to view URL if thumbnail fails
                        const target = e.target as HTMLImageElement;
                        if (target.src !== photo.viewUrl) {
                          target.src = photo.viewUrl;
                        }
                      }}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Download button on hover */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(photo);
                        }}
                        disabled={downloadingId === photo.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-lg hover:bg-white transition-colors shadow-md"
                      >
                        {downloadingId === photo.id ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Download className="size-3.5" />
                        )}
                        Download
                      </button>
                    </div>

                    {/* Photo number badge */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium rounded-md">
                        #{photo.index + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ─── Empty state ─── */}
        {!loading && !error && photos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex items-center justify-center size-16 rounded-2xl bg-muted mb-5">
              <ImageIcon className="size-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No photos found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              The Google Drive folder appears to be empty or the photos couldn't
              be loaded. Make sure the folder is set to public sharing.
            </p>
            <Button
              variant="outline"
              onClick={loadPhotos}
              className="mt-6 gap-2"
            >
              <RefreshCw className="size-3.5" />
              Try again
            </Button>
          </div>
        )}
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.viewUrl}
                alt={`Family photo ${lightboxPhoto.index + 1}`}
                className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = lightboxPhoto.thumbnailUrl;
                }}
              />

              {/* Lightbox controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button
                  onClick={() => handleDownload(lightboxPhoto)}
                  disabled={downloadingId === lightboxPhoto.id}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-xl hover:bg-white transition-colors shadow-lg"
                >
                  {downloadingId === lightboxPhoto.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Download className="size-4" />
                  )}
                  Download Photo
                </button>
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-white/30 transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Photo counter */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                {lightboxPhoto.index + 1} of {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
