import React from "react";
import { useLocation } from "wouter";

import { Container, Button } from "@mui/material";

import { ConfirmationDialog } from "./ConfirmationDialog";

export const FootButtonGroup = ({
  previousUrl,
  nextUrl,
  isLastPage = false,
  open = false,
  setOpen = () => {},
  disabled = false,
}) => {
  const [, setLocation] = useLocation();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
        marginBottom: 2,
      }}
    >
      <Button
        sx={{ minWidth: "100px" }}
        variant="contained"
        onClick={() => {
          setLocation(previousUrl);
        }}
      >
        Previous
      </Button>

      {isLastPage ? null : (
        <Button
          sx={{ justifyContent: "center", marginLeft: "30px" }}
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
    </Container>
  );
};
