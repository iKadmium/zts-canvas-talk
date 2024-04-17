type OnChangeCallback = (value: number) => void;

export class TransformVar {
  private value: number = 0;
  private input: HTMLInputElement;
  private span: HTMLSpanElement;

  constructor(name: string) {
    const input = document.querySelector<HTMLInputElement>(`#${name}`);
    const span = document.querySelector<HTMLSpanElement>(`#${name}Value`);

    if (!input) {
      throw new Error(`Input for ${name} not found`);
    }
    if (!span) {
      throw new Error(`Span for ${name} not found`);
    }

    this.input = input;
    this.span = span;

    input.addEventListener("input", (ev) => this.onChange());
    input.addEventListener("dblclick", (ev) => {
      this.input.value = "0";
      this.onChange();
    });
    this.onChange();
  }

  private onChange() {
    this.value = parseFloat(this.input.value);
    this.span.textContent = this.value.toString();
  }

  public get lastValue(): number {
    return this.value;
  }
}
