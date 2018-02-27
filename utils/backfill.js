// @flow

import { backfillGameActions } from '../utils/api';

import type { Game } from '../types/state';
import type { BackfillRequest, BackfillResponse } from '../types/api';

let lastBackfillId = 0;
let backfillCanceled = false;

export function startBackfill(
  game: Game,
  onComplete: (result: BackfillResponse) => void
): number {
  const backfillId = ++lastBackfillId;
  backfillCanceled = false;

  const req = getBackfillReq(game);
  backfillGameActions(req).then(res => {
    // Backfill will be cancelled either via cancelBackfill or if a new
    // backfill is requested (ie. only one backfill can occur at the same time)
    if (lastBackfillId === backfillId && !backfillCanceled) {
      onComplete(res);
    }
  });

  return backfillId;
}

export function cancelBackfill(backfillId: number) {
  if (lastBackfillId === backfillId) {
    backfillCanceled = true;
  }
}

function getBackfillReq(game: Game): BackfillRequest {
  return {
    gameId: game.id,
    players: game.players.map(p => ({
      userId: p.user.id,
      from: p.lastActionId
    }))
  };
}
