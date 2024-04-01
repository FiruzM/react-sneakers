import { Search } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Header from './components/Header'
import Card from './components/Card'
import { getItems } from './api/items/get-items'
import { storeItem } from './api/items/store-item'

interface Product {
  name: string
  price: number
  url: string
}

function App() {
  const queryClient = useQueryClient()
  const [searchValue, setSearchValue] = useState('')

  const { mutate } = useMutation({
    mutationFn: (obj: Product) => storeItem(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] })
    },
  })

  const { data } = useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  })

  const ondAddToCart = (obj: Product) => {
    mutate(obj)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="max-w-[1080px] bg-white rounded-2xl mx-auto">
      <Header />

      <main className="px-14 py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-black">Все кроссовки</h2>
          <div className="relative">
            <input
              onChange={onSearch}
              type="text"
              className="border border-[#f2f2f2] rounded-xl h-[45px] pl-10 pr-5 focus-visible:outline-gray-300"
              placeholder="Поиск..."
            />
            <Search className="stroke-[#f2f2f2] absolute top-2.5 left-3" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10 mt-10">
          {
            data?.data.filter((item: Product) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((product: Product) => (
              <Card product={product} key={product.name} onPlus={obj => ondAddToCart(obj)} />
            ))
          }

        </div>
      </main>
    </div>
  )
}

export default App
