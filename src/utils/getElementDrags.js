import { fromEvent } from 'rxjs';
import { flatMap, map, takeUntil } from 'rxjs/operators';

export default (elem) => {
  const elemMouseDowns = fromEvent(elem, 'mousedown');
  const documentMouseMoves = fromEvent(document, 'mousemove');
  const documentMouseUps = fromEvent(document, 'mouseup');
  return elemMouseDowns.pipe(
    flatMap((_) => {
      return documentMouseMoves.pipe(takeUntil(documentMouseUps));
    })
  );
};
