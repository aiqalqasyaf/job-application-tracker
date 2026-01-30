import { useState } from "react";
import "../styles/index.css";

const STATUS_COLOR_MAP = {
    Applied: "bg-blue-400",
    Interviewing: "bg-amber-400",
    Offer: "bg-green-400",
    Rejected: "bg-gray-400",
};

const STATUS_OPTIONS = ["Applied", "Interviewing", "Offer", "Rejected"];

export default function ApplicationCard({ application, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        company: application.company,
        role: application.role,
        status: application.status,
    });

    const textColor = STATUS_COLOR_MAP[application.status] || "";

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(application.id, editedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData({
            company: application.company,
            role: application.role,
            status: application.status,
        });
        setIsEditing(false);
    };

    return (
        <div className="grid grid-cols-4 items-center gap-4 mt-3 mr-3 ml-3 px-4 py-3 border-2 border-gray-400 rounded-lg text-lg">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedData.company}
                        onChange={(e) =>
                            setEditedData({
                                ...editedData,
                                company: e.target.value,
                            })
                        }
                        className="border-2 border-gray-300 rounded px-2 py-1"
                    />
                    <input
                        type="text"
                        value={editedData.role}
                        onChange={(e) =>
                            setEditedData({
                                ...editedData,
                                role: e.target.value,
                            })
                        }
                        className="border-2 border-gray-300 rounded px-2 py-1"
                    />
                    <select
                        value={editedData.status}
                        onChange={(e) =>
                            setEditedData({
                                ...editedData,
                                status: e.target.value,
                            })
                        }
                        className="border-2 border-gray-300 rounded px-2 py-1 justify-self-center w-48"
                    >
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </>
            ) : (
                <>
                    <p className="truncate">{application.company}</p>
                    <p>{application.role}</p>
                    <p
                        className={`text-center ${textColor} w-48 justify-self-center rounded-lg py-2`}
                    >
                        {application.status}
                    </p>
                </>
            )}

            <div className="flex gap-2 justify-self-end">
                {isEditing ? (
                    <>
                        <button
                            className="bg-green-600 text-white py-2 px-5 rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-green-700 active:bg-green-600 hover:cursor-pointer font-bold"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-600 text-white py-2 px-5 rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 active:bg-gray-600 hover:cursor-pointer font-bold"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-teal-600 text-white py-2 px-5 rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-teal-700 active:bg-teal-600 hover:cursor-pointer font-bold"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 px-5 rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-red-700 active:bg-red-600 hover:cursor-pointer font-bold"
                            onClick={() => onDelete(application.id)}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
