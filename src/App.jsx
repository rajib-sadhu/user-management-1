
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import './App.css';
import AddModal from './components/AddModal';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditModal from './components/EditModal';

function App() {

  const [showIntro, setShowIntro] = useState(true);

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const handleAddNewModalClose = () => setShowAddNewModal(false);
  const handleEditModalClose = () => {
    setShowEditModal(false)
    setUpdateData({})
  };

  const dataUpdate = (id) => {
    setShowEditModal(true)
    axios('https://skids-task-server.vercel.app/users')
      .then(res => {
        const allUsers = res.data;
        const filterUser = allUsers.filter(user => user._id === id);
        setUpdateData(filterUser[0])
      })
  }

  const handleDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://skids-task-server.vercel.app/users/${id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              refetch()
            }
          })
      }
    })


  }

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios('https://skids-task-server.vercel.app/users')
      return res.data;
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if(showIntro){
    return(
      <div>
        <div className="h-screen grid place-content-center text-pop-up-top bg-[#9ea1ff] text-white" >
          <h1 className='uppercase font-semibold md:text-4xl text-xl text-center' >Welcome to <br /> Simple User Management</h1>
        </div>
      </div>
    )
  }

  return (
    <div className='relative overflow-hidden'>
      <div className='main-body min-h-screen w-full absolute -z-10' >
      </div>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-[80%] mx-auto md:h-[38rem] h-[calc(100vh-5rem)] bg-white rounded-md shadow-xl show_all_users' >
          <div className='sticky top-0 bg-white'>
            <div className='flex items-center justify-between border-b-2 pb-3 p-5'>
              <h3 className='md:text-xl text-sm font-semibold'>User <span className='text-blue-600' >Management</span></h3>
              <button title='Add new user' onClick={() => setShowAddNewModal(true)} className='md:text-base text-xs flex items-center md:gap-2 gap-1 md:border-2 border border-blue-600 md:px-2 px-1 py-1 rounded-md text-blue-600 font-semibold hover:text-white hover:bg-blue-600 duration-200'> <AiOutlinePlus /> Add New</button>
            </div>
            <div>
              {showAddNewModal && <AddModal handleAddNewModalClose={handleAddNewModalClose} refetch={refetch} />}
              {showEditModal && <EditModal updateData={updateData} handleEditModalClose={handleEditModalClose} refetch={refetch} />}
            </div>
          </div>
          {
            isLoading ?
              <div className='h-[20rem] w-full grid place-content-center' ><span className="loading loading-spinner loading-lg"></span> </div>
              :
              <div className='grid md:grid-cols-4 grid-cols-1 gap-5 pt-5 px-5 '>
                {
                  users.map(v => <div key={v._id} className='shadow-xl bg-slate-50 rounded-xl flex justify-between overflow-hidden'>
                    <div className='p-4 text-sm'>
                      <h1>Name: {v.name} </h1>
                      <h1>Email: {v.email}</h1>
                      <h1>Phone: {v.phone}</h1>
                    </div>
                    <div className='flex flex-col justify-between' >
                      <button title='Delete user' onClick={() => handleDelete(v._id)} className='bg-red-500 p-2 text-red-200 flex-1 hover:opacity-75' ><AiFillDelete /></button>
                      <button title='Edit user' onClick={() => dataUpdate(v._id)} className='bg-green-400 p-2 text-green-800 flex-1 hover:opacity-75' ><AiFillEdit /></button>
                    </div>
                  </div>)
                }
              </div>
          }

        </div>
      </div>
    </div>
  )
}

export default App
