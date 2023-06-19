
import { AiOutlinePlus, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import './App.css';
import Swal from 'sweetalert2';

function App() {

  const addItem = async () =>{
  
    const { value: formValues } = await Swal.fire({
      title: 'Add User',
      html:
        '<input type="text" id="swal-input1" placeholder="Name" class="swal2-input" required>' +
        '<input type="email" id="swal-input2" placeholder="Email" class="swal2-input" required>'+
        '<input type="number" id="swal-input3" placeholder="Phone Number" class="swal2-input" required>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value
        ]
      }
    })
    if (formValues) {
      if(formValues[0]==''||formValues[1]==''||formValues[2]==''){
        Swal.fire({
          icon:'error',
          text:'Please fill all fields'
        })
      }
      else{
        Swal.fire(JSON.stringify(formValues))
      }
    }
    
  }

  return (
    <div className='relative'>
      <div className='main-body min-h-screen w-full absolute top-0 left-0 -z-10' >
      </div>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='w-[80%] mx-auto md:h-[38rem] h-[calc(100vh-5rem)] bg-white rounded-md shadow-xl overflow-y-scroll' >
          <div className='sticky top-0 bg-white'>
            <div className='flex items-center justify-between border-b-2 pb-3 p-5'>
              <h3 className='md:text-xl text-sm font-semibold'>User <span className='text-blue-600' >Management</span></h3>
              <button onClick={addItem} className='md:text-base text-xs flex items-center md:gap-2 gap-1 md:border-2 border border-blue-600 md:px-2 px-1 py-1 rounded-md text-blue-600 font-semibold hover:text-white hover:bg-blue-600 duration-200'> <AiOutlinePlus /> Add New</button>
            </div>
          </div>

          <div className='grid md:grid-cols-4 grid-cols-1 gap-5 pt-5 px-5'>
            {
              [...Array(22)].map(v => <div key={v} className='shadow-xl bg-slate-50 rounded-xl flex justify-between overflow-hidden'>
                <div className='p-4 text-sm'>
                  <h1>Name: Rajib Sadhu</h1>
                  <h1>Email: rajib.sadhu1998@gmail.com</h1>
                  <h1>Phone: +91 9126765077</h1>
                </div>
                <div className='grid grid-cols-1' >
                  <button className='bg-red-500 p-2 text-red-200' ><AiFillDelete /></button>
                  <button className='bg-green-400 p-2 text-green-800' ><AiFillEdit /></button>
                </div>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
