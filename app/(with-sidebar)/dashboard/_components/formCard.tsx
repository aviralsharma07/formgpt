import React from "react";
import { Copy, ExternalLink, Archive, MoreVertical } from "lucide-react";
import { ActionButton } from "../../form-builder/_components/ActionButton";

export interface FormCardProps {
  form: {
    id: string;
    title: string;
    responses: number;
    lastModified: string;
    status: "active" | "archived" | string;
    thumbnail: string;
    editLink: string;
    viewLink: string;
  };
  onArchive: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function FormCard({ form, onArchive, onDuplicate }: FormCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, we'd show a toast here
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden group hover:ring-2 hover:ring-blue-500 transition-all duration-200">
      <div className="relative h-48">
        <img src={form.thumbnail} alt={form.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${form.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>{form.status}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{form.title}</h3>
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>{form.responses} responses</span>
          <span>Modified {form.lastModified}</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-400">Share Link</span>
            <div className="flex gap-2">
              <button onClick={() => copyToClipboard(form.viewLink)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Copy share link">
                <Copy className="w-4 h-4" />
              </button>
              <a href={form.viewLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Open form">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-400">Edit Link</span>
            <div className="flex gap-2">
              <button onClick={() => copyToClipboard(form.editLink)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Copy edit link">
                <Copy className="w-4 h-4" />
              </button>
              <a href={form.editLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Edit form">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
          <ActionButton icon={Archive} label={form.status === "active" ? "Archive" : "Unarchive"} onClick={() => onArchive(form.id)} variant="secondary" />
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="More options">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
