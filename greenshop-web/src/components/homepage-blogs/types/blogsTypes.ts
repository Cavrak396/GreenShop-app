export interface BlogType {
    id: number;
    image: string;
    time: string;
    title: string;
    text: string;
}

export interface BlogItemProps {
    item: BlogType;
}
