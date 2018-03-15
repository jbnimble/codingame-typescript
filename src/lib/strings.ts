
export class Strings {
  constructor(public str:string) {}

  public group():string[] {
    let result = [];
    let input = this.str;
    if (input.length > 0) {
      let index = this.findNextValueIndex(input);
      while (index !== -1) {
        result.push(input.substring(0,index));
      }
    }
    return result;
  }

  private findNextValueIndex(input:string):number {
    let index = -1;
    if (input.length === 1) {
      index = 0;
    } else if (input.length > 1) {
      index = input.search(new RegExp('^[^/'+input[0]+']'));
    }
    return index;
  }
}
