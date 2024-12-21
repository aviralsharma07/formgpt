"use client";
import { useAuth } from "../../context/AuthContext";
import { useFetch } from "../../lib/hooks/useFetch";

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
] as const;

const Dashboard = () => {
  const { fetchData } = useFetch();
  const formId = "1NCqb-7TOvL3qRaV_1x7-Y9P_XJD_RB-PUnn-bm4LF9U";

  const handleGetForm = async () => {
    fetchData(`https://forms.googleapis.com/v1/forms/${formId}`, {
      method: "GET",
      requireAuth: true,
    });
  };

  return <div></div>;
};

export default Dashboard;
