import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { interactionGroups } from '@react-three/rapier';

const groups = {
  PLAYER: 0x0001,
  WORLD:  0x0002,
  SENSOR: 0x0004,
  ITEM:   0x0008,
}

export default create( subscribeWithSelector( ( set ) => {
  return {
    interactionGroups: {
      player: interactionGroups( groups.PLAYER, [ groups.WORLD, groups.ITEM ] ),
      world:  interactionGroups( groups.WORLD ),
      sensor: interactionGroups( groups.SENSOR, [ groups.ITEM, groups.SENSOR ] ),
      item:   interactionGroups( groups.ITEM, [ groups.SENSOR, groups.PLAYER ] ),
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