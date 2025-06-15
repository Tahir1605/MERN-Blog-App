import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    filter === 'Approved' ? comment.isApproved === true : comment.isApproved === false
  );

  return (
    <div className="flex-1 pt-5 px-4 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-3xl mx-auto mb-4">
        <h1 className="text-xl font-semibold text-gray-700 mb-3 sm:mb-0">Comments</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-sm border rounded-full px-4 py-1 text-xs ${
              filter === 'Approved' ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-sm border rounded-full px-4 py-1 text-xs ${
              filter === 'Not Approved' ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block relative max-w-5xl mx-auto overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-700 uppercase border-b bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 text-left">Date</th>
              <th scope="col" className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map((comment, index) => (
              <CommentTableItem
                key={comment._id}
                comment={comment}
                index={index + 1}
                fetchComments={fetchComments}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4 mt-4 max-w-xl mx-auto">
        {filteredComments.map((comment, index) => (
          <div key={comment._id} className="bg-white rounded-lg shadow p-4 border">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Blog: {comment.blogTitle || 'Untitled'}</p>
            <p className="text-sm text-gray-800 mb-2">"{comment.content}"</p>
            <p className="text-xs text-gray-400 mb-3">Posted on: {new Date(comment.createdAt).toLocaleDateString()}</p>
            <div className="flex justify-end">
              <CommentTableItem
                comment={comment}
                index={index + 1}
                fetchComments={fetchComments}
                isMobile={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
