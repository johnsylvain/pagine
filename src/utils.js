// Object.assign fill-in
export const assign = (obj, ...props) => props.reduce((acc, prop) => {
  for (let i in prop) acc[i] = prop[i]
  return acc
}, obj)

// compose functions left-to-right
export const compose = (...fns) => (initialValue) =>
  fns.reduce((val, fn) => fn(val), initialValue)
