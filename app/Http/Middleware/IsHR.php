<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsHR
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        // Vérifier si l'utilisateur est connecté et a le rôle de RH
        if (Auth::check() && Auth::user()->role === 'rh') {
             // Autorise l'accès à la route
            return $next($request);
        }

        // Si l'utilisateur n'est pas RH, rediriger vers la page d'accueil ou afficher une erreur
        return redirect()->route('home')->with('error', 'Vous n\'êtes pas autorisé à accéder à cette page.');
    }
}
