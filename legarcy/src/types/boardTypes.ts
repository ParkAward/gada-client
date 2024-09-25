export interface ILikes {
    [prop: number]: string;
}

export interface ISharedData {
    area: string;
    clickedLike: boolean;
    likeCount: number;
    likes: ILikes[];
    location?: string;
    planId: string;
    shareTitle: string;
    tag: string;
    title?: string;
    username: string;
}

export interface ICheckLike {
    planId: string;
    toggle: boolean;
}

export interface ICardList {
    sharedDatas: ISharedData[] | undefined;
    setCheckLike: React.Dispatch<React.SetStateAction<ICheckLike | undefined>>;
    pagetype: string | null;
    setClickedId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface pageProps {
    currentPage: number;
    startPage: number;
    endPage: number;
    totalPage: number;
}

export interface IFilter {
    setClickedTag: React.Dispatch<React.SetStateAction<string>>;
    clickedTag: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>
}

export interface IPageList {
    page: pageProps;
    setPage: React.Dispatch<React.SetStateAction<pageProps>>;
    setSharedDatas: React.Dispatch<React.SetStateAction<ISharedData[] | undefined>>;
    pagetype: string | null;
    clickedTag: string;
    location: string;
    headers: {
        Authorization: string;
    };
}

interface PageInfoTitles {
    mainTitle: string;
    subTitle1: string;
    subTitle2: string;
}

export type PageInfoProps = {
    titles: PageInfoTitles;
}