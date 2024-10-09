import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function MultiStepRegistrationForm() {
  const [step, setStep] = useState(1);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    matricule: '',
    telephone: '',
    date_embauche: '',
    adresse: '',
    genre: 'male',
    role: 'employe',
    status: 'active',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  const nextStep = () => {
    if (step === 1 && (!data.name || !data.email || !data.password || !data.password_confirmation)) {
      alert('Please fill in all fields before proceeding.');
      return;
    }
    if (step === 2 && (!data.matricule || !data.telephone || !data.date_embauche || !data.adresse)) {
      alert('Please fill in all fields before proceeding.');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/api/placeholder/200/100" alt="Company Logo" className="mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold">Register (Step {step} of 3)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    required
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    required
                  />
                  {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="matricule">Matricule</Label>
                  <Input
                    id="matricule"
                    value={data.matricule}
                    onChange={e => setData('matricule', e.target.value)}
                    required
                  />
                  {errors.matricule && <p className="text-sm text-red-500">{errors.matricule}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input
                    id="telephone"
                    value={data.telephone}
                    onChange={e => setData('telephone', e.target.value)}
                    required
                  />
                  {errors.telephone && <p className="text-sm text-red-500">{errors.telephone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_embauche">Date of Employment</Label>
                  <Input
                    id="date_embauche"
                    type="date"
                    value={data.date_embauche}
                    onChange={e => setData('date_embauche', e.target.value)}
                    required
                  />
                  {errors.date_embauche && <p className="text-sm text-red-500">{errors.date_embauche}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adresse">Address</Label>
                  <Input
                    id="adresse"
                    value={data.adresse}
                    onChange={e => setData('adresse', e.target.value)}
                    required
                  />
                  {errors.adresse && <p className="text-sm text-red-500">{errors.adresse}</p>}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={data.genre} onValueChange={(value) => setData('genre', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.genre && <p className="text-sm text-red-500">{errors.genre}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="employe">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="retraite">Retired</SelectItem>
                      <SelectItem value="demissionaire">Resigned</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                </div>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={submit} disabled={processing}>
              Register
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}