interface AddModalInterface {
  toggleModal: any;
  deleteTodoHandler: any;
  id: string;
}

const DeleteModal = ({
  toggleModal,
  deleteTodoHandler,
  id,
}: AddModalInterface) => {
  return (
    <div className="bg-black/40 absolute inset-0 w-screen h-screen flex justify-center pt-44">
      <div className="bg-white flex flex-col items-center text-black shadow-md rounded-lg z-20 w-[620px] h-[200px] px-8 py-12">
        <div className="font-semibold text-2xl max-w-xs text-center">
          Are you sure you want to delete this task?
        </div>
        <div className="space-x-3 mt-6">
          <button
            onClick={() => deleteTodoHandler(id)}
            className="bg-custom-purple border border-custom-purple rounded-lg py-2 px-8 text-white"
          >
            Delete
          </button>
          <button
            onClick={toggleModal}
            className="rounded-lg py-2 px-8 border-gray-300 border"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
