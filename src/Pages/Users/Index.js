import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Box, Tabs, Tab } from "@mui/material";

import UsersList from "./UserList/Index";
import ActivityLog from "./ActivityLog/Index";
import InvestorRelationsAccessControl from "./AccessControl/InvestorRelationsAccessControl";
import HumanEsoursceAccessControl from "./AccessControl/HumanEsoursceAccessControl";
import PlantManagementAccessControl from "./AccessControl/PlantManagementAccessControl";
import FinanceAccessControl from "./AccessControl/FinanceAccessControl";
import { useDispatch } from "react-redux";
import { viewUser } from "../../store/Users/UserList/usersListSlice";
import { viewUserActivities } from "../../store/Users/activityLog/activityLogSlice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      viewUser({
        page: 1,
        page_size: 5,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      viewUserActivities({
        page: 1,
        page_size: 5,
      })
    );
  }, [dispatch]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`users-tabpanel-${index}`}
      aria-labelledby={`users-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 6 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function usersTabsProps(index) {
  return {
    id: `users-tab-${index}`,
    "aria-controls": `users-tabpanel-${index}`,
  };
}

function Users() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography component="div" sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography variant="h1" color="text.secondary">
          Patients
        </Typography>
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="Users Tabs"
          >
            <Tab label="Patient List" {...usersTabsProps(0)} />
            <Tab label="ACTIVITY LOG" {...usersTabsProps(1)} />
            <Tab label="ACCESS CONTROL" {...usersTabsProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12}>
              <UsersList />
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12}>
              <ActivityLog />
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container direction="row" spacing={{ xs: 3, sm: 6 }}>
            <Grid item xs={12}>
              <InvestorRelationsAccessControl />
            </Grid>
            <Grid item xs={12}>
              <HumanEsoursceAccessControl />
            </Grid>
            <Grid item xs={12}>
              <PlantManagementAccessControl />
            </Grid>
            <Grid item xs={12}>
              <FinanceAccessControl />
            </Grid>
          </Grid>
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default Users;
