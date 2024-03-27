/**
 * Abstract class for managing a collection of items.
 */
export default abstract class Manager<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes an item.
   * @param item The item to remove.
   * @throws {Error} If the item is not in the array.
   */
  remove(item: T): void {
    const index = this.items.indexOf(item);
    if (index === -1) {
      throw new Error("Item not found.");
    }
    this.items.splice(index, 1);
  }
}
