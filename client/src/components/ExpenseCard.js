import { RiDeleteBin6Line } from "react-icons/ri";
import { LuClipboardPen } from "react-icons/lu";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { BsTagFill } from "react-icons/bs";
import { motion } from "framer-motion";

export default function ExpenseCard({ expense, onDelete }) {
  const axiosPublic = useAxiosPublic();

  const handleDeleteExpense = async (id) => {
    try {
      // Show confirmation dialog first
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosPublic.delete(`/api/tasks/delete/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "This expense has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
        if (onDelete) onDelete();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="border border-gray-300 rounded-xl p-4 sm:p-6 lg:p-8 bg-white shadow hover:shadow-lg transition-shadow w-full max-w-md mx-auto"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
            {expense.title}
          </h3>
          <div className="flex flex-col gap-2 mt-4">
            <span className="flex items-center text-xs sm:text-sm">
              Category {expense.category}
            </span>
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Amount: {expense.amount.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => handleDeleteExpense(expense._id)}
          className="text-red-500 hover:text-red-600 ml-2"
          title="Delete expense"
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-500 text-xs sm:text-sm">
        <div className="flex items-center gap-1">
          <LuClipboardPen />
          <span>
            {new Date(expense.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
