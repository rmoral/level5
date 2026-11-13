import Image from "next/image";
import type { Photo as PhotoData } from "@/content/images";

/** Fotografía servida por next/image (AVIF/WebP). Sin foto elegida, el bloque de color del canvas. */
export function Photo({
  photo,
  alt,
  sizes,
  priority = false,
}: {
  photo: PhotoData;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (!photo) return <div className="media-placeholder" aria-hidden="true" />;
  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={alt}
      sizes={sizes}
      priority={priority}
      quality={70}
    />
  );
}
