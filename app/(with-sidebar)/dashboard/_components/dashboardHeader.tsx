import React from "react";
import { Plus } from "lucide-react";
import { ActionButton } from "../../form-builder/_components/ActionButton";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <p className="text-gray-400 mt-1">Manage and analyze your forms</p>
      </div>
      <ActionButton icon={Plus} label="Generate New Form" onClick={() => router.push("/form-builder")} />
    </div>
  );
}
