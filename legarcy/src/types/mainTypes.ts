export interface PreprocessedPlanModel {
    id: string;
    area: string;
    title: string;
    imgUrl: string;
    dDay: string;
    term: string;
}

export interface CardProps {
    id: string;
    dday: string;
    src: string;
    imageName: string;
    title: string;
    term: string;
}

export interface ILocation {
    [prop: string]: string;
}

export interface IPreprocessLocation {
    location: string;
    imgUrl: string;
}

export interface LocationCardProps {
    imgUrl: string;
    location: string;
}