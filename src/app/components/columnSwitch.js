import { Switch } from "@material-ui/core";
import React from "react";

export const ActiveColumnSwitch = () => {
  return (
    <Switch
      color="primary"
      name="checkedB"
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};
