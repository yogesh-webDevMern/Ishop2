
import Link from "next/link";
import { MoveToTrashData } from "@/library/api-call";
import { timeAgo } from "@/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";
import Restore from "@/components/admin/Restore";
import { FcEmptyTrash } from "react-icons/fc";


const CategoryList = async () => {

    const categoryJSON = await MoveToTrashData();
    const categories = categoryJSON?.categories;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Trash</h2>
                    <div className="flex gap-5">
                        <Link href="/admin/category">

                            <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-600">
                                back to categories
                            </button>
                        </Link>

                    </div>

                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">NAME</th>
                            <th className="p-2 border">Slug</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Deleted</th>
                            <th className="p-2 border">Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {categoryJSON != null && categories.map((category, index) => (
                            <tr key={category._id} className="hover:bg-gray-50">
                                <td className="p-2 border text-black">{index + 1}</td>
                                <td className="p-2 border">{category.name}</td>
                                <td className="p-2 border">{category.slug}</td>
                                <td className="p-2 border">
                                    <ToggleStatus flag={5} status={category.status}  />
                                </td>
                                <td className="p-2 border">{timeAgo(category.deletedAt)}</td>
                                <td className="p-2 border flex justify-center items-center gap-3">
                                    <Restore  apiUrl={`/category/restore/${category._id}`} />
                                    <DeleteBtn className="h-[30px]" flag={0} deleteUrl={`/category/delete/${category._id}`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length==0 && <div  className="bg-purple-500 flex gap-4 text-xl text-white p-2 justify-center items-center rounded mt-5 "> The trash is empty right now <FcEmptyTrash /></div> }
            </div>
        </div>
    );
};

export default CategoryList;