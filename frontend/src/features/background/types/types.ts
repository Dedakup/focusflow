export interface Background {
    name: string;
    src: string;
    thumbnailSrc: string;
}

export interface BackgroundState {
    backgrounds: Background[];
    selectedBackground: Background | null;
} 