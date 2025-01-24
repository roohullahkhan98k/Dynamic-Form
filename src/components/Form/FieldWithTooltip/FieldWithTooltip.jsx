import React from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const FieldWithTooltip = ({ Component, field, description }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
    <Component field={field} />
    {description && (
      <Tooltip title={description} arrow>
        <InfoOutlinedIcon
          style={{
            marginLeft: "8px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        />
      </Tooltip>
    )}
  </div>
);

export default FieldWithTooltip;
