import { Player, CurrentCard } from "./interfaces";
import { useState } from "react";

const allPlayers: Player = {
    player1: [],
    player2: [],
    player3: [],
    player4: []
};

const currentCardDetails: CurrentCard = {
    id: 0,
    values: 0,
    color: "",
    image_files: ""
};

// const mainDeck: [] = [];
// const used: [] = [];
// const current: CurrentCard = currentCardDetails;
// const players: Player = allPlayers;
// const selectColor: string = "";
// const drawCard: boolean = false;
// const ifShow: boolean = false;
// const ifDraw: boolean = false;
// const playedDraw: boolean = false;
// const order: [number, number, number, number] = [1, 2, 3, 4];
// const turn: number = 0;
// const playable: [] = [];
// const action: [string, object] = ["", {}];



// const [mainDeck, setMainDeck] = useState([]);
// const [used, setUsed] = useState([]);
// const [current, setCurrent] = useState(currentCardDetails);
// const [players, setPlayers] = useState(allPlayers);
// const [selectColor, setSelectColor] = useState("");
// const [drawCard, setDrawCard] = useState(false);
// const [ifShow, setIfShow] = useState(false);
// const [ifDraw, setIfDraw] = useState(false);
// const [playedDraw, setPlayedDraw] = useState(false);
// const [order, setOrder] = useState([1, 2, 3, 4]);
// const [turn, setTurn] = useState(0);
// const [playable, setPlayable] = useState([]);
// const [action, setAction] = useState(["",]);
// const [cards, setCards] = useState([]);
// const [turnModal, setTurnModal] = useState(false);
// const [isUnoButtonPressed, setUnoButtonPressed] = useState(false);