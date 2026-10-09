import type { CSSProperties } from 'react';
import { asset } from '../lib/asset';

interface ScreenshotImageProps {
  /** Path inside `public/` without extension; an .avif and a .jpg exist. */
  path: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: 'lazy' | 'eager';
}

/** AVIF for browsers that support it, JPEG for the rest. Width and height reserve space before loading. */
export function ScreenshotImage({ path, width, height, alt, className, style, loading = 'lazy' }: ScreenshotImageProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={asset(`${path}.avif`)} />
      <img
        className={className}
        style={style}
        src={asset(`${path}.jpg`)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

/** CSS background for an image path, preferring AVIF where supported. */
export function screenshotBackground(path: string): string {
  return `image-set(url("${asset(`${path}.avif`)}") type("image/avif"), url("${asset(`${path}.jpg`)}") type("image/jpeg"))`;
}
