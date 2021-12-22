export interface BpActions {
    type: string;
    payload?: {
        normal_playable: Array<string>;
        wild_playable: Array<string>;
        r: number;
        cardplayed: object;
    }
};

/**
 * @description
 * Interface that describes how a uno card is structured
 * 
 * @export
 * CurrentCard interface
 */
export interface CurrentCard {
    id: number;
    values: number;
    color: string;
    image_files: string;
};

/**
 * @description
 * Interface that describes what a player has on hand
 * 
 * @exports
 * Player interface
 */
export interface Player {
    player1: Array<CurrentCard>;
    player2: Array<CurrentCard>;
    player3: Array<CurrentCard>;
    player4: Array<CurrentCard>;
};

class Card {
    constructor(id: number, values: number, color: string, image_files: string) {
        this.id = id;
        this.values = values;
        this.color = color;
        this.image_files = image_files;
    }
    id: number;
    values: number;
    color: string;
    image_files: string;
}