"use client"

import type React from "react"
import { createContext, useReducer, useContext, type ReactNode } from "react"
import { bookingReducer, createInitialState } from "./booking-reducer"
import type { BookingState, BookingAction } from "./booking-types"

// Extend props to accept initialCourse
interface BookingProviderProps {
  children: ReactNode
  initialCourse?: {
    id: string
    name: string
    price: number
    age: string
    image?: string
    formTitle?:string[]

  }
}

const BookingContext = createContext<{
  state: BookingState
  dispatch: React.Dispatch<BookingAction>
} | null>(null)

export function BookingProvider({ children, initialCourse }: BookingProviderProps) {
  const [state, dispatch] = useReducer(bookingReducer, undefined, () => createInitialState(initialCourse))

  return <BookingContext.Provider value={{ state, dispatch }}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
export type { BookingState }
