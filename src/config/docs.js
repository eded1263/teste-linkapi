import swaggerJsdoc from "swagger-jsdoc";
const opt = {
  definition: {
    info: {
      title: "LinkAPI Test",
      description:
        "This test consists in connecting two different API's, and saving the dates + the amount of money made on the database.",
      version: "dev",
    },
  },
  apis: ["**/*.docs.yaml"],
};

const docsConfiguration = swaggerJsdoc(opt);
export { docsConfiguration };
