import { CircleUserRound, Heart, ShoppingCart, X } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { useToast } from './ui/use-toast'
import { getCartItems } from '@/api/items/get-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import { deleteItem } from '@/api/items/delete-item'

interface ItemsProps {
  id: number
  name: string
  price: number
  url: string
}
function Header() {
  const { toast } = useToast()
  const [parent] = useAutoAnimate()

  const { data, refetch } = useQuery({
    queryKey: ['cartItems'],
    queryFn: getCartItems,
  })

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      toast({
        title: 'Товар удален',
        description: 'Товар был удален из корзины',
      })
      refetch()
    },
  })

  return (
    <header className="border-b border-[#]">
      <div className="p-11 flex justify-between items-center">
        <div className="flex items-center justify-between gap-4">
          <img src="img/sneakersLogo.png" alt="logo" />
          <div>
            <h3 className="text-xl font-bold text-black">React sneakers</h3>
            <p className="text-sm text-[#9D9D9D]">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="flex gap-8">
          <li className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger><ShoppingCart className="stroke-[#9B9B9B]" /></SheetTrigger>
              <SheetContent>
                <SheetHeader className="h-full">
                  <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                  {
                    data?.data.length > 0 ?                   <div className="flex flex-col justify-between h-full">
                    <ScrollArea className="h-[500px] mt-10">
                      <ul ref={parent} className="flex flex-col gap-5">
                        {
                        data?.data.map((item: ItemsProps) => (
                          <li key={item.id} className="flex justify-between items-center gap-5 border rounded-2xl p-5 overflow-hidden">
                            <img src={item.url} alt="" className="w-16 h-16" />
                            <div className="flex flex-col gap-1">
                              <p className="text-black ">{item.name}</p>
                              <div className="flex items-center justify-between">
                                <p className="text-black font-bold">
                                  {item.price}
                                  {' '}
                                  руб.
                                </p>
                                <button className="border border-[#9B9B9B] rounded-sm" onClick={() => mutate(item.id)}>
                                  <X className="stroke-[#9B9B9B]" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                      </ul>
                    </ScrollArea>
                    <div className="mt-auto">
                      something
                    </div>
                  </div>
                  :
                  <div className='flex flex-col justify-center items-center h-full'>
                    <img src="img/empty-box.png" alt="Empty box" className='w-[120px] h-[120px]' />
                    <h3 className='text-2xl font-semibold mt-5'>Корзина пуста</h3>
                    <p className='text-center text-base text-gray-500 mt-2.5'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                  </div>
                  }

                </SheetHeader>
              </SheetContent>
            </Sheet>

            <span className="font-semibold text-[#5C5C5C]">1205 руб.</span>
          </li>
          <li className="flex items-center gap-2">
            <Heart className="stroke-[#9B9B9B]" />
            <span className="text-[#5C5C5C]">Закладки</span>
          </li>
          <li className="flex items-center gap-2">
            <CircleUserRound className="stroke-[#9B9B9B]" />
            <span className="text-[#5C5C5C]">Профиль</span>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
