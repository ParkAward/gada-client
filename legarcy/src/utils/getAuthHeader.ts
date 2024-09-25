import { useCookies } from 'react-cookie';

interface IHeader {
    (): { Authorization: string };
}

const getAuthHeader: IHeader = () => {
    const [cookies] = useCookies(['accessToken']);
    const { accessToken } = cookies;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    return headers;
};

export default getAuthHeader;
