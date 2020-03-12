import { get } from 'svelte/store'
import paginateStore from '../index'

describe('add data to an exisitng store:', () => {
  let mainStore
  let mockData

  beforeEach(() => {
    mockData = []

    for (let i = 1; i <= 16; i++) mockData.push({ id: i })

    mainStore = paginateStore(mockData, { store: true })
  })

  test('store array updates with a length that matches (initial data + added data).length', () => {
    const { addToStore } = mainStore

    let dataToAdd = []

    for (let i = 17; i <= 32; i++) dataToAdd.push({ id: i })

    addToStore(dataToAdd)

    const { store } = get(mainStore)

    expect(Array.isArray(store)).toBe(true)
    expect(store.length).toBe(mockData.length + dataToAdd.length)
    expect(store.pop()).toEqual({ id: 32 })
  })

  describe('validate added data:', () => {
    describe('data !== array:', () => {
      let consoleOutput

      beforeEach(() => {
        consoleOutput = []
        console.warn = output => consoleOutput.push(output)
      })

      const warnReset = console.warn

      afterEach(() => (console.warn = warnReset))

      test('if data type is a match it displays a warning and adds data to the store', () => {
        const { addToStore } = mainStore

        let dataToAdd = { id: 17 }

        addToStore(dataToAdd)

        const { store } = get(mainStore)

        expect(Array.isArray(store)).toBe(true)
        expect(store.length).toBe(mockData.length + 1)
        expect(store.pop()).toEqual({ id: 17 })
        expect(consoleOutput).toEqual([
          'WARNING: Data added to store is not an array, the data has been added to the store because the data type is a match. Please check implementation.'
        ])
      })

      test("if data type doesn't match addToStore throws an error", () => {
        const { addToStore } = mainStore

        let dataToAdd = 'string'

        expect(() => addToStore(dataToAdd)).toThrow(
          new Error('Data type of data being added to store does not match.')
        )
      })
    })
  })
})
