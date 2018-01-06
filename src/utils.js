export const assign = (obj, ...props) => {
  props.forEach(prop => {
    for (let i in prop) obj[i] = prop[i]
  })
	return obj
}

export const compose = (...fns) => (initialValue) =>
  fns.reduce((val, fn) => fn(val), initialValue)
