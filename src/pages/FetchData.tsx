import orderApi from '../api/orders'
import productApi from '../api/product'
import userApi from '../api/users'

const FetchData = () => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => orderApi.create()}
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        New Order
      </button>
      <button
        onClick={() => userApi.create()}
        className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
      >
        New User
      </button>
      <button
        onClick={() => productApi.create(3)}
        className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
      >
        New Product
      </button>
    </div>

  )
}

export default FetchData