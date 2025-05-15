import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addRemark } from "../store/CommonApi/CommonApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const RemarkBox = ({
  tableName,
  tableKey,
  initialRemark,
  financialYear,
  printMode,
  overAllPrintMode = false,
  section,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [remark, setRemark] = useState(initialRemark || "");
  const [hasData, setHasData] = useState(!!initialRemark);
  const dispatch = useDispatch();

  useEffect(() => {
    setRemark(initialRemark || "");
    setHasData(!!initialRemark);
  }, [initialRemark]);

  const editFieldButtonPD = () => {
    setEditMode(true);
  };

  const handleTextFieldChange = (e) => {
    setRemark(e.target.value);
  };

  const saveFieldButtonPAPD = () => {
    if (!hasData && !remark) {
      toast.warning("Remark should not be empty.");
      return;
    }
    const payload = {
      recommendation_key: tableKey,
      financial_year: financialYear,
      recommendation_value: remark,
      section: section,
    };
    try {
      if (hasData) {
        dispatch(addRemark(payload));
      } else {
        dispatch(addRemark(payload));
      }
      setEditMode(false);
      setHasData(true);
    } catch (error) {
      console.error("Error saving remark data:", error);
    }
  };

  const cancelFieldButtonPD = () => {
    if (!hasData) {
      setRemark("");
    }
    setEditMode(false);
  };
  return (
    <>
      <Card className="card">
        <CardHeader
          title={
            printMode || overAllPrintMode ? "" : `Add Remark for ${tableName}`
          }
          sx={{ minHeight: "40px" }}
          className="no-print"
          action={
            !editMode &&
            !printMode &&
            !overAllPrintMode && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="button"
                onClick={editFieldButtonPD}
                sx={{ width: { xs: "100%", sm: 170 }, maxWidth: "100%" }}
                disabled={!financialYear}
              >
                {hasData ? "EDIT" : "ADD"}
              </Button>
            )
          }
        />
        <CardContent>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12}>
              {printMode || overAllPrintMode ? (
                remark && (
                  <Typography variant="body1" className="remark">
                    {`*Note: ${remark}` || ""}
                  </Typography>
                )
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={4}
                  value={remark}
                  disabled={!editMode}
                  onChange={handleTextFieldChange}
                  className="no-print"
                />
              )}
            </Grid>
            {editMode && !printMode && !overAllPrintMode && (
              <Grid item xs={12} className="no-print">
                <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
                  <Grid item xs={12} sm="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={saveFieldButtonPAPD}
                      sx={{ width: { xs: "100%", sm: 188 }, maxWidth: "100%" }}
                    >
                      SAVE CHANGES
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={cancelFieldButtonPD}
                      sx={{ width: { xs: "100%", sm: 188 }, maxWidth: "100%" }}
                    >
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default RemarkBox;
