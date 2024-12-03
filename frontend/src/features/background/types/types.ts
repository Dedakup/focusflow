export interface BackgroundInterface {
    id: string;
    name: string;
    src: string;
    thumbnailSrc: string;
}

export interface BackgroundState {
    backgrounds: BackgroundInterface[];
    selectedBackground: BackgroundInterface | null;
}
