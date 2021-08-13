/* eslint-disable no-nested-ternary */
// 'use strict';
const isFunction = (input) => typeof input === 'function'
export default (predicate) => (elemOrThunk) =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null
