# Teach Us Something

# Backend-Driven UI

One engineering practice that can significantly improve product scalability is Backend-Driven UI.

Instead of hardcoding forms, dropdowns, and table columns in the frontend, the backend sends a JSON configuration describing how the UI should be rendered.

For example, rather than defining a feedback form directly in React, the backend can return:

- Field type
- Label
- Validation rules
- Placeholder
- Dropdown options

The frontend simply renders the UI from this configuration.

Benefits include:

- New fields can be added without redeploying the frontend.
- Different customers can have customized forms.
- Frontend and backend teams can work independently.
- The same UI can be reused across web and mobile applications.

This approach is especially useful for CRM, ERP, and admin dashboard products where forms and workflows change frequently. It reduces frontend maintenance while giving product teams more flexibility to evolve the application.