import { Check, Heart, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'

interface Product {
  name: string
  price: number
  url: string
}
interface CardProps {
  product: Product
  onPlus: ({ name, price, url }: { name: string, price: number, url: string }) => void
}
function Card({ product, onPlus }: CardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [favorite, setFavorite] = useLocalStorage<Product[]>('favorits', [])
  const onClickPlus = () => {
    onPlus({ name: product.name, price: product.price, url: product.url })
    setIsAdded(!isAdded)
  }

  useEffect(() => {
    if (favorite.find(item => item.name === product.name))
      setIsLiked(true)
  }, [favorite, product.name])

  const onClickLike = () => {
    setFavorite([...favorite, product])
    if (favorite.find(item => item.name === product.name))
      setIsLiked(isLiked === true)

    setIsLiked(!isLiked)
  }
  return (
    <>
      <div className="flex flex-col gap-3 border border-[#f3f3f3] px-7 pb-8 pt-5 rounded-[40px] transition-all ease-in-out hover:-translate-y-5 hover:shadow-lg w-[230px] relative">
        <img src={product.url} alt="" />

        <p className="text-black">{product.name}</p>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-[#BDBDBD] text-xs font-medium">Цена:</span>
            <span className="font-bold">
              {product.price}
              {' '}
              руб.
            </span>
          </div>
          <button
            className={
              isAdded
                ? 'bg-green-700 rounded-lg p-2.5'
                : 'border border-[#F2F2F2] rounded-lg p-2.5'
            }
            onClick={onClickPlus}
          >
            {isAdded
              ? (
                <Check className="stroke-white " />
                )
              : (
                <Plus className="stroke-[#f2f2f2]" />
                )}
          </button>
        </div>
        <button
          className={
            isLiked
              ? `bg-[#FEF0F0] border border-[#F2F2F2] rounded-lg p-2.5 absolute`
              : `bg-transparent border border-[#F2F2F2] rounded-lg p-2.5 absolute`
          }

        >
          <Heart
            className={
              isLiked ? `fill-[#FF8585] stroke-[#FF8585]` : `stroke-[#f2f2f2]`
            }
            onClick={onClickLike}
          />
        </button>
      </div>
    </>
  )
}

export default Card
