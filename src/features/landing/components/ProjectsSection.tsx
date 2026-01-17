"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ImageWithLoader,
  MediaPlaceholder,
  VideoWithLoader,
} from "@/components/ui/media-with-loader";
import { SectionFrame } from "./SectionFrame";
import { SectionHeader } from "./SectionHeader";
import { projects } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const memorifyPreviewImages = [
  { src: "/images/pic.png", alt: "Memorify page preview one" },
  { src: "/images/pic@.png", alt: "Memorify page preview two" },
];

const maeliPreviewImages = [
  { src: "/images/maeli1.png", alt: "Maeli LLc page preview one" },
  { src: "/images/maeli2.png", alt: "Maeli LLc page preview two" },
];

const kutaisiPreviewImages = [
  { src: "/images/kutaisi1.png", alt: "Guide in Kutaisi page preview one" },
  { src: "/images/kutaisi2.png", alt: "Guide in Kutaisi page preview two" },
];

const steelPreviewImages = [
  { src: "/images/steel1.png", alt: "Steel Company page preview one" },
  { src: "/images/steel2.png", alt: "Steel Company page preview two" },
];

const memorifyPlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><rect width='32' height='32' fill='%23111827'/></svg>";

const memorifyWatchImages = [
  { src: "/images/watch1.png", alt: "Memorify watch view one" },
  { src: "/images/watch2.png", alt: "Memorify watch view two" },
  { src: "/images/watch3.png", alt: "Memorify watch view three" },
  { src: "/images/watch4.png", alt: "Memorify watch view four" },
];

const memorifyDetailText =
  "Memorify is a clean and minimal website concept focused on preserving memories through an intultive and responsive user interface. The project emphasizes clarity, emotional storytelling, and consistent design across devices.";

const maeliDetailText =
  "Maeli LLC is a modern auto transport platform built to simplify nationwide car shipping with fast quotes, transparent communication, and reliable coverage across the U.S.";

const kutaisiDetailText =
  "Guide in Kutaisi is a modern city guide platform built to help visitors explore Kutaisi’s landmarks, history, and local culture through a clean, accessible, and user-friendly interface. The website focuses on clear navigation, visual storytelling, and practical information to make discovering the city simple and engaging for tourists and locals alike.";

const steelDetailText =
  "Steel Company is an interactive corporate microsite highlighting advanced steel products, technology showcases, and immersive visual storytelling.";

function MemorifyPreview() {
  const [showPrimaryImages, setShowPrimaryImages] = useState(false);
  const [showWatchImages, setShowWatchImages] = useState(false);

  useEffect(() => {
    const primaryTimer = window.setTimeout(
      () => setShowPrimaryImages(true),
      200,
    );
    const watchTimer = window.setTimeout(
      () => setShowWatchImages(true),
      700,
    );
    return () => {
      window.clearTimeout(primaryTimer);
      window.clearTimeout(watchTimer);
    };
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-8 sm:gap-12 sm:pt-10">
      <div className="text-center">
        <h3 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Preview of website - Memorify.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          A modern web platform designed to capture and revisit meaningful
          moments.
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-6 sm:hidden">
        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/pic.png"
              alt="Memorify page preview one"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[15px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
        <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
          Our Team created full responsive Web site with unique Ul/UX design for
          Memorify brand.
        </p>
        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/pic@.png"
              alt="Memorify page preview two"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[15px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
        <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
          {memorifyDetailText}
        </p>
        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/pc2.png"
              alt="Memorify desktop layout"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[20px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>
      <div className="hidden w-full flex-col gap-8 sm:flex sm:gap-12">
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
          {showPrimaryImages
            ? memorifyPreviewImages.map((image) => (
                <ImageWithLoader
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 480px"
                  placeholder="blur"
                  blurDataURL={memorifyPlaceholder}
                  loading="lazy"
                  wrapperClassName="w-full"
                  className="h-auto w-full object-cover"
                />
              ))
            : Array.from({ length: 2 }).map((_, index) => (
                <MediaPlaceholder
                  key={`preview-placeholder-${index}`}
                  className="aspect-[4/3] w-full"
                />
              ))}
        </div>
        <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
          Our Team created full responsive Web site with unique Ul/UX design for
          Memorify brand.
        </p>
        <div className="grid w-full grid-cols-2 items-center gap-4 sm:gap-6">
          <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
            {memorifyDetailText}
          </p>
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/pc2.png"
              alt="Memorify desktop layout"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 90vw, 45vw"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>
      <h4 className="text-center font-display text-xl font-semibold text-foreground sm:text-2xl">
        Minimal interface, soft visual rhythm, and a calm color palette to
        support a memory-driven experience without visual noise.
      </h4>
      <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
        {showWatchImages
          ? memorifyWatchImages.map((image) => (
              <ImageWithLoader
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={900}
                height={900}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 420px"
                placeholder="blur"
                blurDataURL={memorifyPlaceholder}
                loading="lazy"
                wrapperClassName="w-full overflow-hidden rounded-2xl"
                className="h-auto w-full rounded-2xl object-cover"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <MediaPlaceholder
                key={`watch-placeholder-${index}`}
                className="aspect-square w-full rounded-2xl"
              />
            ))}
      </div>
    </div>
  );
}

function MaeliPreview() {
  const [showPrimaryImages, setShowPrimaryImages] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const primaryTimer = window.setTimeout(
      () => setShowPrimaryImages(true),
      200,
    );
    return () => {
      window.clearTimeout(primaryTimer);
    };
  }, []);


  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    },
    {
      threshold: 0.6, // play when 60% visible
    }
  );

  observer.observe(video);

  return () => {
    observer.disconnect();
  };
}, []);


 return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-8 sm:gap-12 sm:pt-10">
      <div className="text-center">
        <h3 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Preview of website - Maeli LLC.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          A modern web platform built to simplify car shipping, providing fast quotes, transparent communication, and nationwide coverage.
        </p>
      </div>

      {/* Mobile layout */}
      <div className="flex w-full flex-col items-center gap-6 sm:hidden">
        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/maeli1.png"
              alt="Maeli page preview one"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[15px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>

        <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
          Our Team created full responsive Web site with unique UI/UX design for Maeli LLC Company.
        </p>

        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/maeli2.png"
              alt="Maeli page preview two"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[12px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>

        <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
          {maeliDetailText}
        </p>

        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/maeliPC.png"
              alt="Maeli desktop layout"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[25px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden w-full flex-col gap-8 sm:flex sm:gap-12">
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
          {showPrimaryImages
            ? maeliPreviewImages.map((image) => (
                <ImageWithLoader
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 480px"
                  placeholder="blur"
                  blurDataURL={memorifyPlaceholder}
                  loading="lazy"
                  wrapperClassName="w-full"
                  className="h-auto w-full object-cover"
                />
              ))
            : Array.from({ length: 2 }).map((_, index) => (
                <MediaPlaceholder
                  key={`preview-placeholder-${index}`}
                  className="aspect-[4/3] w-full"
                />
              ))}
        </div>

        <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
          Our Team created full responsive Web site with unique UI/UX design for Maeli LLC Company.
        </p>

        <div className="grid w-full grid-cols-2 items-center gap-4 sm:gap-6">
          <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
            {maeliDetailText}
          </p>
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/maeliPC.png"
              alt="Maeli desktop layout"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 90vw, 45vw"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>

      <h4 className="text-center font-display text-xl font-semibold text-foreground sm:text-2xl">
        Live Company preview
      </h4>

      <div className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-3xl">
        <VideoWithLoader
          ref={videoRef}
          src="/videos/maeli-AI_web.mp4"
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          wrapperClassName="h-full w-full"
          className="h-[220px] sm:h-[320px] md:h-[520px] w-full object-cover"
        />
      </div>

    </div>
  );
}




function KutaisiPreview() {
  const [showPrimaryImages, setShowPrimaryImages] = useState(false);

  useEffect(() => {
    const primaryTimer = window.setTimeout(
      () => setShowPrimaryImages(true),
      200,
    );
    return () => {
      window.clearTimeout(primaryTimer);
    };
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-8 sm:gap-12 sm:pt-10">
      <div className="text-center">
        <h3 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          Preview of website - Guide in Kutaisi.
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          A modern travel guide built to help visitors explore Kutaisi with clarity and inspiration.
        </p>
      </div>

      {/* Mobile layout */}
      <div className="flex w-full flex-col items-center gap-6 sm:hidden">
        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/kutaisi1.png"
              alt="Guide in Kutaisi page preview one"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[15px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>

        <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
          Our Team created full responsive Web site with unique Ul/UX design for Guide in Kutaisi.
        </p>

        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/kutaisi2.png"
              alt="Guide in Kutaisi page preview two"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[15px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>

        <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
          {kutaisiDetailText}
        </p>

        <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/kutaisi3.png"
              alt="Guide in Kutaisi desktop layout"
              width={1200}
              height={900}
              sizes="(max-width: 640px) 92vw, 520px"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full translate-x-[20px] object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden w-full flex-col gap-8 sm:flex sm:gap-12">
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
          {showPrimaryImages
            ? kutaisiPreviewImages.map((image) => (
                <ImageWithLoader
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 480px"
                  placeholder="blur"
                  blurDataURL={memorifyPlaceholder}
                  loading="lazy"
                  wrapperClassName="w-full"
                  className="h-auto w-full object-cover"
                />
              ))
            : Array.from({ length: 2 }).map((_, index) => (
                <MediaPlaceholder
                  key={`preview-placeholder-${index}`}
                  className="aspect-[4/3] w-full"
                />
              ))}
        </div>
        <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
          Our Team created full responsive Web site with unique Ul/UX design for Guide in Kutaisi.
        </p>
        <div className="grid w-full grid-cols-2 items-center gap-4 sm:gap-6">
          <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
            {kutaisiDetailText}
          </p>
          {showPrimaryImages ? (
            <ImageWithLoader
              src="/images/kutaisi3.png"
              alt="Guide in Kutaisi desktop layout"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 90vw, 45vw"
              placeholder="blur"
              blurDataURL={memorifyPlaceholder}
              loading="lazy"
              wrapperClassName="w-full"
              className="h-auto w-full object-cover"
            />
          ) : (
            <MediaPlaceholder className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>

      <h4 className="text-center font-display text-xl font-semibold text-foreground sm:text-2xl">
        Designed with minimalism in mind, this grid uses soft colors and a calm rhythm to showcase Kutaisi, creating a serene, memory-focused experience free of visual noise.
      </h4>
            {/* Kutaisi mockup grid below all existing content */}
<div className="grid w-full max-w-5xl grid-cols-2 gap-4 mt-8 mx-auto">
  {[
    { src: "/images/kutaisi_mockup.png", alt: "Guide in Kutaisi mockup one" },
    { src: "/images/kutaisi_mockup2.png", alt: "Guide in Kutaisi mockup two" },
    { src: "/images/kutaisi_mockup3.png", alt: "Guide in Kutaisi mockup three" },
    { src: "/images/kutaisi_mockup4.png", alt: "Guide in Kutaisi mockup four" },
  ].map((image) => (
    <div key={image.src} className="flex justify-center">
      <ImageWithLoader
        src={image.src}
        alt={image.alt}
        width={400}   // intrinsic resolution
        height={400}  // intrinsic resolution
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 400px"
        placeholder="blur"
        blurDataURL={memorifyPlaceholder}
        loading="lazy"
        wrapperClassName="w-full overflow-hidden rounded-2xl"
        className="h-[200px] sm:h-[250px] md:h-[530px] w-11/12 xl:w-full rounded-2xl object-cover"
      />
    </div>
  ))}
</div>

    </div>
  );
}

function SteelPreview() {
  const [showPrimaryImages, setShowPrimaryImages] = useState(false);

  useEffect(() => {
    const primaryTimer = window.setTimeout(
      () => setShowPrimaryImages(true),
      200,
    );
    return () => {
      window.clearTimeout(primaryTimer);
    };
  }, []);

return (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-8 sm:gap-12 sm:pt-10">
    <div className="text-center">
      <h3 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        Preview of website - Steel Company.
      </h3>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        An immersive corporate platform showcasing advanced steel products and innovation.
      </p>
    </div>

    {/* Mobile layout */}
    <div className="flex w-full flex-col items-center gap-6 sm:hidden">
      <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
        {showPrimaryImages ? (
          <ImageWithLoader
            src="/images/steel1.png"
            alt="Steel Company page preview one"
            width={1200}
            height={900}
            sizes="(max-width: 640px) 92vw, 520px"
            placeholder="blur"
            blurDataURL={memorifyPlaceholder}
            loading="lazy"
            wrapperClassName="w-full"
            className="h-auto w-full translate-x-[15px] object-cover"
          />
        ) : (
          <MediaPlaceholder className="aspect-[4/3] w-full" />
        )}
      </div>
      <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
        Our Team created full responsive Web site with unique Ul/UX design for Steel Company.
      </p>
      <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
        {showPrimaryImages ? (
          <ImageWithLoader
            src="/images/steel2.png"
            alt="Steel Company page preview two"
            width={1200}
            height={900}
            sizes="(max-width: 640px) 92vw, 520px"
            placeholder="blur"
            blurDataURL={memorifyPlaceholder}
            loading="lazy"
            wrapperClassName="w-full"
            className="h-auto w-full translate-x-[15px] object-cover"
          />
        ) : (
          <MediaPlaceholder className="aspect-[4/3] w-full" />
        )}
      </div>
      <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
        {steelDetailText}
      </p>
      <div className="mx-auto flex w-[calc(97vw-3rem)] max-w-[520px] justify-center">
        {showPrimaryImages ? (
          <ImageWithLoader
            src="/images/steel3.png"
            alt="Steel Company desktop layout"
            width={1200}
            height={900}
            sizes="(max-width: 640px) 92vw, 520px"
            placeholder="blur"
            blurDataURL={memorifyPlaceholder}
            loading="lazy"
            wrapperClassName="w-full"
            className="h-auto w-full translate-x-[20px] object-cover"
          />
        ) : (
          <MediaPlaceholder className="aspect-[4/3] w-full" />
        )}
      </div>
    </div>

    {/* Desktop layout */}
    <div className="hidden w-full flex-col gap-8 sm:flex sm:gap-12">
      <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
        {showPrimaryImages
          ? steelPreviewImages.map((image) => (
              <ImageWithLoader
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 480px"
                placeholder="blur"
                blurDataURL={memorifyPlaceholder}
                loading="lazy"
                wrapperClassName="w-full"
                className="h-auto w-full object-cover"
              />
            ))
          : Array.from({ length: 2 }).map((_, index) => (
              <MediaPlaceholder
                key={`preview-placeholder-${index}`}
                className="aspect-[4/3] w-full"
              />
            ))}
      </div>
      <p className="mx-auto max-w-3xl text-center text-base font-medium text-foreground sm:text-lg">
        Our Team created full responsive Web site with unique Ul/UX design for Steel Company.
      </p>
      <div className="grid w-full grid-cols-2 items-center gap-4 sm:gap-6">
        <p className="text-center text-sm leading-relaxed text-muted sm:text-base">
          {steelDetailText}
        </p>
        {showPrimaryImages ? (
          <ImageWithLoader
            src="/images/steel3.png"
            alt="Steel Company desktop layout"
            width={1200}
            height={900}
            sizes="(max-width: 768px) 90vw, 45vw"
            placeholder="blur"
            blurDataURL={memorifyPlaceholder}
            loading="lazy"
            wrapperClassName="w-full"
            className="h-auto w-full object-cover"
          />
        ) : (
          <MediaPlaceholder className="aspect-[4/3] w-full" />
        )}
      </div>
    </div>

        <h4 className="text-center font-display text-xl font-semibold text-foreground sm:text-2xl">
          Company brand cards
        </h4>
<div className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-2 gap-6">
  {[
    { src: "/images/steel_mockupA.png", alt: "Steel mockup one" },
    { src: "/images/steel_mockupB.png", alt: "Steel mockup two" },
    { src: "/images/steel_mockupC.png", alt: "Steel mockup three" },
    { src: "/images/steel_mockupE.jpg", alt: "Steel mockup four" },
  ].map((image) => (
    <div
      key={image.src}
      className="relative w-full overflow-hidden rounded-2xl"
    >
      <ImageWithLoader
        src={image.src}
        alt={image.alt}
        width={1200}
        height={900}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 480px"
        placeholder="blur"
        blurDataURL={memorifyPlaceholder}
        loading="lazy"
        wrapperClassName="h-full w-full"
        className="h-[140px] sm:h-[260px] md:h-[300px] w-full object-cover"
      />
    </div>
  ))}
</div>

  </div>

  

  
);






}

export function ProjectsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeProject, setActiveProject] = useState<
    (typeof projects)[number] | null
  >(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  const shouldAnimate = !shouldReduceMotion && !isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["40% end", "40% start"],
  });
  const width = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    shouldReduceMotion ? ["100%", "100%", "100%"] : ["50%", "50%", "100%"],
  );
  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [1, 1, 0],
  );
  const labelScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6],
    [1, 1, 0.98],
  );
  const labelY = useTransform(scrollYProgress, [0, 0.35], [-8, 140]);
  const frameOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6],
    [0, 0.35, 1],
  );
  const frameY = useTransform(scrollYProgress, [0, 0.35, 0.6], [24, 14, 0]);
  const isMemorify = activeProject?.title === "Memorify";
  const isMaeli = activeProject?.title === "Maeli LLc";
  const isKutaisi = activeProject?.title === "Guide in Kutaisi";
  const isSteel = activeProject?.title === "Steel Company";

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-mt-16 bg-background py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeader
          eyebrow="Our projects"
          title="Selected work across product, platform, and brand."
          description="A snapshot of the challenges we solve: conversion, performance, and visual storytelling."
        />
      </div>
      <div className="relative mt-8">
        <motion.div
          aria-hidden="true"
          style={{
            opacity: shouldAnimate ? labelOpacity : 0,
            scale: shouldAnimate ? labelScale : 1,
            y: shouldAnimate ? labelY : 0,
          }}
          className="pointer-events-none absolute inset-0 flex items-start justify-center pt-4"
        >
          <div className="relative text-center">
            <span
              aria-hidden="true"
              className="absolute -inset-x-10 -inset-y-6 rounded-full bg-accent/25 blur-3xl"
            />
            <span className="relative block font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold text-foreground drop-shadow-[0_0_28px_rgba(94,234,212,0.6)]">
              Projects
            </span>
            <span className="relative mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-accent/0 via-accent/90 to-accent/0" />
          </div>
        </motion.div>
        <motion.div
          style={{
            width: shouldAnimate ? width : "100%",
            opacity: shouldAnimate ? frameOpacity : 1,
            y: shouldAnimate ? frameY : 0,
          }}
          className="mx-auto"
        >
          <SectionFrame className="px-6 py-8 sm:px-8">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid justify-items-center gap-6 md:grid-cols-2 md:justify-items-stretch">
                {projects.map((project) => (
                  <article
                    key={project.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveProject(project);
                      }
                    }}
                    className="group mx-auto w-full max-w-xl cursor-pointer rounded-3xl border border-white/10 bg-surface-2/70 p-6 text-left transition hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-2/90 md:mx-0 md:max-w-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        {project.focus}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-background/40 px-3 py-1 text-xs text-muted transition group-hover:text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SectionFrame>
        </motion.div>
      </div>
      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/90"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          >
            <motion.div
              initial={
                shouldReduceMotion ? { y: 0, opacity: 1 } : { y: "100%" }
              }
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { y: 0 } : { y: "100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 180, damping: 26 }
              }
              className="h-[85vh] sm:h-[90vh] w-full overflow-hidden rounded-t-3xl border border-white/10 bg-surface-2/90 shadow-2xl will-change-transform"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-6 py-4">
  <button
    onClick={() => setActiveProject(null)}
    aria-label="Close preview"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent"
  >
    ✕
  </button>

  <a
    href={activeProject.link || "#"}
    aria-disabled={!activeProject.link}
    target={activeProject.link ? "_blank" : undefined}
    rel={activeProject.link ? "noreferrer noopener" : undefined}
    onClick={(event) => {
      if (!activeProject.link) {
        event.preventDefault();
      }
    }}
    className={`rounded-full border border-accent/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition ${
      activeProject.link
        ? "hover:bg-accent/10"
        : "cursor-not-allowed opacity-60"
    }`}
  >
    Visit website
  </a>
</div>

                <div className="relative flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.12),_transparent_45%),radial-gradient(circle_at_80%_80%,_rgba(251,191,36,0.08),_transparent_40%)]">
                  {isMemorify ? (
                    <MemorifyPreview />
                  ) : isMaeli ? (
                    <MaeliPreview />
                  ) : isKutaisi ? (
                    <KutaisiPreview />
                  ) : isSteel ? (
                    <SteelPreview />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-sm text-muted">
                      {activeProject.title} preview
                    </div>
                  )}
                  <span className="sr-only">
                    {activeProject.title} preview
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
