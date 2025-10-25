import {create} from "zustand/react";

export const pokerStore = create((set)=>({
    players:[],
    selectedCard:{},
    revealed:false,
    // @ts-ignore
    selectCard:(playerId,card)=>
        // @ts-ignore
        set((state)=>({
            selectedCard:{...state.selectedCard,[playerId]:card},
        })),
    revealeReasults:()=>set({revealed:true}),

    resetRound:()=>({selectedCard:{},revealed:false}),

}));