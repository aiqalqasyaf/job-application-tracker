import "../styles/index.css";

export default function ApplicationCard({ application, onDelete }) {
    return (
        <div className="flex justify-between items-center mt-3 px-4 py-3 border-2 border-gray-400 rounded-lg ml-2 mr-2 text-lg">
            <p>{application.company}</p>
            <p>{application.role}</p>

            <button
                className="bg-red-600 text-white py-2 px-7 rounded-lg transition duration-300 ease-in-out hover:scale-101  hover:bg-red-700 active:bg-red-600 active:cursor-grab hover:cursor-pointer font-bold"
                onClick={() => onDelete(application.id)}
            >
                Delete
            </button>
        </div>
    );
}
