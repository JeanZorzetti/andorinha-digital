"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface MediaItem {
    src: string;
    type: "image" | "video";
    alt?: string;
}

interface MediaCarouselProps {
    items: MediaItem[];
    className?: string;
    delay?: number;
}

export function MediaCarousel({ items, className, delay = 4000 }: MediaCarouselProps) {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: delay,
                }),
            ]}
            className={cn("w-full h-full", className)}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent className="h-full ml-0">
                {items.map((item, index) => (
                    <CarouselItem key={index} className="pl-0 h-full basis-full">
                        <div className="relative w-full h-full overflow-hidden rounded-2xl">
                            {item.type === "video" ? (
                                <video
                                    src={item.src}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <Image
                                    src={item.src}
                                    alt={item.alt || `Slide ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            )}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
