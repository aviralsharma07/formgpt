"use client";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFetch } from "../../lib/hooks/useFetch";
import { FormCard, FormCardProps } from "./_components/formCard";
import { StatsOverview } from "./_components/statsOverview";
import { DashboardHeader } from "./_components/dashboardHeader";
import { Search } from "lucide-react";

// In a real app, this would come from an API
const mockStats = {
  totalResponses: 301,
  completionRate: 87,
  activeForms: 3,
};

const mockForms = [
  {
    id: "1",
    title: "Customer Feedback Survey",
    responses: 145,
    lastModified: "2024-03-15",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    editLink: "https://forms.google.com/edit/1",
    viewLink: "https://forms.google.com/view/1",
  },
  {
    id: "2",
    title: "Event Registration Form",
    responses: 89,
    lastModified: "2024-03-14",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80",
    editLink: "https://forms.google.com/edit/2",
    viewLink: "https://forms.google.com/view/2",
  },
  {
    id: "3",
    title: "Employee Satisfaction Survey",
    responses: 67,
    lastModified: "2024-03-13",
    status: "archived",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
    editLink: "https://forms.google.com/edit/3",
    viewLink: "https://forms.google.com/view/3",
  },
];

const Dashboard = () => {
  const { fetchData } = useFetch();
  const formId = "1NCqb-7TOvL3qRaV_1x7-Y9P_XJD_RB-PUnn-bm4LF9U";
  const [forms, setForms] = useState(mockForms);
  const [filteredForms, setFilteredForms] = useState(mockForms);
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");
  const [search, setSearch] = useState("");

  const handleArchive = (id: string) => {
    setForms(
      forms.map((form) => {
        if (form.id === id) {
          return {
            ...form,
            status: form.status === "active" ? "archived" : "active",
          };
        }
        return form;
      })
    );
  };

  const handleDuplicate = (id: string) => {
    const formToDuplicate = forms.find((f) => f.id === id);
    if (formToDuplicate) {
      const newForm = {
        ...formToDuplicate,
        id: Date.now().toString(),
        title: `${formToDuplicate.title} (Copy)`,
        responses: 0,
        lastModified: new Date().toISOString(),
        status: "active",
      };
      setForms([...forms, newForm]);
    }
  };

  useEffect(() => {
    setFilteredForms(forms.filter((form) => filter === "all" || form.status === filter).filter((form) => form.title.toLowerCase().includes(search.toLowerCase())));
  }, [filter, search, forms]);

  // const filteredForms = forms.filter((form) => filter === "all" || form.status === filter).filter((form) => form.title.toLowerCase().includes(search.toLowerCase()));

  const handleGetForm = async () => {
    fetchData(`https://forms.googleapis.com/v1/forms/${formId}`, {
      method: "GET",
      requireAuth: true,
    });
  };

  return (
    <section className="p-8 space-y-8 max-h-screen overflow-auto text-gray-200">
      <DashboardHeader />
      <StatsOverview stats={mockStats} />

      {/* Search and Filters */}
      <div className="flex gap-4 items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search forms..." className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            All
          </button>
          <button onClick={() => setFilter("active")} className={`px-4 py-2 rounded-lg ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            Active
          </button>
          <button onClick={() => setFilter("archived")} className={`px-4 py-2 rounded-lg ${filter === "archived" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            Archived
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <FormCard key={form.id} form={form} onArchive={handleArchive} onDuplicate={handleDuplicate} />
          // <div key={form.id}>{form.id}</div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
