export class TodoElement {
  id: string;
  text: string;
  checked: number;
  constructor(_id, _text, _checked) {
    this.id = _id;
    this.text = _text;
    this.checked = _checked;
  }
}
