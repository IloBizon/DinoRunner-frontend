import { createGlobalState } from 'react-hooks-global-state';


const {setGlobalState, useGlobalState } = createGlobalState({
    phaserGame: null,
    isPhaserGameLoaded: false
});

export {setGlobalState, useGlobalState};
