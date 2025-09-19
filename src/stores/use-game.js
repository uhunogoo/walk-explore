import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create( subscribeWithSelector( ( set ) => {
  return {
    groups: {
      PLAYER: 0x0001,
      WORLD:  0x0002,
      SENSOR: 0x0004,
      ITEM:   0x0008,
    },
    player: null,
    blocksCount: 10,
    blocksSeed: 0,
    phase: 'ready',
    start: () => set( (state) => {
      if (state.phase !== 'ready') return {};
      return { phase: 'playing' } 
    } ),
    end: () => set( (state) => { 
      if (state.phase !== 'playing') return {};
      return { phase: 'end' } 
    } ),
    restart: () => set( (state) => {
      if (state.phase === 'playing' || state.phase === 'end') {
        return { phase: 'ready', blocksSeed: Math.random() };
      }
      return {}; 
    } ),
    setPlayer: ( player ) => set( (state) => {
      return { player };
    } ),
  } 
}) );