// Google Maps frame for a branch location.
export default function MapEmbed({ src, title }: { src: string; title: string; directions?: string }) {
  return (
    <iframe src={src} title={title} width="100%" height="100%"
      style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  );
}
