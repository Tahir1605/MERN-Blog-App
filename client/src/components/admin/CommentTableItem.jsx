import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments, isMobile = false }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approvedComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;

      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- ✅ Desktop Table Layout ---
  if (!isMobile) {
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
        <td className="px-6 py-4">
          <b className="font-medium text-gray-600">Blog:</b> {blog?.title}
          <br />
          <b className="font-medium text-gray-600">Name:</b> {comment.name}
          <br />
          <b className="font-medium text-gray-600">Comment:</b> {comment.content}
        </td>
        <td className="px-6 py-4 max-sm:hidden">{BlogDate.toLocaleDateString()}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            {!comment.isApproved ? (
              <img
                onClick={approvedComment}
                src={assets.tick_icon}
                className="w-5 hover:scale-110 transition-all cursor-pointer"
                alt="Approve"
              />
            ) : (
              <span className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
                Approved
              </span>
            )}
            <img
              onClick={deleteComment}
              src={assets.bin_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Delete"
            />
          </div>
        </td>
      </tr>
    );
  }

  // --- ✅ Mobile Card Layout ---
  return (
    <div className="w-full">
      <div className="text-sm text-gray-700 mb-2">
        <p><b className="text-gray-600">Blog:</b> {blog?.title}</p>
        <p><b className="text-gray-600">Name:</b> {comment.name}</p>
        <p><b className="text-gray-600">Comment:</b> {comment.content}</p>
        <p className="text-xs text-gray-400 mt-2">Date: {BlogDate.toLocaleDateString()}</p>
      </div>
      <div className="flex items-center justify-end gap-4 mt-2">
        {!comment.isApproved ? (
          <img
            onClick={approvedComment}
            src={assets.tick_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            alt="Approve"
          />
        ) : (
          <span className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
            Approved
          </span>
        )}
        <img
          onClick={deleteComment}
          src={assets.bin_icon}
          className="w-5 hover:scale-110 transition-all cursor-pointer"
          alt="Delete"
        />
      </div>
    </div>
  );
};

export default CommentTableItem;
