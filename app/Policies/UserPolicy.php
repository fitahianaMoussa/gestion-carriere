<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
      /**
     * Déterminer si l'utilisateur connecté peut voir la liste des utilisateurs.
     */
    public function viewAny(User $user)
    {
        return $user->role === 'RH';
    }

    /**
     * Déterminer si l'utilisateur connecté peut créer un utilisateur.
     */
    public function create(User $user)
    {
        return $user->role === 'RH';
    }

    /**
     * Déterminer si l'utilisateur connecté peut modifier un utilisateur.
     */
    public function update(User $user, User $model)
    {
        return $user->role === 'RH';
    }

    /**
     * Déterminer si l'utilisateur connecté peut supprimer un utilisateur.
     */
    public function delete(User $user, User $model)
    {
        return $user->role === 'RH';
    }
}
