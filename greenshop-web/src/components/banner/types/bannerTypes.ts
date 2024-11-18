export interface BannerImage {
    id: number;
    src: string;
    alt: string;
}

export interface BannerGalleryProps {
    activeImage: number;
}

export interface BannerDotsProps {
    activeImage: number;
    setActiveImage: (id: number) => void;
    images: BannerImage[];
}

export interface BannerDotProps {
    id: number;
    isActive: boolean;
    onClick: (id: number) => void;
}
