import React from "react";
import { ExternalLink, Copy, MessageSquarePlus } from "lucide-react";
import { ActionButton } from "./ActionButton";
import Link from "next/link";

interface FormPreviewProps {
  editLink: string;
  viewLink: string;
  onNewChat: () => void;
}

export function FormPreview({ editLink, viewLink, onNewChat }: FormPreviewProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-2xl space-y-6 bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Your Form is Ready! 🎉</h2>
        <ActionButton icon={MessageSquarePlus} label="New Chat" onClick={onNewChat} variant="secondary" />
      </div>

      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Edit Link</span>
            <button onClick={() => copyToClipboard(editLink)} className="text-gray-400 hover:text-white">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <div>
            <Link href={editLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 break-words">
              {editLink}
              <ExternalLink className="inline-block ml-2 mb-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Share Link</span>
            <button onClick={() => copyToClipboard(viewLink)} className="text-gray-400 hover:text-white">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <Link href={viewLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 break-words">
            {viewLink}
            <ExternalLink className="w-4 h-4 inline-block ml-2 mb-1" />
          </Link>
        </div>
      </div>

      <iframe src={viewLink} className="w-full h-[600px] rounded-lg border border-gray-700" title="Form Preview" />
    </div>
  );
}
