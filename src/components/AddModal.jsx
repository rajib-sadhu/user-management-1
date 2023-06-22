import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai'
import Swal from 'sweetalert2';

const AddModal = ({ handleAddNewModalClose, refetch }) => {

    const handleAddUser = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const addUser = {
            name,
            email,
            phone
        }

        axios.post('https://skids-task-server.vercel.app/users', addUser)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire(
                        'User added successfully!',
                        'You clicked the OK button!',
                        'success'
                    )
                    handleAddNewModalClose();
                    refetch()
                    form.reset()
                }
                if (res.data.message) {
                    Swal.fire(
                        `${res.data.message}`,
                        'Please try again!',
                        'error'
                    )
                }


            })

    }


    return (
        <div>
            <div className="modal-wrapper"> </div>
            <div className="modal-container">
                <div className="md:w-[30rem] w-[20rem] bg-white p-5 rounded-xl">
                    <div className="border-b-2 pb-2 flex justify-between items-center">
                        <h2 className="text-xl" >Add User</h2>
                        <button onClick={handleAddNewModalClose} title='close' ><AiFillCloseCircle className='text-2xl text-red-600' /></button>
                    </div>
                    <form onSubmit={handleAddUser} className='flex flex-col gap-5 my-5' >
                        <input type="text" name='name' placeholder='Enter Name' required />
                        <input type="email" name='email' placeholder='Enter Email' required />
                        <input type="number" name='phone' placeholder='Enter Phone' required />
                        <button type='submit' className='bg-[#9ea1ff] px-3 py-1 font-semibold text-white hover:bg-[#6b70ff] mx-auto' >Add</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AddModal;