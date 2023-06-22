import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const EditModal = ({ handleEditModalClose, updateData, refetch }) => {


    const handleUpdateUser = (e) => {
        e.preventDefault()

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const updateUser = {
            name,
            email,
            phone
        }

        axios.put('https://skids-task-server.vercel.app/users', updateUser)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount) {
                    Swal.fire(
                        'User updated successfully!',
                        'You clicked the OK button!',
                        'success'
                    )
                    handleEditModalClose();
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
            <div>
                <div className="modal-wrapper"> </div>
                <div className="modal-container">
                    <div className="md:w-[30rem] w-[20rem] bg-white p-5 rounded-xl">
                        <div className="border-b-2 pb-2 flex justify-between items-center">
                            <h2 className="text-xl" >Update User</h2>
                            <button onClick={handleEditModalClose} title='close' ><AiFillCloseCircle className='text-2xl text-red-600' /></button>
                        </div>
                        <form onSubmit={handleUpdateUser} className='flex flex-col gap-5 my-5' >
                            <input defaultValue={updateData.name} type="text" name='name' placeholder='Enter Name' required />
                            <input defaultValue={updateData.email} type="email" name='email' placeholder='Enter Email' required />
                            <input defaultValue={updateData.phone} type="number" name='phone' placeholder='Enter Phone' required />
                            <button type='submit' className='bg-[#9ea1ff] px-3 py-1 font-semibold text-white hover:bg-[#6b70ff] mx-auto' >Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;