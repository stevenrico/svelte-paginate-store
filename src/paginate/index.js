import {
  createStore,
  paginateStore,
  addToStore,
  prevPage,
  nextPage,
  goToPage,
  updatePerPage
} from './lib'

function paginate(data = [], options = {}) {
  const store = createStore(data, options)

  const { subscribe } = paginateStore(store)

  return {
    subscribe,
    update: store.update,
    set: store.set,
    addToStore: addToStore(store),
    prevPage: prevPage(store),
    nextPage: nextPage(store),
    goToPage: goToPage(store),
    updatePerPage: updatePerPage(store)
  }
}

export default paginate
