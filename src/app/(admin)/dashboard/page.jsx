import React from 'react'
import TableUser from '@/components/content/dashboard/TableUser'
import ButtonAddUser from '@/components/content/dashboard/ButtonAddUser'

const page = () => {
  return (
    <div className="flex-col">
      <div
        id="head-label"
        className="h-[20vh] flex-row-middle p-6"
      >
        <div
          className=" w-full
            bg-white
            py-2
            px-9
            page_label
            rounded-lg
            flex-start
            min-h-[103px]
            justify-between
           "
        >
          {' '}
          <div>User Aktif</div>
          <div id="button-add-user">
            <ButtonAddUser />
          </div>
        </div>
      </div>
      <div
        id="body-tabel"
        className="h-[80vh] px-6 pb-6"
      >
        <div
          className="w-full
            bg-white p-2   rounded-lg h-full"
        >
          <TableUser />
        </div>
      </div>
    </div>
  )
}

export default page
