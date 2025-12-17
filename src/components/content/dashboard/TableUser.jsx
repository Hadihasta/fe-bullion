import { formatDate } from '@/lib/helper'

const TableUser = ({
  users = [],
  loading,
  currentPage,
  totalPage,
  onPageChange,
}) => {
  if (loading) {
    return <div className="p-6 text-gray-500">Loading data user...</div>
  }

  if (!users.length) {
    return <div className="p-6 text-gray-500">Data user tidak tersedia</div>
  }

  return (
    <div className="flex flex-col h-full justify-between">
      {/* TABLE */}
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 text-sm text-gray-500">
          <tr>
            <th className="px-6 py-4 text-left">Account ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user._id}
              className={idx % 2 === 0 ? 'bg-orange-50/40' : ''}
            >
              <td className="px-6 py-4">{user._id}</td>
              <td className="px-6 py-4 font-medium">{user.name}</td>
              <td className="px-6 py-4 text-gray-600">
                {formatDate(user.date_of_birth)}
              </td>
              <td className="px-6 py-4">
                <span className="px-4 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Registered
                </span>
              </td>
              <td className="px-6 py-4 text-orange-500 flex gap-4">
                <button>👁 Lihat</button>
                <button>✏️ Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 px-6 py-4 border-t text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPage }).map((_, i) => {
          const page = i + 1
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-orange-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          disabled={currentPage === totalPage}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPage
              ? 'text-gray-400 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TableUser
