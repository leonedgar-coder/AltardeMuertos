export interface Memory {
    id: string;
    type: string;
    url: string;
    createdAt: string | Date;
}

export interface Comment {
    id: string;
    author: string;
    text: string;
    createdAt: string | Date;
}

export interface Relative {
    id: string;
    name: string;
    birthDate?: string | Date;
    deathDate?: string | Date;
    biography?: string;
    mainImageUrl: string;
    level: number;
    memories: Memory[];
    comments: Comment[];
    createdAt: string | Date;
    updatedAt: string | Date;
}
