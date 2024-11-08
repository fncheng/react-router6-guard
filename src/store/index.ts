import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface CounterStore {
    count: number
    name: string
    increment?: () => void
    updateName?: () => void
}

interface UserStore {
    username: string
    password: string
    setUsername: (username: string) => void
    setPassword: (password: string) => void
}

export const useZStore = create<CounterStore>()(
    devtools(
        immer(
            persist(
                (set) => ({
                    count: 0,
                    name: 'zs',
                    increment: () =>
                        set(
                            (state) => {
                                state.count += 2
                            },
                            false,
                            'INCREMENT'
                        ),
                    updateName: () =>
                        set(
                            (state) => {
                                state.name += '1'
                            },
                            false,
                            'UPDATE_NAME'
                        )
                }),
                { name: 'Counter', storage: createJSONStorage(() => sessionStorage) }
            )
        )
    )
)

export const useUserStore = create<UserStore>()(
    devtools(
        (set) => ({
            username: '',
            password: '',
            setUsername: (username: string) => set({ username }, false, 'SET_USERNAME'),
            setPassword: (password: string) => set({ password }, false, 'SET_PASSWORD')
        }),
        { name: 'User' }
    )
)
