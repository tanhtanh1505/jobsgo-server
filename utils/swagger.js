const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version: "1.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/user.js", "./routes/jobdescription.js", "./routes/comment.js", "./routes/employer.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports.swaggerDocs = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger is available at http://localhost:${port}/docs`);
};
