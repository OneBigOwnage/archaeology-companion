import { requireNotNull } from '@/helpers';

export default class Relation {
  constructor(firstID, secondID, pivotProps = null) {
    this.firstID = requireNotNull(firstID);
    this.secondID = requireNotNull(secondID);
    this.pivotProps = pivotProps;
  }
}
