import React, { memo } from "react";

export const FormErrorMessage = memo(
  ({ children }: { children: React.ReactNode }) => (
    <p className="text-[0.8rem] font-medium text-destructive">{children}</p>
  )
);
