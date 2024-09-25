export interface IProfileData {
    email: string;
    username: string;
}

export interface IEmailForm { profileData: IProfileData }

export interface INicknameForm {
    profileData: IProfileData;
    setProfileData: React.Dispatch<React.SetStateAction<IProfileData>>;
}