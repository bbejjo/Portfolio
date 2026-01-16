"use client";

import Image, { type ImageProps } from "next/image";
import {
  forwardRef,
  useState,
  type VideoHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type MediaLoaderProps = {
  isLoaded: boolean;
  className?: string;
};

export function MediaLoader({ isLoaded, className }: MediaLoaderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "media-loader transition-opacity duration-500",
        isLoaded ? "opacity-0" : "opacity-100",
        className,
      )}
    >
      <div className="media-loader__dots">
        <span className="media-loader__dot" />
        <span className="media-loader__dot" />
        <span className="media-loader__dot" />
      </div>
    </div>
  );
}

type MediaPlaceholderProps = {
  className?: string;
};

export function MediaPlaceholder({ className }: MediaPlaceholderProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <MediaLoader isLoaded={false} />
    </div>
  );
}

type ImageWithLoaderProps = ImageProps & {
  wrapperClassName?: string;
  loaderClassName?: string;
};

export function ImageWithLoader({
  wrapperClassName,
  loaderClassName,
  className,
  onLoadingComplete,
  onError,
  ...props
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative", wrapperClassName)}>
      <Image
        {...props}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoadingComplete={(image) => {
          setIsLoaded(true);
          onLoadingComplete?.(image);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
      />
      <MediaLoader isLoaded={isLoaded} className={loaderClassName} />
    </div>
  );
}

type VideoWithLoaderProps = VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
  loaderClassName?: string;
};

export const VideoWithLoader = forwardRef<
  HTMLVideoElement,
  VideoWithLoaderProps
>(function VideoWithLoader(
  {
    wrapperClassName,
    loaderClassName,
    className,
    onLoadedData,
    onLoadedMetadata,
    onCanPlay,
    onPlaying,
    onError,
    ...props
  },
  ref,
) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative", wrapperClassName)}>
      <video
        {...props}
        ref={ref}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoadedData={(event) => {
          setIsLoaded(true);
          onLoadedData?.(event);
        }}
        onLoadedMetadata={(event) => {
          setIsLoaded(true);
          onLoadedMetadata?.(event);
        }}
        onCanPlay={(event) => {
          setIsLoaded(true);
          onCanPlay?.(event);
        }}
        onPlaying={(event) => {
          setIsLoaded(true);
          onPlaying?.(event);
        }}
        onError={(event) => {
          setIsLoaded(true);
          onError?.(event);
        }}
      />
      <MediaLoader isLoaded={isLoaded} className={loaderClassName} />
    </div>
  );
});
