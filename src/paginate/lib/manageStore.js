import { writable, derived } from 'svelte/store'

export function createStore(data, options) {
  const validate = value => {
    if (Math.sign(value) <= 0) return false

    return parseInt(value)
  }

  let currentPage = validate(options.currentPage) || 1
  const perPage = validate(options.perPage) || 4
  const totalPages = Math.ceil(data.length / perPage)
  const from = (currentPage - 1) * perPage
  const to = currentPage * perPage

  currentPage = currentPage > totalPages ? 1 : currentPage

  return writable({
    store: options.store ? data : null,
    currentPage,
    perPage,
    totalPages,
    from,
    to,
    data
  })
}

export function paginateStore(store) {
  return derived(store, $store => {
    let { currentPage, perPage, from, to, data } = $store

    from = (currentPage - 1) * perPage
    to = currentPage * perPage

    return {
      ...$store,
      data: data.slice(from, to)
    }
  })
}

export function addToStore(store) {
  return dataToAdd =>
    store.update(prevState => {
      let { store, perPage, totalPages, data } = prevState

      if (!Array.isArray(dataToAdd)) {
        if (typeof dataToAdd === typeof data[0]) {
          console.warn(
            'WARNING: Data added to store is not an array, the data has been added to the store because the data type is a match. Please check implementation.'
          )

          data = [...data, dataToAdd]
        } else {
          throw Error('Data type of data being added to store does not match.')
        }
      } else {
        data = [...data, ...dataToAdd]
      }

      totalPages = Math.ceil(data.length / perPage)

      if (store) {
        store = data
      }

      return {
        ...prevState,
        store,
        totalPages,
        data
      }
    })
}
