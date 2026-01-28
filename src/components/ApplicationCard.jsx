import "../styles/index.css";

export default function ApplicationCard({ application, onDelete }) {
    let textColor = "";

    if (application.status === "Applied") {
        textColor = "bg-blue-400";
    } else if (application.status === "Interviewing") {
        textColor = "bg-amber-400";
    } else if (application.status === "Offer") {
        textColor = "bg-green-400";
    } else if (application.status === "Rejected") {
        textColor = "bg-gray-400";
    }

    return (
        <div className="grid grid-cols-4 items-center gap-4 mt-3 mr-3 ml-3 px-4 py-3 border-2 border-gray-400 rounded-lg text-lg">
            <p className="truncate">{application.company}</p>
            <p>{application.role}</p>
            <p
                className={`text-center ${textColor} w-48 justify-self-center rounded-lg py-2`}
            >
                {application.status}
            </p>
            <button
                className="bg-red-600 text-white py-2 px-7 rounded-lg transition duration-300 ease-in-out hover:scale-101  hover:bg-red-700 active:bg-red-600 active:cursor-grab hover:cursor-pointer font-bold w-40 justify-self-end"
                onClick={() => onDelete(application.id)}
            >
                Delete
            </button>
        </div>
    );
}
