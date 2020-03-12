import { get } from 'svelte/store'
import paginateStore from '../index'

describe('methods that manage pagination data:', () => {
  let mainStore
  let mockData

  beforeEach(() => {
    mockData = []

    for (let i = 1; i <= 6; i++) mockData.push({ id: i })

    const options = { currentPage: 2, perPage: 2 }

    mainStore = paginateStore(mockData, options)
  })

  describe('(currentPage = 2) prevPage is called:', () => {
    test('prevPage is called once, currentPage = 1', () => {
      const { prevPage } = mainStore

      prevPage()

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(1)
      expect(data).toEqual([{ id: 1 }, { id: 2 }])
    })

    test('prevPage is called twice, currentPage = 1', () => {
      const { prevPage } = mainStore

      prevPage()

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(1)
      expect(data).toEqual([{ id: 1 }, { id: 2 }])
    })
  })

  describe('(currentPage = 2) nextPage is called:', () => {
    test('nextPage is called once, currentPage = 3', () => {
      const { nextPage } = mainStore

      nextPage()

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(3)
      expect(data).toEqual([{ id: 5 }, { id: 6 }])
    })

    test('nextPage is called twice, currentPage = 3', () => {
      const { nextPage } = mainStore

      nextPage()

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(3)
      expect(data).toEqual([{ id: 5 }, { id: 6 }])
    })
  })

  describe('(currentPage = 2 & totalPages = 3) goToPage is called:', () => {
    let consoleOutput

    beforeEach(() => {
      consoleOutput = []
      console.warn = output => consoleOutput.push(output)
    })

    const warnReset = console.warn

    afterEach(() => (console.warn = warnReset))

    test('goToPage(1) is called, currentPage = 1', () => {
      const { goToPage } = mainStore

      goToPage(1)

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(1)
      expect(data).toEqual([{ id: 1 }, { id: 2 }])
    })

    test('goToPage(5) is called, currentPage = 2  and user is warned of incorrect use', () => {
      const { goToPage } = mainStore

      goToPage(5)

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(2)
      expect(data).toEqual([{ id: 3 }, { id: 4 }])
      expect(consoleOutput).toEqual([
        'WARNING: the argument given in goToPage() exceeds totalPages. Check your implementation.'
      ])
    })

    test('goToPage(0) is called, currentPage = 2  and user is warned of incorrect use', () => {
      const { goToPage } = mainStore

      goToPage(0)

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(2)
      expect(data).toEqual([{ id: 3 }, { id: 4 }])
      expect(consoleOutput).toEqual([
        'WARNING: goToPage() accepts positive integers only. Check your implementation.'
      ])
    })

    test("goToPage('three') is called, currentPage = 2 and user is warned of incorrect use", () => {
      const { goToPage } = mainStore

      goToPage('three')

      const { currentPage, data } = get(mainStore)

      expect(currentPage).toBe(2)
      expect(data).toEqual([{ id: 3 }, { id: 4 }])
      expect(consoleOutput).toEqual([
        'WARNING: goToPage() accepts positive integers only. Check your implementation.'
      ])
    })
  })

  describe('(perPage = 2 & store.length = 6) updatePerPage is called:', () => {
    test('(currentPage = 1) updatePerPage(4) is called, currentPage = 1 && data.length = 4', () => {
      const { prevPage, updatePerPage } = mainStore

      prevPage()
      updatePerPage(4)

      const { currentPage, perPage, data } = get(mainStore)

      expect(currentPage).toBe(1)
      expect(perPage).toBe(4)
      expect(data.length).toBe(4)
    })

    test('(currentPage = 2) updatePerPage(4) is called, currentPage = 2 && data.length = 2', () => {
      const { updatePerPage } = mainStore

      updatePerPage(4)

      const { currentPage, perPage, data } = get(mainStore)

      expect(currentPage).toBe(2)
      expect(perPage).toBe(4)
      expect(data.length).toBe(2)
    })

    test('(currentPage = 2) updatePerPage(6) is called, currentPage = 1 && data.length = 6', () => {
      const { updatePerPage } = mainStore

      updatePerPage(6)

      const { currentPage, perPage, data } = get(mainStore)

      expect(currentPage).toBe(1)
      expect(perPage).toBe(6)
      expect(data.length).toBe(6)
    })

    test('(currentPage = 2) updatePerPage(12) is called, currentPage = 1 && data.length = 6', () => {
      const { updatePerPage } = mainStore

      updatePerPage(12)

      const { currentPage, perPage, data } = get(mainStore)

      expect(currentPage).toBe(1)
      expect(perPage).toBe(12)
      expect(data.length).toBe(6)
    })
  })
})
