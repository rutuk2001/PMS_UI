const rolePermissions = {
  "ESG Lead": [
    "environment",
    "community",
    "workplace",
    "company_details",
    "brs_policy",
    "users",
    "generate_reports",
    "quick_actions",
  ],
  Finance: ["community"],
  "Plant Operations": ["environment"],
  "Company Secretary": ["company_details", "community", "brs_policy"],
  "Human Resource": ["workplace"],
};

const currentUserRole = localStorage.getItem("role");

const hasPermission = (section) => {
  return rolePermissions[currentUserRole]?.includes(section);
};

export { hasPermission, currentUserRole };
