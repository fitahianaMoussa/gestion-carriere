<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'matricule' => 'required|string|max:50',
            'telephone' => 'required|string|max:15',
            'date_embauche' => 'required|date',
            'adresse' => 'required|string|max:255',
            'genre' => 'required|string|in:male,female,other',
            'role' => 'required|string|in:admin,RH,employe',
            'status' => 'required|string|in:active,retraite,demissionaire',
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'matricule' => $request->matricule,
            'telephone' => $request->telephone,
            'date_embauche' => $request->date_embauche,
            'adresse' => $request->adresse,
            'genre' => $request->genre,
            'role' => $request->role,
            'status' => $request->status,
        ]);
        event(new Registered($user));
        Auth::login($user);
    
        return redirect(route('dashboard'));
    }
}
    
