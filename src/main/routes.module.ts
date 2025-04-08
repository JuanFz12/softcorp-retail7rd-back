import { Router } from 'express';
import { AuthRoutes, GroupsRoutes, LabsRoutes, LinesConfigurationRoutes, SportsRoutes, UsersRoutes } from '../features';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    //*Global Routes
    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/labs', LabsRoutes.routes);
    router.use('/api/management', SportsRoutes.routes);
    //*Admin Routes
    router.use('/api/admin/lines-configuration', LinesConfigurationRoutes.routes);
    router.use('/api/admin/users', UsersRoutes.routes);
    router.use('/api/admin/groups', GroupsRoutes.routes);

    return router;
  }


}

