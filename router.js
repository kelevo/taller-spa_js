class Router {
    constructor(routes) {
        this.routes = routes;
        // Detectara en que pagina nos encontramos
        this._loadInitialRoute();
    }

    loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);

        const url = `/${urlSegs.join('/')}`;
        history.pushState({}, 'this works', url);

        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = matchedRoute.template;
    }

    _matchUrlToRoute(urlSegs) {
        const matchedRoute = this.routes.find(route => {
            // "/" es el indice 0, asi que despues de 0 nos dara la info a partir
            // del indice 1 que le pasamos en slice()
            const routePathSegs = route.path.split('/').slice(1)

            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }

            return routePathSegs
                // .every() verificara con una condicion todos los elementos
                // de un array y en casa de que los cumpla retornara true
                // pero si alguno no los cumple retornara false
                .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
        });

        return matchedRoute;
    }

    // Creamos a _loadInitialRoute() que nos captura la pagina actiual
    _loadInitialRoute() {
        // Utilizaremos a window
        // El atributo pathname nos dara el nomnre del path en donde estamos
        const pathNameSplit = window.location.pathname.split('/');
        // Segmentaremos el path
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';

        this.loadRoute(...pathSegs);
    }
};
