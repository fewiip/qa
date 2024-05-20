import {create} from "zustand";

type QuizStore = {
    quiz: boolean;
    coinsAdd: number;
    bugsAdd: number;
    coinsIncrement: () => void;
    bugsIncrement: () => void;
    initQuiz: () => void;
    finishQuiz: () => void; 
}

export const useQuizStore = create<QuizStore> ((set) => ({
    quiz: false,
    coinsAdd: 0,
    bugsAdd: 0,
    coinsIncrement: () => {
        set((state) => ({coinsAdd: state.coinsAdd + 3}))
    },
    bugsIncrement: () => {
        set((state) => ({bugsAdd: state.bugsAdd + 1}))
    },
    initQuiz: () => {
        set({quiz: true, coinsAdd: 0, bugsAdd: 0})
    },
    finishQuiz: () => {
        set({quiz: false, coinsAdd: 0, bugsAdd: 0})
    },
}));

/*
type QuizStore = {
    quiz: boolean;
    coinsAdd: number;
    bugAdd: number;
}

valores iniciais 
export const useQuizStore = create<QuizStore> (() => ({
    quiz: false,
    coinsAdd: 0,
    bugAdd: 0
}));

*/