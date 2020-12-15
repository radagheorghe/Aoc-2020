
const bZero = BigInt(0);
const bOne = BigInt(1);

export function last<T>(aArray: Array<T>): T {
  return aArray[aArray.length - 1];
}

export function preLast<T>(aArray: Array<T>): T {
  return aArray[aArray.length - 2];
}

export function lastIndex<T>(aArray: Array<T>): number {
  return aArray.length - 1;
}

export function isEmpty<T>(aArray: Array<T>): boolean {
  return aArray.length == 0;
}

export function setBitByPos(aNumber: bigint, aBit: number): bigint {
  aNumber |= bOne << BigInt(aBit);
  return aNumber;
}

export function changeBitByPos(aNumber: bigint, aPos: number, aBit: number): bigint {
  let mask: bigint = bOne << BigInt(aPos); 
  return (aNumber & ~mask) | ((BigInt(aBit) << BigInt(aPos)) & mask);
}

export function hasBitSet(aNumber: bigint, aBit: number): boolean {
  return (aNumber & (bOne << BigInt(aBit))) === bZero ? false : true;
}
