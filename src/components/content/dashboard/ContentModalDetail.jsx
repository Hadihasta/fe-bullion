import { useEffect, useState } from 'react'
import { getDetailUser } from '@/services/adminService'

const ContentModalDetail = (id) => {
  const [dataUser, setDataUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const inspectUser = async (id) => {
      try {
        const { id: userId } = id
        // console.log(id)
        const res = await getDetailUser(userId)
        setDataUser(res.data)
        setLoading(false)
      } catch (error) {
        if (error) {
          ToasterNotif('error', `${'Something Goes Wrong...'}`, '#ef4444')
        }
      }
    }
    inspectUser(id)
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!dataUser) return <div>Data tidak ditemukan</div>
  return (
    <div className="p-6 w-full justify-self-center">
      {/* FOTO */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-sm font-semibold mb-2">Foto Profil</div>
        <img
          src={dataUser?.photo && `data:image/jpeg;base64,${dataUser.photo}`}
          alt="Foto Profil"
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      {/* DATA */}
      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <div>
          <div className="font-semibold">Nama Depan</div>
          <div>{dataUser.first_name}</div>
        </div>

        <div>
          <div className="font-semibold">Nama Belakang</div>
          <div>{dataUser.last_name}</div>
        </div>

        <div>
          <div className="font-semibold">Jenis Kelamin</div>
          <div>{dataUser.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</div>
        </div>

        <div>
          <div className="font-semibold">Tanggal Lahir</div>
          <div>
            {new Date(dataUser.date_of_birth).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>

        <div className="col-span-2">
          <div className="font-semibold">Email</div>
          <div>{dataUser.email}</div>
        </div>

        <div className="col-span-2">
          <div className="font-semibold">No. Handphone</div>
          <div>{dataUser.phone}</div>
        </div>

        <div className="col-span-2">
          <div className="font-semibold">Alamat</div>
          <div>{dataUser.address}</div>
        </div>
      </div>
    </div>
  )
}

export default ContentModalDetail
