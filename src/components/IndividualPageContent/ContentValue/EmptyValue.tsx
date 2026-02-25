import React from "react";
import {Box} from "@mui/material";
import {grey} from "../../../themes/colors/creditchainColorPalette";

export default function EmptyValue() {
  return <Box color={grey[450]}>N/A</Box>;
}
