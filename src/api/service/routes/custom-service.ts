
export default {
  routes: [
    {
      method: "GET",
      path: "/services/slug/:slug",   // 👈 custom endpoint
      handler: "service.findOne",     // 👈 calls your controller
      config: {
        auth: false,
      },
    },
  ],
};