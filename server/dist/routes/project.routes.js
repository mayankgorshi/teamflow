"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, project_controller_1.createProject);
router.get("/", auth_middleware_1.authenticate, project_controller_1.getProjects);
exports.default = router;
//# sourceMappingURL=project.routes.js.map