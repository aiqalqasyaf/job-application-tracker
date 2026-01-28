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
} from "firebase/firestore";

export default function App() {
    const [applications, setApplications] = useState([]);
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");

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

        const newApp = { company, role };

        try {
            const docRef = await addDoc(collection(db, "applications"), newApp);
            setApplications((prev) => [...prev, { id: docRef.id, ...newApp }]);
            setCompany("");
            setRole("");
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

    return (
        <div className="flex flex-col items-center gap-2">
            <Header />

            {/* FORM */}
            <ApplicationForm
                company={company}
                role={role}
                setCompany={setCompany}
                setRole={setRole}
                onSubmit={addApplication}
            />

            {/* LIST */}
            <section className="w-full">
                {applications.map((app) => (
                    <ApplicationCard
                        key={app.id}
                        application={app}
                        onDelete={deleteApplication}
                    />
                ))}
            </section>
        </div>
    );
}
