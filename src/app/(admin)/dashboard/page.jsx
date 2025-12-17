'use client'
import {useEffect, useState} from 'react'
import TableUser from '@/components/content/dashboard/TableUser'
import ButtonAddUser from '@/components/content/dashboard/ButtonAddUser'
import { fetchTableUser } from '@/services/adminService'
import { DUMMY_USERS } from '@/constants/dummyUser'


const page = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

const ITEMS_PER_PAGE = 5

  useEffect(() => {
    const masterUsers = async () => {
      setLoading(true)
      try {
        // ⬇️ nanti tinggal kirim page & limit ke API
        const res = await fetchTableUser({ page, limit: ITEMS_PER_PAGE })

        // 🔧 sesuaikan dengan response API kamu
        if (res?.data?.length) {
          setUsers(res.data)
          setTotalPage(res.meta?.total_page ?? 5)
        } else {
          throw new Error('Empty')
        }
      } catch (err) {
        console.warn('API unavailable, using dummy')

        // dummy pagination
        const start = (page - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE

        setUsers(DUMMY_USERS.slice(start, end))
        setTotalPage(Math.ceil(DUMMY_USERS.length / ITEMS_PER_PAGE))
      } finally {
        setLoading(false)
      }
    }

    masterUsers()
  }, [page])

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
        <TableUser
            users={users}
            loading={loading}
            currentPage={page}
            totalPage={totalPage}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default page
