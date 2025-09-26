"use client";

import { useState } from "react";
import FormModal from "./FormModal";
import { Button } from "@/components/ui/button";
import StandardsForm from "../website/form/StandardsForm";

const StandardsFormModalWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-accent text-accent-foreground"
      >
        Open Standards Form
      </Button>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Standards Form"
      >
        <StandardsForm />
      </FormModal>
    </div>
  );
};

export default StandardsFormModalWrapper;
