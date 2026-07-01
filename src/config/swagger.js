const swaggerJSDoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");


const option={
    definition:{
    openapi:"3.0.0",
    info:{
        title:"Portal Institute System",
        version:"Latest version 0.1",
        description:"MERN Stack System API"
    },
    servers:[{
        url:"http://localhost:5000",
        description:"Development server"
    }],
    components:{
    securitySchemes:{
        bearerAuth:{
        type:"http",
        scheme:"bearer",
        bearerFormat:"JWT"
    }
}
}
},
apis:[
    "./src/routes/*.js"
]
};
const swaggerSpec =swaggerJSDoc(option);
const setupSwagger=(app)=>{
    app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
};
module.exports=setupSwagger;