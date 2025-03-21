import { Router } from 'express';
import { LinesConfigurationRoutes, UsersRoutes } from '../features';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    //*Admin Routes
    router.use('/api/admin/lines-configuration', LinesConfigurationRoutes.routes);
    router.use('/api/admin/users', UsersRoutes.routes);
    return router;
  }


}

