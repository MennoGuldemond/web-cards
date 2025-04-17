import { ElementRef } from '@angular/core';

/** Returns if two object are equal in terms of properties and values. */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 === obj2;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  return true;
}

/** Returns the DOM element of a ship given it's Id. */
export function getShipElement(shipId: string): Element {
  return document.querySelector(`[data-ship-id="${shipId}"]`);
}

/** Returns the element ref of a ship given it's Id. */
export function getShipElementRef(shipId: string): ElementRef {
  const el = document.querySelector(`[data-ship-id="${shipId}"]`);
  return el ? new ElementRef(el) : null;
}

/** Returns the array shuffled randomly. */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
