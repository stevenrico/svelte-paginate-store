export function prevPage(store) {
  return () =>
    store.update(prevState => {
      let { currentPage } = prevState

      if (currentPage === 1) return prevState

      currentPage -= 1

      return {
        ...prevState,
        currentPage
      }
    })
}

export function nextPage(store) {
  return () =>
    store.update(prevState => {
      let { currentPage, totalPages } = prevState

      if (currentPage === totalPages) return prevState

      currentPage += 1

      return {
        ...prevState,
        currentPage
      }
    })
}

export function goToPage(store) {
  return value =>
    store.update(prevState => {
      let { currentPage, totalPages } = prevState

      if (typeof value !== 'number' || value <= 0) {
        console.warn(
          'WARNING: goToPage() accepts positive integers only. Check your implementation.'
        )
        return prevState
      }

      if (value > totalPages) {
        console.warn(
          'WARNING: the argument given in goToPage() exceeds totalPages. Check your implementation.'
        )
        return prevState
      }

      currentPage = value

      return {
        ...prevState,
        currentPage
      }
    })
}

export function updatePerPage(store) {
  return value =>
    store.update(prevState => {
      let { currentPage, perPage, totalPages, data } = prevState

      perPage = value
      totalPages = Math.ceil(data.length / perPage)

      if (totalPages < currentPage) currentPage = totalPages

      return {
        ...prevState,
        currentPage,
        perPage,
        totalPages
      }
    })
}
