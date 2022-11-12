import React, { useState } from "react";
import { useLocation } from "wouter";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ConfirmationDialog } from "./ConfirmationDialog";

const StyledButtonWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledPreviousButton = styled(Button)`
  margin-right: 30px;
  min-width: 100px;
`;

export const FootButtonGroup = ({
  previousUrl,
  nextUrl,
  isLastPage = false,
  open,
  setOpen,
  disabled = false,
}) => {
  const [location, setLocation] = useLocation();
  return (
    <>
      <StyledButtonWrapper>
        <StyledPreviousButton
          variant="contained"
          onClick={() => {
            setLocation(previousUrl);
          }}
        >
          Previous
        </StyledPreviousButton>

        {isLastPage ? null : (
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
            disabled={disabled}
          >
            Next
          </Button>
        )}
        <ConfirmationDialog open={open} setOpen={setOpen} url={nextUrl} />
      </StyledButtonWrapper>
    </>
  );
};
