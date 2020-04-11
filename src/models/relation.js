export default class Relation {
  constructor(firstID, secondID, pivotProps = null) {
    this.firstID = firstID;
    this.secondID = secondID;
    this.pivotProps = pivotProps;
  }
}
