import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/helper'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getDetailUser, editUser } from '@/services/adminService'
import ContentModalEdit from './ContentModalEdit'
import ContentModalDetail from './ContentModalDetail'
import { Eye, SquarePen } from 'lucide-react'
import NextImage from '@/components/global/NextImage'

const TableUser = ({ users = [], loading, currentPage, totalPage, onPageChange, onSuccess }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogType, setDialogType] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  

 
  const handleOpen = (type, user) => {
    setDialogType(type)
    setSelectedUser(user)
    setOpenDialog(true)
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading data user...</div>
  }

  if (!users.length) {
    return <div className="p-6 text-gray-500">Data user tidak tersedia</div>
  }

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        {/* table */}
        <table className="w-full border-collapse">
          <thead className="bg-white text-sm text-gray-500 h-[63px]">
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
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-flamingo-50'
                } text-sm font-medium h-[63px] hover:bg-gray-100 cursor-default`}
              >
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4 ">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{formatDate(user.date_of_birth)}</td>
                <td className=" py-4">
                  <span className="px-6 py-1 rounded-full w-full bg-greenBackground text-greenText">Registered</span>
                </td>
                <td className="px-6 py-4 text-orange-500 flex gap-4 cursor-pointer">
                  <button
                    className="cursor-pointer flex-row gap-2 items-center py-2"
                    onClick={() => {
                      handleOpen('lihat', user)
                    }}
                  >
                    {' '}
                    <Eye
                      className="h-4 w-4"
                      color="#FD5725"
                    />
                    Lihat
                  </button>
                  <button
                    className="cursor-pointer flex-row gap-2 items-center py-2"
                    onClick={() => handleOpen('edit', user)}
                  >
                   <SquarePen className="h-4 w-4" color="#FD5725" /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pgnation */}
        <div className="flex justify-end items-center gap-2 px-6 py-4  text-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
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
                className={`px-3 py-1 rounded bg-backgroundGray ${
                  currentPage === page ? 'bg-primaryOrange text-white' : 'hover:bg-gray-500'
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
              currentPage === totalPage ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* modal */}
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent >
          <DialogHeader className={`flex-space-beetween`}>
            <DialogTitle className={`modal_label `}>{dialogType === 'lihat' ? 'Lihat User' : 'Edit User'} </DialogTitle>
            <button onClick={()=>setOpenDialog(false)} className='cursor-pointer' >
               <NextImage
              src="./asset/icon/cancel-circle.svg"
              alt="close icon"
              width={25}
              height={25}
            />
            </button >
          </DialogHeader>

          {dialogType === 'lihat' && selectedUser && (
            <ContentModalDetail id={selectedUser._id} />
           
          )}

          {dialogType === 'edit' && (
            <div className="text-sm text-gray-500">
              <ContentModalEdit
                id={selectedUser._id}
                onSubmit={() => {
                  setOpenDialog(false), onSuccess()
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TableUser
