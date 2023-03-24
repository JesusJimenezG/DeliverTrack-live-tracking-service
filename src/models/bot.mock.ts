import { BOT } from '../constants/constants';

export interface Bot {
    id: string;
    status: string;
    location: {
        lat: number;
        lng: number;
    };
}

// Mock bot data
export const mockBots: Bot[] = [
    {
        id: '1',
        status: BOT.IDLE,
        location: {
            lat: -122.431297,
            lng: 37.773972
        }
    },
    {
        id: '2',
        status: BOT.IDLE,
        location: {
            lat: -122.435402,
            lng: 37.767817
        }
    },
    {
        id: '3',
        status: BOT.IDLE,
        location: {
            lat: -122.416667,
            lng: 37.783333
        }
    }
];
