'use client'
import { useEffect, useState } from 'react'
import TableUser from '@/components/content/dashboard/TableUser'
import ButtonAddUser from '@/components/content/dashboard/ButtonAddUser'
import { fetchTableUser, getTotalData } from '@/services/adminService'
import { DUMMY_USERS } from '@/constants/dummyUser'

const page = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [refetchKey, setRefetchKey] = useState(0)

  const ITEMS_PER_PAGE = 5

  useEffect(() => {
    // get semua data di database , karena di response tidak ada last page ataupun total data
    const loadTotalData = async () => {
      try {
        const res = await getTotalData()
        const totalData = res.data.length
        const lastPage = Math.ceil(totalData / ITEMS_PER_PAGE)
        setTotalPage(lastPage)
      } catch (error) {}
    }

    loadTotalData()
    //fetch  awal render saja
  }, [])

  useEffect(() => {
    const masterUsers = async () => {
      setLoading(true)
      try {
        // page = 1 / offset = 0
        // page = 2 / offset = 2 - 1 * 5 = 5
        const offset = (page - 1) * ITEMS_PER_PAGE

        const res = await fetchTableUser({ offset, limit: ITEMS_PER_PAGE })
        // console.log(res)

        if (res?.data?.length) {
          setUsers(res.data)
        } else {
          throw new Error('Empty')
        }
      } catch (err) {
        console.warn('API unavailable di luar jam kerja, using dummy data')

        // dummy pagination
        const start = (page - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE

        setUsers(DUMMY_USERS.slice(start, end))
        setTotalPage(Math.ceil(DUMMY_USERS.length / ITEMS_PER_PAGE))
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    }

    masterUsers()
  }, [page,refetchKey])

  const handleCloseModal = () => {
  setRefetchKey(prev => prev + 1)
}

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
            bg-white p-2   rounded-lg h-full "
        >
          <TableUser
            users={users}
            loading={loading}
            currentPage={page}
            totalPage={totalPage}
            onPageChange={setPage}
            onSuccess={handleCloseModal}
          />
        </div>
      </div>
    </div>
  )
}

export default page
