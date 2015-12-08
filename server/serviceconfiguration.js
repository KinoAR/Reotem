//Set up configuration for google login
ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: "80923215447-h382gg95oeemffq45iu2tlb0s7bifbo2.apps.googleusercontent.com",
      loginStyle: "popup",
      secret: "cO3lgRY3jAvwRU-P7GVrAiGc"
    }
  }
);
