"use client";

import { useEffect, useState } from "react";

import RenameModal from "@/components/modals/renameModal";

const ModalProvider = () => {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  return <RenameModal />;
};

export default ModalProvider;
