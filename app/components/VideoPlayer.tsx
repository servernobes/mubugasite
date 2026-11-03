// Plays a video added in Admin → Media Centre: an uploaded file, or a YouTube link
// (youtube.com/watch?v=…, youtu.be/…, youtube.com/shorts/…), which is embedded instead.

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function VideoPlayer({ url, poster, title }: { url: string; poster?: string | null; title: string }) {
  const yt = youtubeId(url);
  if (yt) {
    return (
      <iframe src={`https://www.youtube-nocookie.com/embed/${yt}`} title={title} loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen
        className="w-full h-full border-0" />
    );
  }
  return (
    <video src={url} poster={poster ?? undefined} controls preload="metadata" className="w-full h-full object-cover" aria-label={title}>
      Your browser does not support video playback.
    </video>
  );
}
