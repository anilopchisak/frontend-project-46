export default (spacesCount, depth, shiftLeft = true) => {
  const shift = shiftLeft === true ? 2 : 0
  return ' '.repeat(spacesCount * depth - shift)
}
