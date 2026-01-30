import { useState, useEffect } from "react";
import { db } from "./firebase";
import ApplicationCard from "./components/ApplicationCard";
import ApplicationForm from "./components/ApplicationForm";
import Header from "./components/Header";
import "./styles/index.css";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

export default function App() {
    const [applications, setApplications] = useState([]);
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [editingid, setEditingid] = useState(null);

    // --- Fetch applications from Firestore on mount ---
    useEffect(() => {
        async function fetchApplications() {
            const querySnapshot = await getDocs(collection(db, "applications"));
            const apps = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setApplications(apps);
        }
        fetchApplications();
    }, []);

    // --- Add application to Firestore ---
    async function addApplication(e) {
        e.preventDefault();
        if (!company || !role) return;

        const newApp = { company, role, status };

        try {
            const docRef = await addDoc(collection(db, "applications"), newApp);
            setApplications((prev) => [...prev, { id: docRef.id, ...newApp }]);
            setCompany("");
            setRole("");
            setStatus("Applied");
        } catch (err) {
            console.error("Error adding application:", err);
        }
    }

    // --- Delete application from Firestore ---
    async function deleteApplication(id) {
        try {
            await deleteDoc(doc(db, "applications", id));
            setApplications((prev) => prev.filter((app) => app.id !== id));
        } catch (err) {
            console.error("Error deleting application:", err);
        }
    }

    // --- Edit application in Firestore ---
    async function editApplication(id, updatedData) {
        try {
            await updateDoc(doc(db, "applications", id), updatedData);
            setApplications((prev) =>
                prev.map((app) =>
                    app.id === id ? { ...app, ...updatedData } : app,
                ),
            );
        } catch (err) {
            console.error("Error updating application:", err);
        }
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <Header />

            {/* FORM */}
            <ApplicationForm
                company={company}
                role={role}
                status={status}
                setCompany={setCompany}
                setRole={setRole}
                setStatus={setStatus}
                onSubmit={addApplication}
            />

            {/* LIST */}
            <section className="w-full">
                {applications.map((app) => (
                    <ApplicationCard
                        key={app.id}
                        application={app}
                        onDelete={deleteApplication}
                        onEdit={editApplication}
                    />
                ))}
            </section>
        </div>
    );
}
