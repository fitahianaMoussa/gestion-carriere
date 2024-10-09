<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests; 
    // Méthode pour afficher tous les utilisateurs
    public function index()
    {
        // Autorise seulement les RH
        $this->authorize('viewAny', User::class); 

        $users = User::where('role', 'employe')->get();

        // Retourne la vue avec Inertia et les utilisateurs
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    // Méthode pour afficher le formulaire de création
    public function create()
    {
        $this->authorize('create', User::class); // Autorise seulement les RH

        // Retourne la vue de création via Inertia
        return Inertia::render('Users/Create');
    }

    // Méthode pour enregistrer un nouvel utilisateur
    public function store(Request $request)
    {
        // Autorise seulement les RH
        $this->authorize('create', User::class); 

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'nullable|string|min:8', // Permet au mot de passe d'être nul, sinon 8 caractères minimum
            'matricule' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'date_embauche' => 'required|date',
            'adresse' => 'required|string|max:255',
            'genre' => 'required|string|max:10',
        ]);

        // Crypter le mot de passe ou utiliser un mot de passe par défaut s'il est absent
        $data = $request->all();
        $data['password'] = bcrypt($request->password ?? 'password');  // Utiliser "password" par défaut
        $data['role'] = 'employe';  // S'assurer que le rôle est employé

        User::create($data);

        return redirect()->route('users.index')->with('success', 'Utilisateur créé avec succès.');
    }

    // Méthode pour afficher le formulaire de modification
    public function edit(User $user)
    {
        // Autorise seulement les RH
        $this->authorize('update', $user); 

        // Retourne la vue de modification via Inertia
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    // Méthode pour mettre à jour un utilisateur
    public function update(Request $request, User $user)
    {
        // Autorise seulement les RH
        $this->authorize('update', $user); 

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'matricule' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'date_embauche' => 'required|date',
            'adresse' => 'required|string|max:255',
            'genre' => 'required|string|max:10',
        ]);

        $user->update($request->all());

        return redirect()->route('users.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }

    // Méthode pour supprimer un utilisateur
    public function destroy(User $user)
    {
        // Autorise seulement les RH
        $this->authorize('delete', $user); 

        $user->delete();

        return redirect()->route('users.index')->with('success', 'Utilisateur supprimé avec succès.');
    }
}

