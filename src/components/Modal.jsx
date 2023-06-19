
const Modal = () => {
    return (
        <div>
            <dialog id="my_modal_4" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Create New User</h3>
                    <div className="p-5 flex flex-col gap-5">
                        <input type="text" placeholder="Enter Name" className="input w-full max-w-xs" />
                        <input type="text" placeholder="Enter Email" className="input w-full max-w-xs" />
                        <input type="text" placeholder="Enter Phone Number" className="input w-full max-w-xs" />
                        <input type="submit" className="btn bg-blue-600 text-white btn-sm" value='Add' />
                    </div>
                    <div className="modal-action">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default Modal;