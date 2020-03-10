import { get } from 'svelte/store'
import paginateStore from '../index'

describe('paginate a store:', () => {
  describe('create a store with default settings:', () => {
    const mainStore = paginateStore()
    const { store, currentPage, perPage, data } = get(mainStore)

    test('store is null', () => {
      expect(store).toBeNull()
    })

    test('currentPage is 1', () => {
      expect(currentPage).toBe(1)
    })

    test('perPage is 4', () => {
      expect(perPage).toBe(4)
    })

    test('data array exists and is empty', () => {
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(0)
    })
  })

  describe('create a store with data:', () => {
    let mockData = []

    for (let i = 1; i <= 16; i++) mockData.push({ id: i })

    describe('and default settings:', () => {
      const mainStore = paginateStore(mockData)
      const { store, currentPage, perPage, data } = get(mainStore)

      test('store is null', () => {
        expect(store).toBeNull()
      })

      test('currentPage is 1', () => {
        expect(currentPage).toBe(1)
      })

      test('perPage is 4', () => {
        expect(perPage).toBe(4)
      })

      test('data array exists with a length that matches perPage', () => {
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(perPage)
        expect(data.pop()).toEqual({ id: 4 })
      })
    })

    describe('and custom settings:', () => {
      const customOptions = {
        store: true,
        currentPage: 2,
        perPage: 6
      }

      const mainStore = paginateStore(mockData, customOptions)
      const { store, currentPage, perPage, data } = get(mainStore)

      test('store array exists with a length of 16', () => {
        expect(Array.isArray(store)).toBe(true)
        expect(store.length).toBe(16)
      })

      test('currentPage is 2', () => {
        expect(currentPage).toBe(2)
      })

      test('perPage is 6', () => {
        expect(perPage).toBe(6)
      })

      test('data array exists with a length that matches perPage', () => {
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBe(perPage)
        expect(data.pop()).toEqual({ id: 12 })
      })

      describe('currentPage > total pages:', () => {
        const customOptions = {
          store: true,
          currentPage: 2,
          perPage: 20
        }

        const mainStore = paginateStore(mockData, customOptions)
        const { store, currentPage, perPage, data } = get(mainStore)

        test('currentPage resets to 1', () => {
          expect(currentPage).toBe(1)
        })

        test('data array exists with a length that matches store.length', () => {
          expect(Array.isArray(data)).toBe(true)
          expect(data.length).toBe(store.length)
          expect(data.pop()).toEqual({ id: 16 })
        })
      })

      describe("currentPage || perPage aren't positive numbers of type String || Int", () => {
        const customOptions = {
          store: true,
          currentPage: -10,
          perPage: 'fifty'
        }

        const mainStore = paginateStore(mockData, customOptions)
        const { currentPage, perPage, data } = get(mainStore)

        test('currentPage resets to default of 1', () => {
          expect(currentPage).toBe(1)
        })

        test('perPage resets to default of 4', () => {
          expect(perPage).toBe(4)
        })

        test('data array exists with a length that matches default perPage', () => {
          expect(Array.isArray(data)).toBe(true)
          expect(data.length).toBe(4)
          expect(data.pop()).toEqual({ id: 4 })
        })
      })
    })
  })
})
