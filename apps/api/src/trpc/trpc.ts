import { t } from "./root";
import { isUserAuthenticated, logger, requireOrganization } from "./middleware";

export { router, middleware, mergeRouters } from "./root";

export const publicProcedure = t.procedure.use(logger);

export const protectedProcedure = t.procedure
  .use(logger)
  .use(isUserAuthenticated);

export const orgProcedure = t.procedure.use(logger).use(requireOrganization);
